// app/(_service)/lib/persist-menu.ts
import type { MenuCategory } from "@/app/(_service)/types/menu-types";

export async function persistMenuCategories(
  categories: MenuCategory[],
): Promise<{ status: string; message?: string; error?: string }> {
  const res = await fetch("/api/menu/persist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ categories}),
  });

  return await res.json();
}
