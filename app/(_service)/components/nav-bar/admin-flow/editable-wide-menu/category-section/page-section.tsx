"use client";

import React from "react";
import { Button } from "@/app/(_service)/components/ui/button";
import { Plus } from "lucide-react";
import { MenuCategory } from "@/app/(_service)/types/menu-types";
import { humanize } from "@/app/api/menu/persist/humanize";
import { PageList } from "./page-list";

interface PageSectionProps {
  activeCategory: MenuCategory | null;
  categories: MenuCategory[]; // ✅ Добавляем categories
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>; // ✅ Добавляем setCategories
  onAddPage: (category: MenuCategory) => void;
  onPageDragEnd: (activeId: string, overId: string) => void;
}

/**
 * Секция отображения и управления страницами выбранной категории
 */
export function PageSection({ 
  activeCategory, 
  categories,
  setCategories,
  onAddPage, 
  onPageDragEnd 
}: PageSectionProps) {
  return (
    <div className="flex-1 p-8 pb-12 flex flex-col custom-scrollbar">
      {activeCategory ? (
        <div className="relative flex-1 flex flex-col h-full min-h-0">
          {/* Заголовок с кнопкой добавления страницы */}
          <div
            className="sticky top-0 left-0 right-0 z-10 bg-black/90 backdrop-blur-sm pb-2 mb-2"
            style={{ paddingBottom: 12, marginBottom: 8 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400 text-base font-semibold tracking-wider border-b border-gray-700 pb-1">
                {humanize(activeCategory.title)}
              </h3>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="ml-2 border-green-500 border-2 rounded-full hover:bg-green-950/30 text-green-400 focus-visible:ring-green-400"
                onClick={() => onAddPage(activeCategory)}
                title="Add page"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Список страниц */}
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
            <PageList
              pages={activeCategory.pages}
              categoryTitle={activeCategory.title}
              categories={categories} // ✅ Передаем categories
              setCategories={setCategories} // ✅ Передаем setCategories
              onPageDragEnd={onPageDragEnd}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-600 italic">
          Select a category to view its pages
        </div>
      )}
    </div>
  );
}
