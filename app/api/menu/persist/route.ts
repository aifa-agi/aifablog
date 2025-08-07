import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.resolve(process.cwd(), "app/config/content-data.ts");

function isProduction() {
  return process.env.NODE_ENV === "production";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { categories } = body;

    

    if (isProduction()) {
      console.log("Attempt to save to GitHub");
      return NextResponse.json({ status: "ok", message: "Attempt to save to GitHub" });
    }

    if (!Array.isArray(categories)) {
      return NextResponse.json({ error: "Malformed data" }, { status: 400 });
    }

    const fileContents = `import { MenuCategory } from "@/app/(_service)/types/menu-types";

export const contentData = {
  categories: ${JSON.stringify(categories, null, 2)}
} as { categories: MenuCategory[] };

export type contentData = typeof contentData;
`;

    fs.writeFileSync(DATA_PATH, fileContents, { encoding: "utf8" });

    return NextResponse.json({ status: "ok", message: "Saved to filesystem" });
  } catch (e: any) {
    console.error("Error saving menu:", e);
    return NextResponse.json({ error: e.message || "Unknown error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    return NextResponse.json({ status: "ok", message: "Menu persist API endpoint" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Unknown error" }, { status: 500 });
  }
}
