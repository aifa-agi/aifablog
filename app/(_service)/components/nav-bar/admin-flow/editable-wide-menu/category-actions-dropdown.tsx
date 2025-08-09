// @/app/(_service)/components/nav-bar/admin-flow/editable-wide-menu/category-actions-dropdown.tsx

"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/(_service)/components/ui/dropdown-menu";
import { Button } from "@/app/(_service)/components/ui/button";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { MenuCategory } from "@/app/(_service)/types/menu-types";
import { useDialogs } from "@/app/(_service)/contexts/dialogs";
import { toast } from "sonner";
import { normalizeText } from "@/app/(_service)/lib/normalize-text";

interface CategoryActionsDropdownProps {
  categoryTitle: string;
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
}


export function CategoryActionsDropdown({
  categoryTitle,
  setCategories,
}: CategoryActionsDropdownProps) {
  const dialogs = useDialogs();

  // Обработчик переименования категории
  const handleRename = () => {
    dialogs.show({
      type: "edit",
      title: "Rename category",
      description: "Enter new category name",
      value: categoryTitle,
      confirmLabel: "Rename",
      cancelLabel: "Cancel",
      onConfirm: (value) => {
        const normalizedValue = normalizeText(value as string);
        if (!normalizedValue) {
          toast.error("Category name cannot be empty");
          return;
        }

        // Проверяем уникальность нового названия
        setCategories((prev) => {
          const exists = prev.some(
            (cat) => 
              cat.title !== categoryTitle && 
              normalizeText(cat.title).toLowerCase() === normalizedValue.toLowerCase()
          );

          if (exists) {
            toast.error("Category with this name already exists");
            return prev;
          }

          // Обновляем название категории
          const updatedCategories = prev.map((cat) =>
            cat.title === categoryTitle
              ? { ...cat, title: normalizedValue }
              : cat
          );

          toast.success("Category renamed successfully");
          return updatedCategories;
        });
      },
      onCancel: () => {
        
      }
    });
  };


  const handleDelete = () => {
    dialogs.show({
      type: "delete",
      title: "Delete category",
      description: `Are you sure you want to delete category "${categoryTitle}"? All pages in this category will also be deleted. This action cannot be undone.`,
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
      onConfirm: () => {
        setCategories((prev) => {
          const filteredCategories = prev.filter((cat) => cat.title !== categoryTitle);
          toast.success("Category deleted successfully");
          return filteredCategories;
        });
      },
      onCancel: () => {
        
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-accent/60"
          onClick={(e) => {
            e.stopPropagation(); // Предотвращаем срабатывание клика по карточке
          }}
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open category menu</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-40">
        {/* Переименование */}
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleRename();
          }}
          className="cursor-pointer"
        >
          <Edit className="mr-2 h-4 w-4" />
          Rename
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Удаление */}
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
