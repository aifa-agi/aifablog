// @/app/(_service)/components/nav-bar/admin-flow/editable-wide-menu/page-section/badges-actions-dropdown/components/badges-actions-dropdown.tsx

"use client";

import React from "react";
import { DropdownMenu, DropdownMenuTrigger } from "@/app/(_service)/components/ui/dropdown-menu";
import { BadgesActionsDropdownProps } from "../types";
import { BadgesTriggerButton } from "./badges-trigger-button";
import { BadgesDropdownContent } from "./badges-dropdown-content";

/**
 * Main badges actions dropdown component for managing page badges and roles
 * Always interactive as this is an administrative function
 * Hidden for "home" category as it's a protected category
 */
export function BadgesActionsDropdown({
  singlePage,
  categoryTitle,
  setCategories,
}: BadgesActionsDropdownProps) {
  // Hide dropdown if category is "home"
  if (categoryTitle.toLowerCase() === "home") {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <BadgesTriggerButton />
      </DropdownMenuTrigger>
      
      <BadgesDropdownContent
        singlePage={singlePage}
        categoryTitle={categoryTitle}
        setCategories={setCategories}
      />
    </DropdownMenu>
  );
}
