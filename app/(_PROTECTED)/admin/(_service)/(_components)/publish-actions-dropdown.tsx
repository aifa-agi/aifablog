"use client";

import React, { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const globeColors: Record<string, string> = {
  inactive: "text-gray-400",
  pending: "text-orange-400",
  active: "text-green-500",
};

export function PublishActionsDropdown({ linkId }: { linkId: string }) {
  const [state, setState] = useState<"inactive" | "pending" | "active">("inactive");
  const [publishMode, setPublishMode] = useState<"draft" | "published">("draft");

  const setStatus = (newState: "inactive" | "pending" | "active") => {
    setState(newState);
    console.log("PUBLISH STATUS CHANGED", linkId, newState);
  };

  const handlePublishMode = (mode: "draft" | "published") => {
    setPublishMode(mode);
    setState(mode === "draft" ? "pending" : "active");
    console.log("PUBLISH MODE CHANGED", linkId, mode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded transition hover:bg-accent/60",
            globeColors[state]
          )}
          tabIndex={-1}
        >
          <Globe className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[190px]">
        <DropdownMenuItem onClick={() => { setStatus("inactive"); console.log("Create clicked", linkId); }}>
          Create
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handlePublishMode("draft")}>
          <span className="flex items-center">
            <span
              className={cn(
                "inline-block mr-3 align-middle rounded-full border border-black/30",
                publishMode === "draft" ? "bg-green-500" : "bg-muted-foreground"
              )}
              style={{ width: 12, height: 12, minWidth: 12, minHeight: 12 }}
            />
            Draft
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handlePublishMode("published")}>
          <span className="flex items-center">
            <span
              className={cn(
                "inline-block mr-3 align-middle rounded-full border border-black/30",
                publishMode === "published" ? "bg-green-500" : "bg-muted-foreground"
              )}
              style={{ width: 12, height: 12, minWidth: 12, minHeight: 12 }}
            />
            Publish
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setStatus("pending"); console.log("Edit clicked", linkId); }}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => { setStatus("inactive"); console.log("Delete clicked", linkId); }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
