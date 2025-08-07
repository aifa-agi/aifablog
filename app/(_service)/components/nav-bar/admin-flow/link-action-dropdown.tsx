
"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/(_service)/components/ui/dropdown-menu";
import { Button } from "@/app/(_service)/components/ui/button";
import { Link2 } from "lucide-react"; 
import { MenuCategory } from "@/app/(_service)/types/menu-types";
import { PageData } from "@/app/(_service)/types/page-types";

interface LinkManagementDropdownProps {
  singlePage: PageData;
  categoryTitle: string;
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
}

export function LinkActionsDropdown({
  singlePage,
  categoryTitle,
  setCategories,
}: LinkManagementDropdownProps) {
  
  const handleGetLinks = () => {
    // Логика для получения ссылок
    console.log("Get pages for:", singlePage.name);
    // Добавьте здесь вашу логику
  };

  const handleCreateLinks = () => {
    // Логика для создания ссылок
    console.log("Create pages for:", singlePage.name);
    // Добавьте здесь вашу логику
  };

  const handleExternalLinks = () => {
    // Логика для внешних ссылок
    console.log("External pages for:", singlePage.name);
    // Добавьте здесь вашу логику
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center justify-center w-8 h-8 rounded transition hover:bg-accent/60"
        >
          <Link2 className="w-4 h-4 text-primary/80" />
          <span className="sr-only">Link builder</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleGetLinks}>
          Get Links
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCreateLinks}>
          Create Links
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExternalLinks}>
          External Links
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
