"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Camera, Trash2, Upload } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useRef, useState } from "react";
import { uploadAvatar } from "../actions/upload-avatar";

type ProfileAvatarProps = {
  imageUrl?: string;
  alt?: string;
};

export function ProfileAvatar({
  imageUrl,
  alt = "Profile photo",
}: ProfileAvatarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    execute: uploadAvatarAction,
    hasSucceeded,
    result,
  } = useAction(uploadAvatar);

  // Trigger file picker
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle selected file
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadAvatarAction({
      file,
    });
  };

  const handleRemovePhoto = () => {
    console.log("Remove photo clicked");
    // TODO: implement Supabase delete logic
  };

  return (
    <div
      className="relative w-40 h-40 mx-auto rounded-full overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-muted flex items-center justify-center text-4xl text-muted-foreground">
          <Camera className="w-10 h-10 opacity-50" />
        </div>
      )}

      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center text-sm font-medium transition-opacity duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex flex-col items-center focus:outline-none">
              <Camera className="w-6 h-6 mb-1" />
              Change profile photo
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="center" className="w-48">
            <DropdownMenuItem onClick={handleUploadClick}>
              <Upload className="w-4 h-4 mr-2" />
              Upload photo
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleRemovePhoto}>
              <Trash2 className="w-4 h-4 mr-2" />
              Remove photo
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        name="avatar"
        ref={fileInputRef}
        accept="image/jpeg, image/png, image/webp, image/heic, image/heif"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
