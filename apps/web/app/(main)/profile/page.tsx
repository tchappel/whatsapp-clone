import { CurrentProfilePage } from "@/features/profiles/components/current-profile-page";
import { getCurrentProfile } from "@/features/profiles/queries/get-current-profile";
import { createClient } from "@/lib/supabase/server";

export default async function Profile() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    throw new Error("User not Authenticated");
  }

  const profile = await getCurrentProfile(supabase, user.id);

  if (!profile) {
    throw new Error("Profile Not Found");
  }

  return (
    <CurrentProfilePage
      profile={profile}
      userId={user.id}
      userEmail={user.email}
    />
  );
}
