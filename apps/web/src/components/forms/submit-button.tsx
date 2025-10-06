import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  className: string;
  children: React.ReactNode;
};

export const SubmitButton = ({
  className,
  children,
  ...props
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button className={className} type="submit" disabled={pending} {...props}>
      {children}
    </Button>
  );
};
