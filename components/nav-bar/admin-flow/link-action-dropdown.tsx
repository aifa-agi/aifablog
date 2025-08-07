
"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react"; 
import { MenuCategory, MenuLink } from "@/types/menu-types";

interface LinkManagementDropdownProps {
  link: MenuLink;
  categoryTitle: string;
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
}

export function LinkActionsDropdown({
  link,
  categoryTitle,
  setCategories,
}: LinkManagementDropdownProps) {
  
  const handleGetLinks = () => {
    // Логика для получения ссылок
    console.log("Get links for:", link.name);
    // Добавьте здесь вашу логику
  };

  const handleCreateLinks = () => {
    // Логика для создания ссылок
    console.log("Create links for:", link.name);
    // Добавьте здесь вашу логику
  };

  const handleExternalLinks = () => {
    // Логика для внешних ссылок
    console.log("External links for:", link.name);
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
