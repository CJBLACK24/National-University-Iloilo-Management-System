"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IconBrandGoogle } from "@tabler/icons-react";
import {
  BottomGradient,
  LabelInputContainer,
} from "@/components/AuthComponents";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/admin", // Redirect to dashboard after login
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black border border-neutral-200 dark:border-neutral-800 shadow-xl">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome Back
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Sign in to your account
      </p>

      <form className="my-8" onSubmit={(e) => e.preventDefault()}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="admin@example.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sign In &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626] border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800/80 transition-colors"
            type="button"
            onClick={handleGoogleSignIn}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Sign in with Google
            </span>
            <BottomGradient />
          </button>

          <p className="text-center text-sm text-neutral-600 mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
