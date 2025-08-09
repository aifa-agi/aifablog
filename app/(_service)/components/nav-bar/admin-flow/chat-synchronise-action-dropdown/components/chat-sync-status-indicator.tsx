// @/app/(_service)/components/nav-bar/admin-flow/editable-wide-menu/page-section/chat-synchronise-action-dropdown/components/chat-sync-status-indicator.tsx

"use client";

import React from "react";
import { cn } from "@/app/(_service)/lib/utils";
import { ChatSyncStatusIndicatorProps } from "../types";

/**
 * Status indicator circle for chat sync mode selection
 */
export function ChatSyncStatusIndicator({
  mode,
  isActive
}: ChatSyncStatusIndicatorProps) {
  const getIndicatorColor = () => {
    if (!isActive) return "bg-muted-foreground";
   
    switch (mode) {
      case "ChatSyncOn":
        return "bg-green-500";
      case "ChatSyncOff":
        return "bg-orange-500";
      default:
        return "bg-muted-foreground";
    }
  };

  return (
    <span
      className={cn(
        "inline-block mr-3 align-middle rounded-full border border-black/30",
        getIndicatorColor()
      )}
      style={{
        width: 12,
        height: 12,
        minWidth: 12,
        minHeight: 12
      }}
    />
  );
}
