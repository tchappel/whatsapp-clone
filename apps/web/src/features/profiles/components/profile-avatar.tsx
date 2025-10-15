import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { Camera } from "lucide-react";

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

export type ProfileAvatarProps = React.ComponentProps<
  typeof AvatarPrimitive.Root
> &
  VariantProps<typeof profileAvatarVariants> & {
    src?: string;
    fallback: React.ReactNode;
  };

export function ProfileAvatar({
  src,
  fallback,
  size,
  className,
  ...props
}: ProfileAvatarProps) {
  return (
    <Avatar
      className={cn(profileAvatarVariants({ size }), className)}
      {...props}
    >
      <AvatarImage src={src} alt="profile image" />
      <AvatarFallback>{fallback ?? <Camera />}</AvatarFallback>
    </Avatar>
  );
}
