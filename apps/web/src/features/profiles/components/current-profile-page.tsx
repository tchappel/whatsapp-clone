"use client";

import { PageTitle } from "@/components/layout/page-title";
import { deleteProfileAvatar } from "@/features/profiles/actions/delete-profile-avatar";
import { uploadProfileAvatar } from "@/features/profiles/actions/upload-profile-avatar";
import { EditableProfileField } from "@/features/profiles/components/editable-profile-field";
import { ProfileAvatarEditor } from "@/features/profiles/components/profile-avatar-editor";
import {
  ProfileFieldContent,
  ProfileFieldItemTitle,
  ProfileFieldList,
  ProfileFieldListItem,
} from "@/features/profiles/components/profile-field-list";
import { CurrentProfile } from "@/features/profiles/queries/get-current-profile";
import { User } from "@supabase/supabase-js";
import { useAction } from "next-safe-action/hooks";

type CurrentProfilePageProps = {
  profile: CurrentProfile;
  userId?: User["id"];
  userEmail?: User["email"];
};

export function CurrentProfilePage({
  profile,
  userId,
  userEmail,
}: CurrentProfilePageProps) {
  const {
    execute: uploadProfileAvatarAction,
    isPending: uploadProfileAvatarPending,
    result: uploadProfileAvatarResult,
  } = useAction(uploadProfileAvatar);

  const {
    execute: deleteProfileAvatarAction,
    isPending: deleteProfileAvatarPending,
    result: deleteProfileAvatarResult,
  } = useAction(deleteProfileAvatar);

  return (
    <div className="h-screen w-full max-w-md px-8 pt-4">
      <PageTitle>Profile</PageTitle>
      <ProfileAvatarEditor
        avatarPath={profile?.avatar_path ?? ""}
        onUpload={(file) => uploadProfileAvatarAction({ file })}
        onRemove={() => deleteProfileAvatarAction({ filePath: "" })}
        loading={uploadProfileAvatarPending || deleteProfileAvatarPending}
      />
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
            <p>{userEmail}</p>
          </ProfileFieldContent>
        </ProfileFieldListItem>
      </ProfileFieldList>
    </div>
  );
}
