"use client";

import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/(_service)/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { cn } from "@/app/(_service)/lib/utils";
import {  MenuCategory } from "@/app/(_service)/types/menu-types";
import { PageData } from "@/app/(_service)/types/page-types";

const globeColors: Record<string, string> = {
  inactive: "text-gray-400",
  pending: "text-orange-400",
  active: "text-green-500",
};

interface PublishActionsDropdownProps {
  singlePage: PageData;
  categoryTitle: string;
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
}

export function PublishActionsDropdown({
  singlePage,
  categoryTitle,
  setCategories,
}: PublishActionsDropdownProps) {
  const publishedState = singlePage.isPublished ? "active" : "pending";
  const publishMode = singlePage.isPublished ? "published" : "draft";

  const handlePublishMode = (mode: "draft" | "published") => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.title !== categoryTitle
          ? cat
          : {
              ...cat,
              pages: cat.pages.map((l) =>
                l.id !== singlePage.id
                  ? l
                  : {
                      ...l,
                      isPublished: mode === "published",
                    }
              ),
            }
      )
    );
    console.log("PUBLISH MODE CHANGED", singlePage.id, mode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded transition hover:bg-accent/60",
            globeColors[publishedState]
          )}
          tabIndex={-1}
        >
          <Globe className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[190px]">
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
        </DropdownMenuItem><DropdownMenuItem onClick={() => handlePublishMode("draft")}>
          <span className="flex items-center">
            <span
              className={cn(
                "inline-block mr-3 align-middle rounded-full border border-black/30",
                publishMode === "draft" ? "bg-orange-500" : "bg-muted-foreground"
              )}
              style={{ width: 12, height: 12, minWidth: 12, minHeight: 12 }}
            />
            Draft
          </span>
        </DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
}