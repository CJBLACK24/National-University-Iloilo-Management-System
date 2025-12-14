import Image from "next/image";
import Link from "next/link";

export const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/setting.png", // Reusing setting or user icon
        label: "Role Management",
        href: "/admin/roles",
        visible: ["admin"],
      },
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  // const user = await currentUser();
  // const role = user?.publicMetadata.role as string;
  const role: string = "admin"; // MOCK ROLE
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-slate-400 font-light my-4 uppercase">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-slate-300 py-2 md:px-2 rounded-md hover:bg-zinc-800 transition-colors"
                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="invert brightness-0 filter"
                  />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            } else if (role === "parent") {
              // Show locked items for Guardians/Parents
              return (
                <div
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-slate-500 py-2 md:px-2 rounded-md cursor-not-allowed opacity-50 relative group"
                >
                  <div className="relative">
                    <Image
                      src={item.icon}
                      alt=""
                      width={20}
                      height={20}
                      className="invert brightness-0 filter grayscale"
                    />
                    <Image
                      src="/lock.png" // Assuming you might need a lock icon, or use an emoji/lucide icon if image missing. I'll use text or existing if available. Using emoji for safety or just styling.
                      alt="locked"
                      width={10}
                      height={10}
                      className="absolute -top-1 -right-1"
                    />
                  </div>
                  <span className="hidden lg:block">{item.label}</span>
                  <div className="absolute left-full ml-2 bg-black text-white text-xs p-1 rounded hidden group-hover:block whitespace-nowrap z-50">
                    Unauthorized Access
                  </div>
                </div>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
