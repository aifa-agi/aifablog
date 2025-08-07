import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "sonner";
import NavBarRoleSelector from "@/app/(_service)/components/nav-bar-role-selector";
import { RoleProvider } from "@/app/(_service)/contexts/role-provider";
import { DialogsProvider } from "./(_service)/contexts/dialogs-providers";
import { NavigationMenuProvider } from "@/app/(_service)/contexts/nav-bar-provider";

export const metadata: Metadata = {
  title: "NEXTJS BLOG WITH BLOB AND AI VECTOR STORE STARTER - AIFA ",
  description:
    "NextJs Vercel Blob AI starter with ChatGPT, vector store knowledge base integration. Role-based blog platform for premium content & custom chatbots.",
  generator: "aifa.dev",
  icons: "/logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <RoleProvider>
          <NavigationMenuProvider>
            <DialogsProvider>
              <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                      <Link
                        href="/"
                        className="text-white font-bold text-base md:text-xl hover:text-blue-400 transition-colors duration-150 cursor-pointer"
                      >
                        AIFA BLOG WITH BLOB AND AI VECTOR STORE
                      </Link>
                    </div>
                    <div className="flex items-center ">
                      <NavBarRoleSelector />
                    </div>
                  </div>
                </div>
              </header>
              <main className="pt-16 px-8 h-screen overflow-y-scroll">
                {children}
              </main>
              <Toaster richColors position="top-center" />
            </DialogsProvider>
          </NavigationMenuProvider>
        </RoleProvider>
      </body>
    </html>
  );
}
