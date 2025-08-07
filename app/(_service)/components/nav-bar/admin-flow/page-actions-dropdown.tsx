"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/(_service)/components/ui/dropdown-menu";
import {  FileCode2 } from "lucide-react";
import {  MenuCategory } from "@/app/config/menu-types";
import { useDialogs } from "@/app/(_service)/contexts/dialogs-providers";
import { useState } from "react";
import { Button } from "@/app/(_service)/components/ui/button";
import { PageData } from "@/app/(_service)/types/page-types";

const PAGE_TYPES = ["Page", "Blog", "Docs", "Guide", "Shop"] as const;

interface PageActionsDropdownProps {
  singlePage: PageData;
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
}

export function PageActionsDropdown({
  singlePage,
  setCategories,
}: PageActionsDropdownProps) {
  const dialogs = useDialogs();
  const [pageType, setPageType] = useState<string | null>(null);

  const handleSetPageType = (type: string) => {
    setPageType(type);
    
  };

  const handleAddPageCode = () => {};

  const handleDelete = () => {};

  const handleKeyWord = () => {}
  


  const selectedType =  pageType;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
        variant="ghost"
          size="icon"
          className="flex items-center justify-center w-8 h-8 rounded transition hover:bg-accent/60"
          tabIndex={-1}
        >
          <FileCode2 className="w-4 h-4 text-primary/80" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[190px]">

        
        <DropdownMenuItem onClick={handleAddPageCode}>
          Title
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleAddPageCode}>
          Description
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleAddPageCode}>
          Image
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleKeyWord}>
          Key Word
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleAddPageCode}>
          Page body
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* <DropdownMenuGroup>
          {PAGE_TYPES.map((type) => (
            <DropdownMenuItem
              key={type}
              onClick={() => handleSetPageType(type)}
              className="cursor-pointer select-none"
            >
              <span
                className={cn(
                  "inline-block mr-3 align-middle rounded-full border border-black/30",
                  selectedType === type
                    ? "bg-green-500"
                    : "bg-muted-foreground"
                )}
                style={{ width: 12, height: 12, minWidth: 12, minHeight: 12 }}
              />
              <span>{type}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup> */}

        {/* <DropdownMenuSeparator /> */}

        <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
          Delete
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
