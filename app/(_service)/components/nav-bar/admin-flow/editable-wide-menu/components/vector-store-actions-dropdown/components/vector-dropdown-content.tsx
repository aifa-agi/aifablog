// @/app/(_service)/components/nav-bar/admin-flow/editable-wide-menu/page-section/vector-store-actions-dropdown/components/vector-dropdown-content.tsx

"use client";

import React from "react";
import { DropdownMenuContent, DropdownMenuItem } from "@/app/(_service)/components/ui/dropdown-menu";
import { VectorStoreDropdownContentProps } from "../types";
import { VectorStoreStatusIndicator } from "./vector-status-indicator";

/**
 * Dropdown menu content with vector store on/off options
 */
export function VectorStoreDropdownContent({
  currentMode,
  onModeChange
}: VectorStoreDropdownContentProps) {
  return (
    <DropdownMenuContent align="end" className="min-w-[190px]">
      <DropdownMenuItem onClick={() => onModeChange("VectorStoreOn")}>
        <span className="flex items-center">
          <VectorStoreStatusIndicator
            mode="VectorStoreOn"
            isActive={currentMode === "VectorStoreOn"}
          />
          Connect
        </span>
      </DropdownMenuItem>
     
      <DropdownMenuItem onClick={() => onModeChange("VectorStoreOff")}>
        <span className="flex items-center">
          <VectorStoreStatusIndicator
            mode="VectorStoreOff"
            isActive={currentMode === "VectorStoreOff"}
          />
          Disconnect
        </span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
