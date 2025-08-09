// @/app/(_service)/components/nav-bar/admin-flow/editable-wide-menu/page-section/publish-actions-dropdown/components/publish-actions-dropdown.tsx

"use client";

import React from "react";
import { DropdownMenu, DropdownMenuTrigger } from "@/app/(_service)/components/ui/dropdown-menu";
import { PublishActionsDropdownProps } from "../types";
import { PublishTriggerButton } from "./publish-trigger-button";
import { PublishDropdownContent } from "./publish-dropdown-content";
import { usePublishLogic } from "../hooks/use-publish-logic";

/**
 * Main publish actions dropdown component with conditional interaction
 * Only opens dropdown when content is ready for publishing
 */
export function PublishActionsDropdown({
  singlePage,
  categoryTitle,
  setCategories,
}: PublishActionsDropdownProps) {
 
  const { 
    publishState, 
    publishMode, 
    isInteractive,
    handlePublishMode 
  } = usePublishLogic({
    singlePage,
    categoryTitle,
    setCategories,
  });

  // If not interactive, render just the trigger button without dropdown functionality
  if (!isInteractive) {
    return <PublishTriggerButton publishState={publishState} />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <PublishTriggerButton publishState={publishState} />
      </DropdownMenuTrigger>
     
      <PublishDropdownContent
        currentMode={publishMode}
        onModeChange={handlePublishMode}
      />
    </DropdownMenu>
  );
}
