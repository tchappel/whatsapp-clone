"use client";

import { SubmitButton } from "@/components/forms/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAction } from "next-safe-action/hooks";
import { login } from "../actions/login";
import { signup } from "../actions/signup";

export type AuthMode = "login" | "signup";

export type AuthFormProps = {
  mode: AuthMode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const { execute: executeLogin, result: loginResult } = useAction(login);
  const { execute: executeSignup, result: signupResult } = useAction(signup);

  const isSignup = mode === "signup";
  const execute = isSignup ? executeSignup : executeLogin;
  const result = isSignup ? signupResult : loginResult;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    execute({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="">
        <div>
          <Label htmlFor="email">Email:</Label>
          <Input name="email" id="email" type="email" required />
          <span>{result.validationErrors?.email?._errors?.[0]}</span>
        </div>

        <div>
          <Label htmlFor="password">Password:</Label>
          <Input name="password" id="password" type="password" required />
          <span>{result.validationErrors?.password?._errors?.[0]}</span>
        </div>
        <SubmitButton className="w-full mt-6">
          {isSignup ? "Sign Up" : "Log In"}
        </SubmitButton>
      </form>
      <p>{result.validationErrors?._errors?.[0]}</p>
    </>
  );
}
