"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Code, FileCode2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { MenuLink, MenuCategory } from "@/types/menu-types";
import { useDialogs } from "@/app/contexts/dialogs-providers";
import { useState } from "react";

const PAGE_TYPES = ["Page", "Blog", "Docs", "Guide", "Shop"] as const;

interface PageActionsDropdownProps {
  link: MenuLink;
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
}

export function PageActionsDropdown({
  link,
  setCategories,
}: PageActionsDropdownProps) {
  const dialogs = useDialogs();
  const [pageType, setPageType] = useState<string | null>(null);

  const handleSetPageType = (type: string) => {
    setPageType(type);
    
  };

  const handleAddPageCode = () => {};

  const handleDelete = () => {};

  // Для выделения текущего режима (если уже сохранён тип страницы в link)
  const selectedType =  pageType;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center justify-center w-8 h-8 rounded transition hover:bg-accent/60"
          tabIndex={-1}
        >
          <FileCode2 className="w-4 h-4 text-primary/80" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[190px]">

        <DropdownMenuItem onClick={handleAddPageCode}>
          Add page code
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
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
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
          Delete
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
