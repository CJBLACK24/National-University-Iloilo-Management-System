import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QueryProvider from "@/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NU Iloilo Management System",
  description: "National University Iloilo Management System",
  keywords: [
    "university",
    "management",
    "NU Iloilo",
    "education",
    "students",
    "faculty",
  ],
  authors: [{ name: "Christian Duque" }],
  openGraph: {
    title: "NU Iloilo Management System",
    description: "National University Iloilo Management System",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <QueryProvider>
          {children}
          <ToastContainer
            position="bottom-right"
            theme="dark"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </QueryProvider>
      </body>
    </html>
  );
}
