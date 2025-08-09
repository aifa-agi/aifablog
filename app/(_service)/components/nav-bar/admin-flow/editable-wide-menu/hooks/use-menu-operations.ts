"use client";

import { useState, useMemo } from "react";
import { MenuCategory } from "@/app/(_service)/types/menu-types";
import { PageData, PageType } from "@/app/(_service)/types/page-types";
import { generateCuid } from "@/app/(_service)/lib/generate-cuid";
import { normalizeText } from "@/app/(_service)/lib/normalize-text";
import { toast } from "sonner";
import { arrayMove } from "@dnd-kit/sortable";
import { useDialogs } from "@/app/(_service)/contexts/dialogs";

export function useMenuOperations(
  categories: MenuCategory[],
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>
) {
  const dialogs = useDialogs();
  const [activeCategoryTitle, setActiveCategoryTitle] = useState<string | null>(null);

  const activeCategory = useMemo(
    () => categories.find((cat) => cat.title === activeCategoryTitle) ?? null,
    [categories, activeCategoryTitle]
  );

  const handleCategoryDragEnd = (activeId: string, overId: string) => {
    if (activeId !== overId) {
      const oldIndex = categories.findIndex((c) => c.title === activeId);
      const newIndex = categories.findIndex((c) => c.title === overId);
      setCategories((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handlePageDragEnd = (activeId: string, overId: string) => {
    if (!activeCategory || activeId === overId) return;
    
    setCategories((cats) =>
      cats.map((cat) =>
        cat.title !== activeCategory.title
          ? cat
          : {
              ...cat,
              pages: arrayMove(
                cat.pages,
                cat.pages.findIndex((l) => l.id === activeId),
                cat.pages.findIndex((l) => l.id === overId)
              ),
            }
      )
    );
  };

  const handleAddCategory = () => {
    dialogs.show({
      type: "create",
      title: "New category",
      description: "Enter a category name",
      value: "",
      confirmLabel: "Create",
      onConfirm: (value) => {
        const normalizedValue = normalizeText(value as string);
        if (!normalizedValue) {
          toast.error("Category name cannot be empty");
          return;
        }
        
        const exists = categories.some(
          (cat) => normalizeText(cat.title).toLowerCase() === normalizedValue.toLowerCase()
        );
        
        if (exists) {
          toast.error("Category with this name already exists");
          return;
        }
        
        const maxOrder = categories.length ? Math.max(...categories.map((c) => c.order ?? 0)) : 0;
        setCategories((prev) => [
          ...prev,
          {
            id: generateCuid(),
            title: normalizedValue,
            pages: [],
            order: maxOrder + 1,
          },
        ]);
      },
    });
  };

  const handleAddPage = (category: MenuCategory) => {
    dialogs.show({
      type: "create",
      title: "New page",
      description: `Enter link name for "${category.title}"`,
      value: "",
      confirmLabel: "Create",
      onConfirm: (value) => {
        if (!value) return;
        const normalizedName = normalizeText(value);
        
        setCategories((prev) =>
          prev.map((cat) =>
            cat.title === category.title
              ? {
                  ...cat,
                  pages: [
                    ...cat.pages,
                    {
                      id: generateCuid(),
                      linkName: normalizedName,
                      href: "/" + normalizedName,
                      roles: ["guest"],
                      hasBadge: false,
                      type: "blog" as PageType,
                      isPublished: false,
                      isVectorConnected: false,
                      isChatSynchronized: false,
                      order: cat.pages.length > 0 
                        ? Math.max(...cat.pages.map((l) => l.order ?? 0)) + 1 
                        : 1,
                    },
                  ],
                }
              : cat
          )
        );
      },
    });
  };

  return {
    activeCategoryTitle,
    setActiveCategoryTitle,
    activeCategory,
    handleCategoryDragEnd,
    handlePageDragEnd,
    handleAddCategory,
    handleAddPage,
  };
}
