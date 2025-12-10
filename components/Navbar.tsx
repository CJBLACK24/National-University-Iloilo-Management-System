import Image from "next/image";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const role = "admin"; // Mock role
  return (
    <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-md sticky top-0 z-40">
      {/* MOBILE MENU & SEARCH */}
      <div className="flex items-center gap-4">
        <MobileMenu />

        {/* SEARCH BAR */}
        <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-zinc-700 px-2 bg-zinc-900">
          <Image
            src="/search.png"
            alt=""
            width={14}
            height={14}
            className="invert opacity-50"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-[200px] p-2 bg-transparent outline-none text-slate-200 placeholder:text-zinc-500"
          />
        </div>
      </div>

      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full md:w-auto">
        <div className="bg-zinc-800 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-zinc-700 transition-colors">
          <Image
            src="/message.png"
            alt=""
            width={20}
            height={20}
            className="invert brightness-0"
          />
        </div>
        <div className="bg-zinc-800 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative hover:bg-zinc-700 transition-colors">
          <Image
            src="/announcement.png"
            alt=""
            width={20}
            height={20}
            className="invert brightness-0"
          />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-600 text-white rounded-full text-xs box-content border-2 border-black">
            1
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium text-white">
            John Doe
          </span>
          <span className="text-[10px] text-zinc-400 text-right">{role}</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
          {/* Placeholder Avatar */}
          <Image
            src="/avatar.png"
            alt="avatar"
            width={36}
            height={36}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
