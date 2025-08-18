// @/app/layout.tsx
// Comments: Updated root layout using server component (no event handlers)

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "sonner";
import NavBar from "@/app/(_service)/components/nav-bar-role-selector";
import { RoleProvider } from "@/app/(_service)/contexts/role-provider";
import { NavigationMenuProvider } from "@/app/(_service)/contexts/nav-bar-provider";
import SiteBranding, { getSiteConfig } from "@/app/(_service)/components/site-branding";

// Comments: Dynamic metadata generation using environment variables
export async function generateMetadata(): Promise<Metadata> {
  const { siteName, logoUrl } = await getSiteConfig();
  
  // Comments: Create SEO-optimized title and description
  const defaultDescription = "NextJs Vercel Blob AI starter with ChatGPT, vector store knowledge base integration. Role-based blog platform for premium content & custom chatbots.";
  const siteDescription = process.env.SITE_DESCRIPTION || defaultDescription;
  
  return {
    title: siteName,
    description: siteDescription,
    generator: "aifa.dev",
    icons: logoUrl,
    // Comments: Additional SEO meta tags
    keywords: process.env.SITE_KEYWORDS || "nextjs, blog, ai, chatgpt, vector store, vercel",
    authors: [{ name: process.env.SITE_AUTHOR || "Aifa Team" }],
    creator: process.env.SITE_AUTHOR || "Aifa Team",
    // Comments: Open Graph meta tags for social media
    openGraph: {
      title: siteName,
      description: siteDescription,
      images: [logoUrl],
      type: "website",
      locale: "en_US",
    },
    // Comments: Twitter Card meta tags
    twitter: {
      card: "summary",
      title: siteName,
      description: siteDescription,
      images: [logoUrl],
    },
    // Comments: Additional meta tags for better SEO
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

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
            <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    {/* Comments: Using server component without event handlers */}
                    <SiteBranding 
                      showLogo={true}
                      showText={true}
                      logoSize={{ width: 32, height: 32 }}
                    />
                  </div>
                  <div className="flex items-center">
                    <NavBar />
                  </div>
                </div>
              </div>
            </header>
            <main className="pt-16 px-8 h-screen overflow-y-scroll">
              {children}
            </main>
            <Toaster richColors position="top-center" />
          </NavigationMenuProvider>
        </RoleProvider>
      </body>
    </html>
  );
}
