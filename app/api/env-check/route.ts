// @/app/api/env-check/route.ts
// Comments: Updated API route to include default values when environment variables are not set.
// Default image: public/logo.png, Default site name: "Aifa Blog Starter for GitHub and AI"

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Read environment variables with fallback to default values
    const siteName = process.env.SITE_NAME || "Aifa Blog Starter for GitHub and AI";
    const logoUrl = process.env.SITE_LOGO_URL || "/logo.png";

    // Return response with actual values or defaults
    return NextResponse.json({
      siteName: siteName,
      logoUrl: logoUrl,
      // Include flags to indicate if values are from env or defaults
      siteNameFromEnv: Boolean(process.env.SITE_NAME),
      logoUrlFromEnv: Boolean(process.env.SITE_LOGO_URL),
    });
  } catch (error) {
    // Log server-side for diagnostics
    console.error('Error checking env vars:', error);
    return NextResponse.json(
      { error: 'Failed to check environment variables' },
      { status: 500 }
    );
  }
}
