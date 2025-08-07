"use client";

import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/(_service)/components/ui/dropdown-menu";
import { Database } from "lucide-react";
import { cn } from "@/app/(_service)/lib/utils";
import { MenuCategory } from "@/app/config/menu-types";
import { PageData } from "@/app/(_service)/types/page-types";

interface VectorStoreActionsDropdownProps {
  singlePage: PageData;
  categoryTitle: string;
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
}

export function VectorStoreActionsDropdown({
  singlePage,
  categoryTitle,
  setCategories,
}: VectorStoreActionsDropdownProps) {
  const connected = singlePage.isVectorConnected === true;

  const handleConnect = () => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.title !== categoryTitle
          ? cat
          : {
              ...cat,
              pages: cat.pages.map((l) =>
                l.id === singlePage.id
                  ? { ...l, isVectorConnected: true }
                  : l
              ),
            }
      )
    );
    console.log("VectorStore CONNECTED", singlePage.id);
  };

  const handleDisconnect = () => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.title !== categoryTitle
          ? cat
          : {
              ...cat,
              pages: cat.pages.map((l) =>
                l.id === singlePage.id
                  ? { ...l, isVectorConnected: false }
                  : l
              ),
            }
      )
    );
    console.log("VectorStore DISCONNECTED", singlePage.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          tabIndex={-1}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded transition hover:bg-accent/60",
            connected ? "text-green-500" : "text-orange-500"
          )}
        >
          <Database className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[190px]">
        <DropdownMenuItem onClick={handleConnect}>
          <span className="flex items-center">
            <span
              className={cn(
                "inline-block mr-3 align-middle rounded-full border border-black/30",
                connected ? "bg-green-500" : "bg-muted-foreground"
              )}
              style={{ width: 12, height: 12, minWidth: 12, minHeight: 12 }}
            />
            Connect
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDisconnect}>
          <span className="flex items-center">
            <span
              className={cn(
                "inline-block mr-3 align-middle rounded-full border border-black/30",
                !connected ? "bg-orange-500" : "bg-muted-foreground"
              )}
              style={{ width: 12, height: 12, minWidth: 12, minHeight: 12 }}
            />
            Disconnect
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
