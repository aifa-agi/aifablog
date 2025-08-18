// @/app/(_service)/components/site-branding.tsx
// Comments: Server component without event handlers (onError removed)
// For fallback image handling, we use a separate client component approach

import Image from "next/image";
import Link from "next/link";

interface SiteBrandingProps {
  className?: string;
  linkClassName?: string;
  showLogo?: boolean;
  showText?: boolean;
  logoSize?: {
    width: number;
    height: number;
  };
}

// Comments: Server-side function to get site configuration with defaults
async function getSiteConfig() {
  // Read environment variables with fallback to defaults
  const siteName = process.env.SITE_NAME || "Aifa Blog Starter for GitHub and AI";
  const logoUrl = process.env.SITE_LOGO_URL || "/logo.png";
  
  return {
    siteName,
    logoUrl,
    siteNameFromEnv: Boolean(process.env.SITE_NAME),
    logoUrlFromEnv: Boolean(process.env.SITE_LOGO_URL),
  };
}

export default async function SiteBranding({
  className = "",
  linkClassName = "flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200",
  showLogo = true,
  showText = true,
  logoSize = { width: 32, height: 32 }
}: SiteBrandingProps) {
  // Comments: Get site config on server-side for better SEO and performance
  const { siteName, logoUrl } = await getSiteConfig();

  return (
    <div className={className}>
      <Link href="/" className={linkClassName}>
        {showLogo && (
          <Image
            src={logoUrl}
            alt={`${siteName} Logo`}
            width={logoSize.width}
            height={logoSize.height}
            className="object-contain"
            priority
            // Comments: onError removed - cannot use event handlers in server components
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

// Comments: Export the config function for use in other components
export { getSiteConfig };
