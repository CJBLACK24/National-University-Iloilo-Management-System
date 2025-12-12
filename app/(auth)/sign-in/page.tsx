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
import {
  signInEmailSchema,
  SignInEmailSchema,
  signInStudentSchema,
  SignInStudentSchema,
} from "@/lib/formValidationSchemas";
import { toast } from "react-toastify";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showStudentPassword, setShowStudentPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Email/Admin Login Form
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail },
  } = useForm<SignInEmailSchema>({
    resolver: zodResolver(signInEmailSchema),
  });

  // Student Login Form
  const {
    register: registerStudent,
    handleSubmit: handleSubmitStudent,
    formState: { errors: errorsStudent },
  } = useForm<SignInStudentSchema>({
    resolver: zodResolver(signInStudentSchema),
  });

  const onEmailSubmit = async (data: SignInEmailSchema) => {
    setLoading(true);
    try {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: "/admin",
        },
        {
          onSuccess: async () => {
            router.push("/admin");
            toast.success("Signed in successfully");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Invalid credentials");
          },
        }
      );
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onStudentSubmit = async (data: SignInStudentSchema) => {
    setLoading(true);
    try {
      // Assuming ID is used as password or passwordless flow is desired.
      // Passing username as password to satisfy potential backend requirement for now.
      await (authClient.signIn as any).username(
        {
          username: data.username,
          password: data.username,
          callbackURL: "/admin",
        },
        {
          onSuccess: async () => {
            router.push("/admin");
            toast.success("Signed in successfully");
          },
          onError: (ctx: any) => {
            toast.error(ctx.error.message || "Invalid credentials");
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
        callbackURL: "/admin",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-none bg-black p-4 md:rounded-2xl md:p-8 border border-zinc-700 shadow-xl">
      <h2 className="text-xl font-bold text-white">Welcome Back</h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-300">
        Sign in to your account
      </p>

      {/* ADMIN / TEACHER LOGIN (EMAIL) */}
      <form className="mt-8 mb-4" onSubmit={handleSubmitEmail(onEmailSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-neutral-200">
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="admin@example.com"
            type="email"
            autoComplete="email"
            className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500"
            {...registerEmail("email")}
          />
          {errorsEmail.email && (
            <p className="text-red-500 text-xs">{errorsEmail.email.message}</p>
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
              autoComplete="current-password"
              className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500 pr-10"
              {...registerEmail("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
            </button>
          </div>
          {errorsEmail.password && (
            <p className="text-red-500 text-xs">
              {errorsEmail.password.message}
            </p>
          )}
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-zinc-800 font-medium text-white shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] hover:bg-zinc-700 transition-colors disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"} &rarr;
          <BottomGradient />
        </button>
      </form>

      <div className="my-8 flex items-center gap-4">
        <div className="h-px w-full bg-zinc-800" />
        <span className="text-zinc-500 text-xs uppercase whitespace-nowrap">
          Or sign in with ID
        </span>
        <div className="h-px w-full bg-zinc-800" />
      </div>

      {/* STUDENT LOGIN (UNIVERSITY ID) - "Below at the Top of Google" */}
      <form className="mb-8" onSubmit={handleSubmitStudent(onStudentSubmit)}>
        <div className="flex flex-col gap-4">
          <LabelInputContainer>
            <Label htmlFor="username" className="text-neutral-200">
              University ID
            </Label>
            <Input
              id="username"
              placeholder="e.g. 56802"
              autoComplete="username"
              className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500"
              {...registerStudent("username")}
            />
            {errorsStudent.username && (
              <p className="text-red-500 text-xs">
                {errorsStudent.username.message}
              </p>
            )}
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md border border-zinc-700 bg-black font-medium text-zinc-300 shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] hover:bg-zinc-900 transition-colors disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Sign In with ID"}
            <BottomGradient />
          </button>
        </div>
      </form>

      <div className="flex flex-col space-y-4">
        <button
          className="group/btn shadow-input relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-zinc-900 px-4 font-medium text-white shadow-[0px_0px_1px_1px_#262626] border border-zinc-800 hover:bg-zinc-800/80 transition-colors"
          type="button"
          onClick={handleGoogleSignIn}
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-300" />
          <span className="text-sm text-neutral-300">Sign in with Google</span>
          <BottomGradient />
        </button>

        <p className="text-center text-sm text-neutral-400 mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
