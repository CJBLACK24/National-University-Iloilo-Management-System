import AuthIcons from "@/components/AuthIcons";
import Image from "next/image";

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
            src="/SchoolLogo.png"
            alt="School Campus"
            fill
            className="object-cover opacity-60 grayscale-[20%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/60 to-neutral-950/30" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-12 text-white/90">
          <h1 className="text-4xl font-bold mb-6 tracking-tight">
            School Management System
          </h1>
          <p className="text-lg text-neutral-400 max-w-lg leading-relaxed">
            Efficiency, Simplified.
          </p>
        </div>

        {/* Floating Icons */}
        <AuthIcons />
      </div>
    </div>
  );
}
