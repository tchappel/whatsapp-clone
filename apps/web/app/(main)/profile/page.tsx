import { EditableProfileField } from "@/features/profiles/components/editable-profile-field";
import { ProfileAvatar } from "@/features/profiles/components/profile-avatar";
import {
  ProfileFieldContent,
  ProfileFieldItemTitle,
  ProfileFieldList,
  ProfileFieldListItem,
} from "@/features/profiles/components/profile-field-list";
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

  return (
    <div className="h-screen w-full max-w-md px-8 pt-4">
      <h1 className="mb-6 text-xl font-semibold">Profile</h1>
      <ProfileAvatar imageUrl={profile?.avatar_url ?? ""} />
      <ProfileFieldList>
        {/* Display Name */}
        <ProfileFieldListItem>
          <ProfileFieldItemTitle>Name</ProfileFieldItemTitle>
          <ProfileFieldContent>
            <EditableProfileField
              initialValue={profile?.display_name ?? ""}
              fieldKey="display_name"
            />
          </ProfileFieldContent>
        </ProfileFieldListItem>

        {/* Status / About */}
        <ProfileFieldListItem>
          <ProfileFieldItemTitle>Status</ProfileFieldItemTitle>
          <ProfileFieldContent>
            <EditableProfileField
              initialValue={profile?.status_message ?? ""}
              fieldKey="status_message"
            />
          </ProfileFieldContent>
        </ProfileFieldListItem>

        {/* Email (read-only) */}
        <ProfileFieldListItem>
          <ProfileFieldItemTitle>Email</ProfileFieldItemTitle>
          <ProfileFieldContent>
            <p>{user.email}</p>
          </ProfileFieldContent>
        </ProfileFieldListItem>
      </ProfileFieldList>
    </div>
  );
}
