"use client";

import React from "react";
import { PageData } from "@/app/(_service)/types/page-types";
import { MenuCategory } from "@/app/(_service)/types/menu-types";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { PageListItem } from "./page-list-item";

interface PageListProps {
  pages: PageData[];
  categoryTitle: string;
  categories: MenuCategory[]; // ✅ Добавляем недостающий проп
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>; // ✅ Добавляем недостающий проп
  onPageDragEnd: (activeId: string, overId: string) => void;
}

/**
 * Компонент списка страниц с поддержкой drag & drop
 * Отображает все страницы в выбранной категории
 */
export function PageList({ 
  pages, 
  categoryTitle, 
  categories, 
  setCategories, 
  onPageDragEnd 
}: PageListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id && over?.id) {
      onPageDragEnd(active.id as string, over.id as string);
    }
  };

  // Если нет страниц, показываем placeholder
  if (!pages.length) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-500 italic">
        <p>No pages in this category</p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={pages.map((page) => page.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="space-y-0 pr-1">
          {pages.map((page) => (
            <PageListItem
              key={page.id}
              page={page}
              categoryTitle={categoryTitle}
              categories={categories}
              setCategories={setCategories} 
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
