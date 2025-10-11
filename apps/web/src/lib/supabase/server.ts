import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// This function creates a Supabase client that works *server-side* (in Server Actions, Route Handlers, or Server Components).
export async function createClient() {
  // Get access to the current request's cookies using Next.js built-in API.
  // `cookies()` gives you a special "RequestCookies" object that lets you
  // read and (if the context allows) write cookies in the current request.
  const cookieStore = await cookies();

  // Create a Supabase client that knows how to read/write cookies
  // from/to the current Next.js request/response context.
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          // "cookieStore" here is the object from Next.js (`next/headers`).
          // Supabase client reads cookies from where it is invoked
          // Among them will be the Base64-encoded Supabase session cookie: refresh (opaque) + access token (jwt).

          // 🧩 When you later call `supabase.auth.getUser()` or any authed query:
          // 1️⃣ Supabase decodes this cookie to extract tokens.
          // 2️⃣ If access_token is expired → Supabase client (running inside your Next.js server)
          //     sends a POST /auth/v1/token?grant_type=refresh_token request to Supabase backend.
          // 3️⃣ Supabase backend verifies refresh_token and issues a new access_token + refresh_token.
          // 4️⃣ The new tokens are temporarily held in-memory within this Supabase client instance
          //     (inside Node.js for this single request context).
          // 5️⃣ The Supabase client then tries to persist them via setAll() below.
          return cookieStore.getAll();
        },
        // setAll(): this tells Supabase how to WRITE cookies
        setAll(cookiesToSet) {
          try {
            // When Supabase refreshes an expired session, it will want to
            // set new cookies (new access_token/refresh_token pair).
            // This loop writes each new cookie into the Next.js response.
            // N.B. In server components, cookies are read-only, Next.js will throw an error

            // 🧩 If cookies are writable (like in middleware or route handlers),
            // Supabase successfully persists the new rotated tokens to the browser.
            // 🧩 If cookies are read-only (like in server actions and server components),
            // the refresh tokens stay only in-memory inside Supabase client and are lost after request ends.
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // If ended up here, the `setAll` method was called from a server action or server component.
            // if a server action triggered a token refresh:
            // - The server action will still succeed because supabase client uses the new access token in memory (The refreshed session therefore lives only in memory for this one request).
            // - Browser cookies will be out of sync and with expired token pair
            // N.B. Supabase Auth is quite lenient, even previous or expired token might succeed refreshing the token (tolerance):
            //    any subsequent navigation (page route) or api call will trigger the middleware fn `udpateSession` that will resync the tokens
            // For the time being I can safely ignore recovering from this error
            // I will just console.log the event in case this needs further attention
            console.debug(
              "Supabase tried to refresh cookie in a read-only context."
            );
          }
        },
      },
    }
  );
}
