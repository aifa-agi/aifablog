// @/app/api/menu/route.ts

import { NextResponse } from "next/server";
import { contentData } from "@/app/config/content/content-data";

export async function GET() {
  try {
    return NextResponse.json({
      status: "ok",
      categories: contentData.categories
    });
  } catch (e: any) {
    console.error("Error fetching menu categories:", e);
    return NextResponse.json(
      { error: "Failed to fetch menu categories" }, 
      { status: 500 }
    );
  }
}
