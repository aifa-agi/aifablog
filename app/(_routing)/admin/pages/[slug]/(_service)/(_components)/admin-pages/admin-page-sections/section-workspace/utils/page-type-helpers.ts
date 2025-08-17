

// @app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/section-workspace/utils/page-type-helpers.ts
import { PageType } from "@/app/(_service)/types/page-types";

export const getPageTypeName = (pageType: PageType): string => {
  const typeMap: Record<PageType, string> = {
    homePage: "Homepage",
    basePage: "Base Page", 
    footerPage: "Footer Page",
    blog: "Blog",
    document: "Document", 
    guide: "Guide",
    shopItem: "Shop Item"
  };
  
  return typeMap[pageType] || "Unknown";
};

export const getPageTypeColor = (pageType: PageType): string => {
  const colorMap: Record<PageType, string> = {
    homePage: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    basePage: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    footerPage: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200", 
    blog: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    document: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    guide: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    shopItem: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
  };
  
  return colorMap[pageType] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
};
