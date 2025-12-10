import Navbar from "@/components/Navbar";
import { AppSidebar } from "./_components/AppSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppSidebar>
      <Navbar />
      {children}
    </AppSidebar>
  );
}
