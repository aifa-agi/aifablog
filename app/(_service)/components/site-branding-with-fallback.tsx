// @/app/(_service)/components/site-branding-with-fallback.tsx
// Comments: Client component version with fallback image handling
// Use this when you need onError functionality for image fallbacks

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface SiteBrandingWithFallbackProps {
  className?: string;
  linkClassName?: string;
  showLogo?: boolean;
  showText?: boolean;
  logoSize?: {
    width: number;
    height: number;
  };
  fallbackImage?: string;
}

export default function SiteBrandingWithFallback({
  className = "",
  linkClassName = "flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200",
  showLogo = true,
  showText = true,
  logoSize = { width: 32, height: 32 },
  fallbackImage = "/logo.png"
}: SiteBrandingWithFallbackProps) {
  const [siteName, setSiteName] = useState("Aifa Blog Starter for GitHub and AI");
  const [logoUrl, setLogoUrl] = useState("/logo.png");
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function loadSiteConfig() {
      try {
        const res = await fetch("/api/env-check", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load site config");
        
        const data: { siteName: string; logoUrl: string } = await res.json();
        
        if (!cancelled) {
          setSiteName(data.siteName);
          setLogoUrl(data.logoUrl);
        }
      } catch (error) {
        console.error("Failed to load site config:", error);
        // Keep default values on error
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    
    loadSiteConfig();
    return () => {
      cancelled = true;
    };
  }, []);

  // Comments: Handle image error with fallback logic
  const handleImageError = () => {
    console.warn(`Failed to load image: ${logoUrl}, falling back to: ${fallbackImage}`);
    setImageError(true);
  };

  const currentImageSrc = imageError ? fallbackImage : logoUrl;

  return (
    <div className={className}>
      <Link href="/" className={linkClassName}>
        {showLogo && (
          <Image
            src={currentImageSrc}
            alt={`${siteName} Logo`}
            width={logoSize.width}
            height={logoSize.height}
            className="object-contain"
            priority
            onError={handleImageError}
          />
        )}
        {showText && (
          <span className="text-white font-bold text-base md:text-xl hover:text-blue-400 transition-colors duration-150">
            {siteName}
          </span>
        )}
      </Link>
    </div>
  );
}
