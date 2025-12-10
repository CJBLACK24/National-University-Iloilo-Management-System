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
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-black relative z-10">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right Side - Visual Area */}
      <div className="hidden lg:flex w-1/2 relative bg-neutral-900 items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/auth.png"
            alt="School Management System Background"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 to-blue-900/40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-12 text-white">
          <h1 className="text-5xl font-bold mb-6 tracking-tight drop-shadow-lg">
            School Management System
          </h1>
          <p className="text-xl text-gray-200 max-w-lg leading-relaxed drop-shadow-md">
            Streamline your institution's operations with our premium, modern
            platform.
          </p>
        </div>

        {/* Floating Icons */}
        <AuthIcons />
      </div>
    </div>
  );
}
