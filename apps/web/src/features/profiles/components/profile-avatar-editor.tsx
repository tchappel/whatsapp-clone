"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Image, Loader2, Trash2, Upload } from "lucide-react";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { ProfileAvatar } from "./profile-avatar";

function usePreview(initialSrc?: string) {
  const [previewUrl, setPreviewUrl] = useState(initialSrc ?? "");
  const blobUrlRef = useRef<string | null>(null);

  function revokeBlobUrl() {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
  }

  function createPreview(file: File) {
    revokeBlobUrl();
    const url = URL.createObjectURL(file);
    blobUrlRef.current = url;
    setPreviewUrl(url);
  }

  function clearPreview() {
    revokeBlobUrl();
    setPreviewUrl("");
  }

  // Sync preview with external src changes
  useEffect(() => {
    setPreviewUrl(initialSrc ?? "");
    revokeBlobUrl();
  }, [initialSrc]);

  // Cleanup on unmount
  useEffect(() => {
    return revokeBlobUrl;
  }, []);

  return {
    previewUrl,
    createPreview,
    clearPreview,
  };
}

type ProfileAvatarEditorProps = {
  src?: string;
  loading?: boolean;
  onRemove?: () => void;
  onUpload?: (file: File) => void;
  avatarPath?: string;
  displayName?: string;
};

export function ProfileAvatarEditor({
  src,
  avatarPath,
  displayName,
  loading = false,
  onRemove,
  onUpload,
}: ProfileAvatarEditorProps) {
  const [isInteractive, setIsInteractive] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { previewUrl, createPreview, clearPreview } = usePreview(src);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file || loading) return;

    // Reset input so the same file can be selected again
    e.target.value = "";

    createPreview(file);
    onUpload?.(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
    setDropdownOpen(false);
  };

  const handleRemoveClick = () => {
    clearPreview();
    setDropdownOpen(false);
    onRemove?.();
  };

  const handleAvatarClick = () => {
    if (loading) return;
    // Open dropdown programmatically
    setDropdownOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (loading) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleAvatarClick();
    }
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <div className="relative inline-block">
        {/* Avatar with interactive overlay */}
        <div
          role="button"
          tabIndex={loading ? -1 : 0}
          aria-label="Change profile photo"
          aria-disabled={loading}
          className="relative inline-block rounded-full overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          onClick={handleAvatarClick}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => !loading && setIsInteractive(true)}
          onMouseLeave={() => setIsInteractive(false)}
          onFocus={() => !loading && setIsInteractive(true)}
          onBlur={() => setIsInteractive(false)}
        >
          <ProfileAvatar
            size="lg"
            src={previewUrl}
            avatarPath={avatarPath}
            displayName={displayName}
          />

          {/* Interactive overlay (hover/focus/dropdown open) */}
          {(isInteractive || dropdownOpen) && !loading && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white transition-opacity">
              <Image className="w-10 h-10 mb-3" strokeWidth={1.5} />
              <span className="text-sm font-medium">Change profile photo</span>
            </div>
          )}

          {/* Loading overlay */}
          {loading && (
            <div
              className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-not-allowed"
              aria-live="polite"
              aria-busy="true"
            >
              <div className="flex flex-col items-center text-white">
                <Loader2 className="w-8 h-8 animate-spin mb-2" />
                <span className="text-sm font-medium">Uploading...</span>
              </div>
            </div>
          )}
        </div>

        {/* Hidden dropdown trigger */}
        <DropdownMenuTrigger asChild>
          <button ref={triggerRef} className="sr-only" aria-hidden="true">
            Open menu
          </button>
        </DropdownMenuTrigger>

        {/* Dropdown menu */}
        <DropdownMenuContent align="center" className="w-48">
          <DropdownMenuItem onClick={handleUploadClick} disabled={loading}>
            <Upload className="w-4 h-4 mr-2" />
            Upload photo
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleRemoveClick} disabled={loading}>
            <Trash2 className="w-4 h-4 mr-2" />
            Remove photo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
        onChange={handleFileChange}
        disabled={loading}
        className="sr-only"
        aria-label="Upload profile photo"
      />
    </DropdownMenu>
  );
}
