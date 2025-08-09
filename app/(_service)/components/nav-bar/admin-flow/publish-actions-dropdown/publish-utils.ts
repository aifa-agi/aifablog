// @/app/(_service)/components/nav-bar/admin-flow/editable-wide-menu/page-section/publish-actions-dropdown/publish-utils.ts

import { PageData } from "@/app/(_service)/types/page-types";
import { PublishState, PublishMode } from "./types";

export const globeColors: Record<PublishState, string> = {
  inactive: "text-muted-foreground", // Changed from text-gray-400
  pending: "text-orange-400",
  active: "text-green-500",
};

/**
 * Check if page has required content for publishing
 */
export function hasPageContent(page: PageData): boolean {
  const hasBasicContent = Boolean(
    page.title && 
    page.description && 
    page.images && page.images.length > 0 &&
    page.keyWords && page.keyWords.length > 0 &&
    page.sections && page.sections.length > 0
  );
  
  return hasBasicContent;
}

/**
 * Determine publish state based on page data
 */
export function getPublishState(page: PageData): PublishState {
  if (page.isPublished) {
    return "active";
  }
  
  if (hasPageContent(page)) {
    return "pending";
  }
  
  return "inactive";
}

/**
 * Get publish mode from boolean state
 */
export function getPublishMode(isPublished: boolean): PublishMode {
  return isPublished ? "published" : "draft";
}
