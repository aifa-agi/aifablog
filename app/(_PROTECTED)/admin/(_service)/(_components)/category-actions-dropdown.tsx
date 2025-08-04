"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil } from "lucide-react";
import { MenuCategory } from "@/types/menu-types";
import { useDialogs } from "@/app/contexts/dialogs-providers";

interface CategoryActionsDropdownProps {
  categoryTitle: string;
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
}

export function CategoryActionsDropdown({
  categoryTitle,
  setCategories,
}: CategoryActionsDropdownProps) {
  const dialogs = useDialogs();

  const handleRename = () => {
    dialogs.show({
      type: "edit",
      title: "Rename category",
      description: categoryTitle,
      value: categoryTitle,
      confirmLabel: "Save changes",
      onConfirm: (value) => {
        if (!value) return;
        setCategories((prev) =>
          prev.map((cat) =>
            cat.title === categoryTitle ? { ...cat, title: value } : cat
          )
        );
      },
    });
  };

  const handleDelete = () => {
    dialogs.show({
      type: "delete",
      title: "Delete category",
      description: `Are you sure you want to delete category "${categoryTitle}"?`,
      confirmLabel: "Delete",
      onConfirm: () => {
        setCategories((prev) =>
          prev.filter((cat) => cat.title !== categoryTitle)
        );
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          tabIndex={-1}
          className="flex items-center justify-center w-8 h-8 rounded transition hover:bg-accent/60"
        >
          <Pencil className="w-4 h-4 text-primary/80" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        <DropdownMenuItem onClick={handleRename}>
          Rename
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
