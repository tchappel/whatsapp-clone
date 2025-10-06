"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { logout } from "@/features/auth/actions/logout";
import { LogOut } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

export default function Settings() {
  const { execute: logoutAction, isPending: logoutActionPending } =
    useAction(logout);

  const actions = [
    {
      title: "Log Out",
      icon: LogOut,
      onClick: () => logoutAction(),
      disabled: logoutActionPending,
    },
  ];

  return (
    <div className="w-xs p-4">
      <h1 className="font-bold text-2xl">Settings</h1>
      <div>
        <p>Profile Card here</p>
      </div>
      <Separator className="my-1 opacity-50" />
      {actions.map(({ icon: Icon, title, onClick }) => (
        <Button
          key={title}
          variant="ghost"
          className="w-full justify-start gap-4 cursor-pointer"
          onClick={onClick}
        >
          <Icon className="h-4 w-4" />
          {title}
        </Button>
      ))}
      <Separator className="my-1 opacity-50" />
    </div>
  );
}
