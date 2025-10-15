"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useRef } from "react";
import { uploadProfileAvatar } from "../actions/upload-profile-avatar";
import { ProfileAvatarEditor } from "./profile-avatar-editor";

const classNames = {
  input:
    "rounded-none border-0 border-b focus-visible:ring-0 text-base md:text-base px-0",
  label: "text-md font-medium text-muted-foreground tracking-wide mb-2",
};

export function CreateProfileForm() {
  const profileAvatarPathInputRef = useRef<HTMLInputElement | null>(null);
  const {
    execute: uploadProfileAvatarAction,
    isPending: uploadProfileAvatarPending,
    result: uploadProfileAvatarResult,
  } = useAction(uploadProfileAvatar);

  useEffect(() => {
    if (uploadProfileAvatarResult.data?.filePath) {
      if (profileAvatarPathInputRef.current) {
        profileAvatarPathInputRef.current.value =
          uploadProfileAvatarResult.data.filePath;
      }
    }
  }, [uploadProfileAvatarResult.data?.filePath]);

  const avatarUploadError =
    uploadProfileAvatarResult.serverError ??
    Object.values(
      uploadProfileAvatarResult.validationErrors?.fieldErrors || {}
    ).flat()[0];

  return (
    <form action="">
      <ProfileAvatarEditor
        onUpload={(file) => uploadProfileAvatarAction({ file })}
        loading={uploadProfileAvatarPending}
      />
      <input
        ref={profileAvatarPathInputRef}
        type="text"
        name="avatar_path"
        hidden
      />
      {avatarUploadError && <p>{avatarUploadError}</p>}
      <Label className={classNames.label} htmlFor="name">
        Name
      </Label>
      <Input className={classNames.input} name="name" id="name" type="text" />
      <Label className={classNames.label} htmlFor="status">
        Status
      </Label>
      <Input
        className={classNames.input}
        name="status"
        id="status"
        type="text"
      />
      <Button type="submit">Create Profile</Button>
      <input type="text" name="avatar_path" hidden />
    </form>
  );
}
