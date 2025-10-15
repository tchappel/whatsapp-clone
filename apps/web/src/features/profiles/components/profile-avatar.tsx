"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { Camera } from "lucide-react";
import { useMemo } from "react";

const profileAvatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "w-10 h-10",
        lg: "w-40 h-40",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

function getInitials(displayName?: string): string {
  if (!displayName) return "";

  const names = displayName.trim().split(/\s+/).filter(Boolean);
  if (names.length === 0) return "";

  if (names.length === 1) {
    return names[0]!.slice(0, 2).toUpperCase();
  }

  const first = names[0]?.[0];
  const last = names[names.length - 1]?.[0];

  if (first && last) {
    return (first + last).toUpperCase();
  }

  return first?.toUpperCase() || "";
}

type ProfileAvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof profileAvatarVariants> & {
    // For previews/custom URLs (like blob URLs)
    src?: string;

    // Convenience props for typical usage (avatar from DB)
    avatarPath?: string;
    displayName?: string;

    // Manual fallback override (optional)
    fallback?: React.ReactNode;
  };

export function ProfileAvatar({
  src,
  avatarPath,
  displayName,
  size,
  className,
  ...props
}: ProfileAvatarProps) {
  const supabase = createClient();

  const avatarUrl = useMemo(() => {
    // Priority 1: Use src if provided (for blob URLs, custom URLs)
    if (src) return src;

    // Priority 2: Compute public URL from avatarPath
    if (avatarPath) {
      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(avatarPath);
      return data.publicUrl;
    }

    return undefined;
  }, [src, avatarPath, supabase]);

  const fallbackContent = useMemo(() => {
    // Priority 2: Generate initials from displayName
    if (displayName) {
      const initials = getInitials(displayName);
      if (initials) return <span>{initials}</span>;
    }

    // Priority 3: Default camera icon
    return <Camera />;
  }, [displayName]);

  return (
    <Avatar
      className={cn(profileAvatarVariants({ size }), className)}
      {...props}
    >
      <AvatarImage src={avatarUrl} alt="profile image" />
      <AvatarFallback>{fallbackContent}</AvatarFallback>
    </Avatar>
  );
}
