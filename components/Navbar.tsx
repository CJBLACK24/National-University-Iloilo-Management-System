"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Search } from "lucide-react";
import { NotificationDropdown } from "@/components/ui/notification-dropdown";
import { ProfileDropdown } from "@/components/ui/profile-dropdown";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide Navbar on messages page to give full height to chat
  if (pathname === "/list/messages") {
    return null;
  }

  // Show skeleton during SSR and initial hydration
  if (!mounted || isPending) {
    return (
      <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-md sticky top-0 z-40 rounded-xl">
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-zinc-700 px-3 bg-zinc-900 py-2">
            <Search className="w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-[200px] bg-transparent outline-none text-slate-200 placeholder:text-zinc-500 font-medium"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 justify-end w-full md:w-auto">
          <div className="bg-zinc-800 rounded-full w-9 h-9 animate-pulse" />
          <div className="bg-zinc-800 rounded-full w-9 h-9 animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end gap-1">
              <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
              <div className="h-3 w-16 bg-zinc-800 rounded animate-pulse" />
            </div>
            <div className="w-9 h-9 rounded-full bg-zinc-800 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const role = (session?.user as any)?.role || "user";
  const name = session?.user?.name || "Guest";
  const image = session?.user?.image || "/avatar.png";

  return (
    <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-md sticky top-0 z-40 rounded-xl">
      {/* SEARCH BAR */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-zinc-700 px-3 bg-zinc-900 py-2">
          <Search className="w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-[200px] bg-transparent outline-none text-slate-200 placeholder:text-zinc-500 font-medium"
          />
        </div>
      </div>

      {/* ICONS AND USER */}
      <div className="flex items-center gap-4 justify-end w-full md:w-auto">
        {/* Messages */}
        <div className="bg-zinc-800 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-zinc-700 transition-colors">
          <MessageSquare className="w-4 h-4 text-white" />
        </div>

        {/* Notifications */}
        <NotificationDropdown />

        {/* Profile */}
        <ProfileDropdown name={name} role={role as string} avatarSrc={image} />
      </div>
    </div>
  );
};

export default Navbar;
