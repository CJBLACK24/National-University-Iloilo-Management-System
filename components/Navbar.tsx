import Link from "next/link";
import Image from "next/image";
import { MessageSquare, Search } from "lucide-react";
import { NotificationDropdown } from "@/components/ui/notification-dropdown";
import { ProfileDropdown } from "@/components/ui/profile-dropdown";

const Navbar = () => {
  const role = "admin"; // Mock role
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
        <ProfileDropdown name="Christian Duque" role={role} />
      </div>
    </div>
  );
};

export default Navbar;
