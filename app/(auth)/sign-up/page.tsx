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

export default function SignUpPage() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/admin",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-none bg-black p-4 md:rounded-2xl md:p-8 border border-neutral-800 shadow-xl">
      <h2 className="text-xl font-bold text-white">Create Account</h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-300">
        Join our school management platform
      </p>

      <form className="my-8" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname" className="text-neutral-200">
              First name
            </Label>
            <Input
              id="firstname"
              placeholder="John"
              type="text"
              className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname" className="text-neutral-200">
              Last name
            </Label>
            <Input
              id="lastname"
              placeholder="Doe"
              type="text"
              className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500"
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-neutral-200">
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="admin@example.com"
            type="email"
            className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" className="text-neutral-200">
            Password
          </Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500"
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-zinc-800 font-medium text-white shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] hover:bg-zinc-700 transition-colors"
          type="submit"
        >
          Sign Up &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-px w-full bg-linear-to-r from-transparent via-neutral-700 to-transparent" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-zinc-900 px-4 font-medium text-white shadow-[0px_0px_1px_1px_#262626] border border-zinc-800 hover:bg-zinc-800/80 transition-colors"
            type="button"
            onClick={handleGoogleSignIn}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-300" />
            <span className="text-sm text-neutral-300">
              Sign up with Google
            </span>
            <BottomGradient />
          </button>

          <p className="text-center text-sm text-neutral-400 mt-4">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-400 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
