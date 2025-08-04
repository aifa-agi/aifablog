"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, GripVertical, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { MenuCategory, MenuLink } from "@/types/menu-types";
import { LinkActionsDropdown } from "./link-actions-dropdown";
import { CategoryActionsDropdown } from "./category-actions-dropdown";
import { useDialogs } from "@/app/contexts/dialogs-providers";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { PublishActionsDropdown } from "./publish-actions-dropdown";
import { VectorStoreActionsDropdown } from "./vector-store-actions-dropdown";
import { generateCuid } from "@/lib/generate-cuid";

const greenDotClass = "bg-emerald-500";

interface WideMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  categories: MenuCategory[];
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
  dirty: boolean;
  loading: boolean;
  onUpdate: () => void;
}

function DraggableCategoryCard({
  category,
  isActive,
  onClick,
  children,
}: {
  category: MenuCategory;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
    useSortable({ id: category.title });
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        transition,
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 20 : 1,
      }}
      {...attributes}
      {...listeners}
      onClick={onClick}
      aria-selected={isActive}
    >
      {children}
    </div>
  );
}

function DraggableMenuLink({
  link,
  categoryTitle,
  children,
}: {
  link: MenuLink;
  categoryTitle: string;
  children: React.ReactNode;
}) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
    useSortable({ id: link.id });
  return (
    <li
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        transition,
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 20 : 1,
      }}
      className="group flex items-center px-2 h-10 relative"
      {...attributes}
      {...listeners}
    >
      {children}
    </li>
  );
}

export default function EditableWideMenu({
  isOpen,
  setIsOpen,
  categories,
  setCategories,
  dirty,
  loading,
  onUpdate,
}: WideMenuProps) {
  const dialogs = useDialogs();
  const [activeCategoryTitle, setActiveCategoryTitle] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const activeCategory = useMemo(
    () => categories.find((cat) => cat.title === activeCategoryTitle) ?? null,
    [categories, activeCategoryTitle]
  );

  const handleCategoryDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = categories.findIndex((c) => c.title === active.id);
      const newIndex = categories.findIndex((c) => c.title === over?.id);
      setCategories((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleLinkDragEnd = (event: DragEndEvent) => {
    if (!activeCategory) return;
    const { active, over } = event;
    if (active.id !== over?.id) {
      setCategories((cats) =>
        cats.map((cat) =>
          cat.title !== activeCategory.title
            ? cat
            : {
                ...cat,
                links: arrayMove(
                  cat.links,
                  cat.links.findIndex((l) => l.id === active.id),
                  cat.links.findIndex((l) => l.id === over?.id)
                ),
              }
        )
      );
    }
  };

  const renderCategoryLinks = (links: MenuLink[], categoryTitle: string) => (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleLinkDragEnd}
    >
      <SortableContext
        items={links.map((link) => link.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="space-y-0 pr-1">
          {links.map((link) => (
            <DraggableMenuLink key={link.id} link={link} categoryTitle={categoryTitle}>
              <div className="flex-grow flex items-center gap-2 overflow-hidden">
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {link.name}
                </span>
                {link.hasBadge && link.badgeName && (
                  <Badge className="shadow-none rounded-full px-2.5 py-0.5 text-xs font-semibold h-6 flex items-center">
                    <div className={cn("h-1.5 w-1.5 rounded-full mr-2", greenDotClass)} />
                    {link.badgeName}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                <LinkActionsDropdown
                  link={link}
                  categoryTitle={categoryTitle}
                  setCategories={setCategories}
                />
                <PublishActionsDropdown linkId={link.id} />
                <VectorStoreActionsDropdown linkId={link.id} />
                <span
                  className="flex items-center justify-center w-8 h-8 cursor-grab rounded hover:bg-accent/60 ml-1"
                  tabIndex={-1}
                >
                  <GripVertical className="w-4 h-4 text-primary/80" />
                </span>
              </div>
              <div className="absolute left-0 bottom-0 w-full h-px bg-border opacity-50 pointer-events-none" />
            </DraggableMenuLink>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );

  const handleAddCategory = () => {
    dialogs.show({
      type: "create",
      title: "New category",
      description: "Enter a category name",
      value: "",
      confirmLabel: "Create",
      onConfirm: (value) => {
        if (!value) return;
        const maxOrder = categories.length
          ? Math.max(...categories.map((c) => c.order ?? 0))
          : 0;
        setCategories((prev) => [
          ...prev,
          {
            title: value,
            links: [],
            order: maxOrder + 1,
          },
        ]);
      },
    });
  };

  const handleAddLink = (category: MenuCategory) => {
    dialogs.show({
      type: "create",
      title: "New link",
      description: `Enter link name for "${category.title}"`,
      value: "",
      confirmLabel: "Create",
      onConfirm: (value) => {
        if (!value) return;
        setCategories((prev) =>
          prev.map((cat) =>
            cat.title === category.title
              ? {
                  ...cat,
                  links: [
                    ...cat.links,
                    {
                      id: generateCuid(),
                      name: value,
                      href: "#",
                      roles: ["guest"],
                      hasBadge: false,
                      isPublished: false,
                      order:
                        cat.links.length > 0
                          ? Math.max(...cat.links.map((l) => l.order ?? 0)) + 1
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-x-0 mx-auto bg-black text-white rounded-lg shadow-2xl overflow-hidden z-50"
      style={{ maxWidth: "80vw", top: "120px", height: "432px" }}
    >
      <div className="flex h-full">
        <div className="flex-1 p-8 pb-12 flex flex-col custom-scrollbar">
          {activeCategory ? (
            <div className="relative flex-1 flex flex-col h-full min-h-0">
              <div
                className="sticky top-0 left-0 right-0 z-10 bg-black/90 backdrop-blur-sm pb-2 mb-2"
                style={{ paddingBottom: 12, marginBottom: 8 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-400 text-base font-semibold tracking-wider border-b border-gray-700 pb-1">
                    {activeCategory.title}
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="ml-2 border-green-500 border-2 rounded-full hover:bg-green-950/30 text-green-400 focus-visible:ring-green-400"
                    onClick={() => handleAddLink(activeCategory)}
                    title="Add link"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
                {renderCategoryLinks(activeCategory.links, activeCategory.title)}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-600 italic">
              Select a category to view its links
            </div>
          )}
        </div>
        <div className="w-80 bg-gray-900 p-8 flex flex-col">
          <h3 className="text-gray-400 text-sm font-semibold mb-2 tracking-wider">
            CATEGORIES
          </h3>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleCategoryDragEnd}
          >
            <SortableContext
              items={categories.map((cat) => cat.title)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex-1 overflow-y-auto space-y-2 px-2 pt-2 custom-scrollbar">
                {categories.map((category) => (
                  <DraggableCategoryCard
                    key={category.title}
                    category={category}
                    isActive={activeCategoryTitle === category.title}
                    onClick={() =>
                      setActiveCategoryTitle(
                        activeCategoryTitle === category.title
                          ? null
                          : category.title
                      )
                    }
                  >
                    <Card
                      className={cn(
                        "bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer h-[60px]",
                        activeCategoryTitle === category.title ? "ring-2 ring-white" : ""
                      )}
                    >
                      <CardContent className="flex items-center justify-between p-0 h-full">
                        <h4 className="text-white font-semibold text-base line-clamp-1 whitespace-nowrap overflow-hidden">
                          {category.title}
                        </h4>
                        <div className="flex items-center gap-1 ml-3">
                          <CategoryActionsDropdown
                            categoryTitle={category.title}
                            setCategories={setCategories}
                          />
                          <span
                            className="flex items-center justify-center w-8 h-8 cursor-grab rounded hover:bg-accent/60"
                            tabIndex={-1}
                          >
                            <GripVertical className="w-4 h-4 text-primary/80" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </DraggableCategoryCard>
                ))}
                <div className="p-1 mt-1">
                  <Card
                    className={cn(
                      "bg-black border-2 border-green-500 p-4 rounded-lg cursor-pointer flex items-center justify-center h-[60px] min-h-[60px] hover:bg-green-950/40 transition"
                    )}
                    onClick={handleAddCategory}
                    tabIndex={0}
                    style={{ borderStyle: "dashed" }}
                  >
                    <CardContent className="flex items-center justify-center p-0 h-full w-full">
                      <span className="text-green-400 font-semibold text-base">
                        Add category
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </SortableContext>
          </DndContext>
          <Button
            type="button"
            className="w-full mt-4"
            onClick={onUpdate}
            variant={loading ? "default" : dirty ? "default" : "secondary"}
            disabled={!dirty || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : dirty ? (
              <>Update changes</>
            ) : (
              <>No changes</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
