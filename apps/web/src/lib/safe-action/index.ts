import { createClient } from "@/lib/supabase/server";
import { Database } from "@repo/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { z } from "zod";

type ActionContext = {
  supabase: SupabaseClient<Database>;
};

// With ActionError:
//  - You can show specific, user-friendly error messages (you wanna show them to the user)
//  - Otherwise, throwing Error with a message will still display to the user DEFAULT_SERVER_ERROR_MESSAGE (same as unexpected/system errors)
//  - unexpected/system will diplay DEFAULT_SERVER_ERROR_MESSAGE
class ActionError extends Error {}

// Base client.
export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError(e) {
    console.error("Action error:", e.message);

    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  // Define logging middleware.
}).use(async ({ next, clientInput, metadata }) => {
  console.log("LOGGING MIDDLEWARE");
  const supabase = await createClient();

  const startTime = performance.now();
  // Here we await the action execution.

  const result = await next<ActionContext>({
    ctx: {
      supabase: supabase,
    },
  });

  const endTime = performance.now();

  console.log("Result ->", result);
  console.log("Client input ->", clientInput);
  console.log("Metadata ->", metadata);
  console.log("Action execution took", endTime - startTime, "ms");

  // And then return the result of the awaited action.
  return result;
});

// Auth client defined by extending the base one.
// Note that the same initialization options and middleware functions of the base client
// will also be used for this one.

type AuthActionContext = ActionContext & {
  userId: string;
};

export const authActionClient = actionClient
  // Define authorization middleware.
  .use(async ({ next, ctx }) => {
    // Here I just want to preload safe actions with a userID (without making extra calls to supabase api)
    const { supabase } = ctx;

    // supabase.auth.getSession() - reads locally stored session data (cookies/localStorage) ✅ No API call
    // I used this on purpose to avoid extra calls
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (!session || error) {
      throw new Error("Invalid Session!");
    }

    const userId = session.user.id;

    return next<AuthActionContext>({
      ctx: { userId, ...ctx },
    });
  });
