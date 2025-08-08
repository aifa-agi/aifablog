"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/app/(_service)/components/ui/card";
import { Badge } from "@/app/(_service)/components/ui/badge";
import { Button } from "@/app/(_service)/components/ui/button";
import { Loader2, GripVertical, Plus, RotateCcw } from "lucide-react";
import { cn } from "@/app/(_service)/lib/utils";
import { MenuCategory } from "@/app/(_service)/types/menu-types";
import { BadgeActionsDropdown } from "./badge-actions-dropdown";
import { CategoryActionsDropdown } from "./category-actions-dropdown";
import { toast } from "sonner";
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
import { generateCuid } from "@/app/(_service)/lib/generate-cuid";
import { ChatSynchroniseActionDropdown } from "./chat-synchronise-action-dropdown";
import { normalizeText } from "@/app/(_service)/lib/normalize-text";
import { humanize } from "@/app/api/menu/persist/humanize";
import { PageActionsDropdown } from "./page-actions-dropdown";
import { PageData, PageType } from "@/app/(_service)/types/page-types";
import { LinkActionsDropdown } from "./link-action-dropdown";
import { useDialogs } from "@/app/(_service)/contexts/dialogs";

const greenDotClass = "bg-emerald-500";

interface WideMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  categories: MenuCategory[];
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
  dirty: boolean;
  loading: boolean;
  onUpdate: () => Promise<void>;
  onRetry?: () => Promise<void>;
  canRetry?: boolean;
  retryCount?: number;
  lastError?: {
    status: string;
    message: string;
    canRetry: boolean;
  } | null;
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
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.title });

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
  singlePage,
  categoryTitle,
  children,
}: {
  singlePage: PageData;
  categoryTitle: string;
  children: React.ReactNode;
}) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: singlePage.id });

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
  onRetry,
  canRetry = false,
  retryCount = 0,
  lastError,
}: WideMenuProps) {
  const dialogs = useDialogs();
  const [activeCategoryTitle, setActiveCategoryTitle] = useState<string | null>(
    null
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

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
                pages: arrayMove(
                  cat.pages,
                  cat.pages.findIndex((l) => l.id === active.id),
                  cat.pages.findIndex((l) => l.id === over?.id)
                ),
              }
        )
      );
    }
  };

  const renderCategoryLinks = (pages: PageData[], categoryTitle: string) => (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleLinkDragEnd}
    >
      <SortableContext
        items={pages.map((singlePage) => singlePage.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="space-y-0 pr-1">
          {pages.map((singlePage) => (
            <DraggableMenuLink
              key={singlePage.id}
              singlePage={singlePage}
              categoryTitle={categoryTitle}
            >
              <div className="flex-grow flex items-center gap-2 overflow-hidden">
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {humanize(singlePage.linkName)}
                </span>
                {singlePage.hasBadge && singlePage.badgeName && (
                  <Badge className="shadow-none rounded-full px-2.5 py-0.5 text-xs font-semibold h-6 flex items-center">
                    <div
                      className={cn(
                        "h-1.5 w-1.5 rounded-full mr-2",
                        greenDotClass
                      )}
                    />
                    {singlePage.badgeName}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                <BadgeActionsDropdown
                  singlePage={singlePage}
                  categoryTitle={categoryTitle}
                  setCategories={setCategories}
                />
                <PublishActionsDropdown
                  singlePage={singlePage}
                  categoryTitle={categoryTitle}
                  setCategories={setCategories}
                />
                <VectorStoreActionsDropdown
                  singlePage={singlePage}
                  categoryTitle={categoryTitle}
                  setCategories={setCategories}
                />
                <ChatSynchroniseActionDropdown
                  singlePage={singlePage}
                  categoryTitle={categoryTitle}
                  setCategories={setCategories}
                />
                <LinkActionsDropdown
                  singlePage={singlePage}
                  categoryTitle={categoryTitle}
                  setCategories={setCategories}
                />
                <PageActionsDropdown
                  singlePage={singlePage}
                  categoryTitle={categoryTitle} // Добавить эту строку
                  categories={categories} // Добавить эту строку
                  setCategories={setCategories}
                />
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
        const normalizedValue = normalizeText(value as string);
        if (!normalizedValue) {
          toast.error("Category name cannot be empty");
          return;
        }
        const exists = categories.some(
          (cat) =>
            normalizeText(cat.title).toLowerCase() ===
            normalizedValue.toLowerCase()
        );
        if (exists) {
          toast.error("Category with this name already exists");
          return;
        }
        const maxOrder = categories.length
          ? Math.max(...categories.map((c) => c.order ?? 0))
          : 0;
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
      title: "New singlePage",
      description: `Enter singlePage name for "${category.title}"`,
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
                      order:
                        cat.pages.length > 0
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
                    {humanize(activeCategory.title)}
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="ml-2 border-green-500 border-2 rounded-full hover:bg-green-950/30 text-green-400 focus-visible:ring-green-400"
                    onClick={() => handleAddPage(activeCategory)}
                    title="Add singlePage"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
                {renderCategoryLinks(
                  activeCategory.pages,
                  activeCategory.title
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-600 italic">
              Select a category to view its pages
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
                        activeCategoryTitle === category.title
                          ? "ring-2 ring-white"
                          : ""
                      )}
                    >
                      <CardContent className="flex items-center justify-between p-0 h-full">
                        <h4 className="text-white font-semibold text-base line-clamp-1 whitespace-nowrap overflow-hidden">
                          {humanize(category.title)}
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
          <div className="flex flex-col gap-2 mt-4">
            {/* Main update button */}
            <Button
              type="button"
              className="w-full"
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

            {/* Retry button - shown only when retry is possible */}
            {canRetry && lastError && !loading && onRetry && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={onRetry}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Retry Update {retryCount > 0 && `(Attempt ${retryCount + 1})`}
              </Button>
            )}

            {/* Error information display */}
            {lastError && !loading && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 text-sm font-medium">
                  {lastError.message}
                </p>
                {lastError.canRetry && (
                  <p className="text-red-600 text-xs mt-1">
                    This error can be retried. Click the retry button above.
                  </p>
                )}
              </div>
            )}

            {/* Status information */}
            <div className="text-xs text-gray-500 text-center">
              {dirty && "• You have unsaved changes"}
              {!dirty && "• All changes saved"}
              {retryCount > 0 && ` • ${retryCount} retry attempts`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
