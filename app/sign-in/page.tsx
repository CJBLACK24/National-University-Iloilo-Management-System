"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="flex flex-col gap-4 w-80 p-6 bg-zinc-900 rounded-md border border-zinc-800">
        <h1 className="text-2xl font-bold mb-4 text-center">SchooLama Login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-3 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-zinc-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-3 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-zinc-500"
        />
        <button
          onClick={handleSignIn}
          className="bg-blue-600 p-3 rounded text-white font-bold hover:bg-blue-500 transition-colors mt-2"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
