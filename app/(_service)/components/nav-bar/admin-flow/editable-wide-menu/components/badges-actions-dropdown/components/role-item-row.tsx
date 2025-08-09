// @/app/(_service)/components/nav-bar/admin-flow/editable-wide-menu/page-section/badges-actions-dropdown/components/role-item-row.tsx

"use client";

import React from "react";
import { DropdownMenuItem } from "@/app/(_service)/components/ui/dropdown-menu";
import { RoleItemRowProps } from "../types";
import { BadgesStatusIndicator } from "./badges-status-indicator";

/**
 * Individual role item row with toggle functionality
 */
export function RoleItemRow({
  role,
  isActive,
  onToggle
}: RoleItemRowProps) {
  
  return (
    <DropdownMenuItem
      onClick={onToggle}
      className="cursor-pointer select-none"
    >
      <BadgesStatusIndicator isActive={isActive} />
      <span className="capitalize">{role}</span>
    </DropdownMenuItem>
  );
}
