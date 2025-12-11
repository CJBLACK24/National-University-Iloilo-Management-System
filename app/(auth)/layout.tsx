"use client";
import AuthIcons from "@/components/AuthIcons";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full font-sans">
      {/* Left Side - Form Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black relative z-10">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right Side - Visual Area */}
      <div className="hidden lg:flex w-1/2 relative bg-neutral-950 items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/National-University-iloilo.png"
            alt="School Campus"
            fill
            className="object-cover opacity-40 grayscale-0"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950/90 via-neutral-950/60 to-neutral-950/30" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-12 text-white/90 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/NU.png"
              alt="NU Iloilo Logo"
              width={160}
              height={160}
              className="w-40 h-auto drop-shadow-2xl"
              priority
            />
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight bg-linear-to-r from-yellow-200 to-blue-300 bg-clip-text text-transparent drop-shadow-sm">
              National University Iloilo
              <br />
              Management System
            </h1>
            <p className="text-lg text-neutral-300 max-w-lg mx-auto leading-relaxed font-light">
              Efficiency, Simplified.
            </p>
          </div>
        </div>

        {/* Floating Icons */}
        <AuthIcons />
      </div>
    </div>
  );
}
