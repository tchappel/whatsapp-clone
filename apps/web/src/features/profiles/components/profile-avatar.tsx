import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
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

export type ProfileAvatarProps = {
  src?: string;
  fallback?: React.ReactNode;
  className?: string;
} & VariantProps<typeof profileAvatarVariants>;

export async function ProfileAvatar({
  src,
  fallback,
  size,
  className,
}: ProfileAvatarProps) {
  return (
    <Avatar className={cn(profileAvatarVariants({ size }), className)}>
      <AvatarImage src={src} alt="profile image" />
      <AvatarFallback>{fallback ?? <Camera />}</AvatarFallback>
    </Avatar>
  );
}
