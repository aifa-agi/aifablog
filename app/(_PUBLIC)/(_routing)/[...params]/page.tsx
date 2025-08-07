// @/app/(_PUBLIC)/(_routing)/[...params]/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { menuData } from "../../../config/menu-data";
import { getStoredRole, Role, ROLE_LABELS } from "@/lib/utils";
import { MenuCategory, MenuLink } from "@/types/menu-types";

// Helper function for type guard of usableParams
function isUsableParams(obj: any): obj is { params: string[] } {
  return obj && Array.isArray(obj.params);
}

// Capitalize first letter
function capitalizeWord(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Find the matching category/link for current params/role
function findCategoryAndPage(
  params: string[] | undefined,
  role: Role
): { category?: MenuCategory; link?: MenuLink } {
  if (!params || params.length === 0) {
    console.log("[findCategoryAndPage] params undefined or empty:", params);
    return {};
  }
  const href = "/" + params.join("-");
  console.log("[findCategoryAndPage] href to match:", href);
  for (const category of menuData.categories) {
    for (const link of category.links) {
      if (link.roles.includes(role) && link.href === href) {
        console.log("[findCategoryAndPage] FOUND:", {
          category: category.title,
          link: link.name,
        });
        return { category, link };
      }
    }
  }
  console.log("[findCategoryAndPage] not found for params:", params, ", role:", role);
  return {};
}

// Тип пропсов для Next.js 15 app router
type ParamsType = { params?: any };

export default function CatchAllPage({ params }: ParamsType) {
  // NEW: Unwrap usable params via React.use (Next.js 15 compatible)
  const usableParams = React.use(params);
  const paramArray: string[] = isUsableParams(usableParams) ? usableParams.params : [];

  // Используем локальный стейт для роли и синхронизируем с localStorage
  const [role, setRole] = useState<Role>("guest");

  // При маунте и изменении URL подхватываем актуальную роль из localStorage
  useEffect(() => {
    setRole(getStoredRole());
    // Позволяет автоматически реагировать, если в другой вкладке сменится роль
    const onStorage = (e: StorageEvent) => {
      if (e.key === "aifa-role") setRole(getStoredRole());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

 

  const { category, link } = findCategoryAndPage(paramArray, role);

  if (!category || !link) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="p-8 rounded-lg bg-black/80 shadow-lg text-center w-full max-w-md border border-gray-800">
          <div className="text-xl text-red-400 font-semibold mb-2">Page not found</div>
          <div className="text-gray-400 text-base">
            No accessible menu entry matches this route for current role.<br />
            <code className="block mt-2 text-xs text-orange-400 break-words">
              params={JSON.stringify(paramArray)}
              <br />
              role={role}
            </code>
          </div>
        </div>
      </main>
    );
  }

  const badgeText =
    link.hasBadge && link.badgeName
      ? `type ${capitalizeWord(link.badgeName)}`
      : undefined;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <section className="bg-black/90 border border-gray-700 shadow-2xl rounded-2xl px-8 py-10 flex flex-col items-center w-full max-w-sm">
        <div className="text-2xl font-bold text-white mb-2">
          Hi, {ROLE_LABELS[role]}!
        </div>
        <div className="text-gray-300 text-lg mb-3 text-center">
          You are in the{" "}
          <span className="font-semibold text-blue-400">{category.title}</span> category
        </div>
        <div className="text-gray-200 text-base mb-2 text-center">
          on the <span className="font-semibold text-yellow-300">{link.name}</span> page
        </div>
        {badgeText && (
          <span className="inline-block px-4 py-1 mt-2 bg-emerald-600 text-white rounded-full font-semibold text-sm shadow">
            {badgeText}
          </span>
        )}
      </section>
    </main>
  );
}
