"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
  disableHover: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
  disableHover = false,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
  disableHover?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate, disableHover }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
  disableHover = false,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
  disableHover?: boolean;
}) => {
  return (
    <SidebarProvider
      open={open}
      setOpen={setOpen}
      animate={animate}
      disableHover={disableHover}
    >
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as any)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate, disableHover } = useSidebar();

  return (
    <motion.div
      className={cn(
        "h-full px-3 py-4 hidden md:flex md:flex-col bg-black w-[220px] flex-shrink-0 border-r border-zinc-800",
        className
      )}
      animate={{
        width: animate && !disableHover ? (open ? "220px" : "56px") : "220px",
      }}
      transition={{
        type: "tween",
        duration: 0.2,
        ease: "easeOut",
      }}
      style={{
        willChange: "width",
      }}
      onMouseEnter={() => !disableHover && setOpen(true)}
      onMouseLeave={() => !disableHover && setOpen(false)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-12 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-black w-full border-b border-zinc-800"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <IconMenu2
            className="text-white cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                type: "tween",
                duration: 0.25,
                ease: "easeOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-black p-10 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-white cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// Tooltip component for collapsed sidebar
const Tooltip = ({
  children,
  content,
  show,
}: {
  children: React.ReactNode;
  content: string;
  show: boolean;
}) => {
  return (
    <div className="relative group">
      {children}
      {show && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-zinc-800 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 border border-zinc-700">
          {content}
        </div>
      )}
    </div>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate, disableHover } = useSidebar();
  const showTooltip = !open && animate && !disableHover;

  return (
    <Tooltip content={link.label} show={showTooltip}>
      <Link
        href={link.href}
        className={cn(
          "flex items-center justify-start gap-2 group/sidebar py-2 px-2 rounded-lg hover:bg-zinc-900 transition-colors duration-150",
          className
        )}
        {...props}
      >
        {link.icon}
        <motion.span
          animate={{
            display:
              animate && !disableHover
                ? open
                  ? "inline-block"
                  : "none"
                : "inline-block",
            opacity: animate && !disableHover ? (open ? 1 : 0) : 1,
          }}
          transition={{
            type: "tween",
            duration: 0.15,
            ease: "easeOut",
          }}
          className="text-zinc-300 text-sm group-hover/sidebar:text-white transition-colors duration-150 whitespace-nowrap overflow-hidden text-ellipsis inline-block !p-0 !m-0 w-full"
        >
          {link.label}
        </motion.span>
      </Link>
    </Tooltip>
  );
};
