"use client";

import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { logout } from "../actions/logout";

export const LogoutButton = () => {
  const { execute, isPending } = useAction(logout);

  return (
    <Button onClick={() => execute()} disabled={isPending}>
      Log out
    </Button>
  );
};
