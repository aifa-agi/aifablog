"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/(_service)/components/ui/dropdown-menu";
import { Pencil } from "lucide-react";
import { MenuCategory } from "@/app/config/menu-types";
import { useDialogs } from "@/app/(_service)/contexts/dialogs-providers";
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

  const handleRename = () => {
  dialogs.show({
    type: "edit",
    title: "Rename category",
    description: categoryTitle,
    value: categoryTitle,
    confirmLabel: "Save changes",
    onConfirm: (value) => {
      const normalizedValue = normalizeText(value as string);
      if (!normalizedValue) {
        toast.error("Category name cannot be empty");
        return;
      }
      const exists = (prevCategories: MenuCategory[]) =>
        prevCategories.some(
          (cat) =>
            normalizeText(cat.title).toLowerCase() === normalizedValue.toLowerCase() &&
            cat.title !== categoryTitle
        );
      setCategories((prev) => {
        if (exists(prev)) {
          toast.error("Category with this name already exists");
          return prev;
        }
        return prev.map((cat) =>
          cat.title === categoryTitle ? { ...cat, title: normalizedValue } : cat
        );
      });
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
        <DropdownMenuItem onClick={handleRename}>Rename</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
