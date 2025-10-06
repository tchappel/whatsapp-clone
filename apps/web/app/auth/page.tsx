"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthForm } from "@/features/auth/components/auth-form";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const mode = (searchParams.get("mode") as "login" | "signup") || "login";

  const setMode = (newMode: string) => {
    router.push(`/auth?mode=${newMode}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Tabs className="w-full max-w-md" value={mode} onValueChange={setMode}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="login">
          <AuthForm mode={mode} />
        </TabsContent>
        <TabsContent className="w-full" value="signup">
          <AuthForm mode={"signup"} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
