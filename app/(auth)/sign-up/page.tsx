"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IconBrandGoogle, IconEye, IconEyeOff } from "@tabler/icons-react";
import {
  BottomGradient,
  LabelInputContainer,
} from "@/components/AuthComponents";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpSchema } from "@/lib/formValidationSchemas";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpSchema) => {
    setLoading(true);
    try {
      await authClient.signUp.email(
        {
          email: data.email,
          password: data.password,
          name: `${data.firstName} ${data.lastName}`,
          callbackURL: "/admin",
        } as any,
        {
          onSuccess: () => {
            toast.success("Account created successfully! Please sign in.");
            router.push("/admin");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Something went wrong");
          },
        }
      );
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/admin", // Default fallback, should logic be here?
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-none bg-black p-4 md:rounded-2xl md:p-8 border border-zinc-700 shadow-xl">
      <h2 className="text-xl font-bold text-white">Create Account</h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-300">
        Join our university management platform
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
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
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName.message}</p>
            )}
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
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName.message}</p>
            )}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-neutral-200">
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="student@university.edu"
            type="email"
            className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" className="text-neutral-200">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500 pr-10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-zinc-800 font-medium text-white shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] hover:bg-zinc-700 transition-colors disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"} &rarr;
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
