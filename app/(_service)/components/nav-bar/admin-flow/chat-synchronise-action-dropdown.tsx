"use client";

import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/(_service)/components/ui/dropdown-menu";
import { ArrowLeftRight } from "lucide-react";
import { cn } from "@/app/(_service)/lib/utils";
import { MenuCategory } from "@/app/(_service)/types/menu-types";
import { PageData } from "@/app/(_service)/types/page-types";

interface ChatSynchroniseActionDropdownProps {
  singlePage: PageData;
  categoryTitle: string;
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
}

export function ChatSynchroniseActionDropdown({
  singlePage,
  categoryTitle,
  setCategories,
}: ChatSynchroniseActionDropdownProps) {
  const synchronized = singlePage.isChatSynchronized === true;

  const handleEnableSync = () => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.title !== categoryTitle
          ? cat
          : {
              ...cat,
              pages: cat.pages.map((l) =>
                l.id === singlePage.id
                  ? { ...l, isChatSynchronized: true }
                  : l
              ),
            }
      )
    );
    console.log("ChatSync ENABLED", singlePage.id);
  };

  const handleDisableSync = () => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.title !== categoryTitle
          ? cat
          : {
              ...cat,
              pages: cat.pages.map((l) =>
                l.id === singlePage.id
                  ? { ...l, isChatSynchronized: false }
                  : l
              ),
            }
      )
    );
    console.log("ChatSync DISABLED", singlePage.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          tabIndex={-1}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded transition hover:bg-accent/60",
            synchronized ? "text-green-500" : "text-orange-500"
          )}
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[190px]">
        <DropdownMenuItem onClick={handleEnableSync}>
          <span className="flex items-center">
            <span
              className={cn(
                "inline-block mr-3 align-middle rounded-full border border-black/30",
                synchronized ? "bg-green-500" : "bg-muted-foreground"
              )}
              style={{ width: 12, height: 12, minWidth: 12, minHeight: 12 }}
            />
            Synchronize
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDisableSync}>
          <span className="flex items-center">
            <span
              className={cn(
                "inline-block mr-3 align-middle rounded-full border border-black/30",
                !synchronized ? "bg-orange-500" : "bg-muted-foreground"
              )}
              style={{ width: 12, height: 12, minWidth: 12, minHeight: 12 }}
            />
            Unsynchronize
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
