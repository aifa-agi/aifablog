// @/app/(_service)/components/nav-bar/admin-flow/editable-wide-menu/page-section/publish-actions-dropdown/components/publish-trigger-button.tsx

"use client";

import React from "react";
import { Globe } from "lucide-react";
import { cn } from "@/app/(_service)/lib/utils";
import { PublishTriggerButtonProps } from "../types";
import { globeColors } from "../publish-utils";

/**
 * Trigger button with globe icon for publish actions dropdown
 */
export function PublishTriggerButton({ 
  publishState, 
  onClick 
}: PublishTriggerButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-center w-8 h-8 rounded transition hover:bg-accent/60",
        globeColors[publishState]
      )}
      tabIndex={-1}
      onClick={onClick}
      aria-label="Toggle publish options"
    >
      <Globe className="w-4 h-4" />
    </button>
  );
}
