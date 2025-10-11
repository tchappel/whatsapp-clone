import { cn } from "@/lib/utils";

export function ProfileFieldList({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      className={cn("flex flex-col gap-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function ProfileFieldListItem({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div role="listitem" className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

export function ProfileFieldItemTitle({
  children,
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "text-md font-medium text-muted-foreground tracking-wide mb-2",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function ProfileFieldContent({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("text-base", className)} {...props}>
      {children}
    </div>
  );
}
