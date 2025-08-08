// @/app/(_service)/components/nav-bar/admin-flow/page-actions-dropdown.tsx

"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/(_service)/components/ui/dropdown-menu";
import { FileCode2 } from "lucide-react";
import { MenuCategory } from "@/app/(_service)/types/menu-types";
import { Button } from "@/app/(_service)/components/ui/button";
import { PageData, PageType } from "@/app/(_service)/types/page-types";
import { cn } from "@/app/(_service)/lib/utils";
import { useDialogs } from "@/app/(_service)/contexts/dialogs";

const PAGE_TYPES: { label: string; value: PageType }[] = [
  { label: "Blog", value: "blog" },
  { label: "Home Page", value: "homePage" },
  { label: "Base Page", value: "basePage" },
  { label: "Footer Page", value: "footerPage" },
  { label: "Document", value: "document" },
  { label: "Guide", value: "guide" },
  { label: "Shop Item", value: "shopItem" },
] as const;

interface PageActionsDropdownProps {
  singlePage: PageData;
  categoryTitle: string;
  categories?: MenuCategory[];
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
}

export function PageActionsDropdown({
  singlePage,
  categoryTitle,
  categories,
  setCategories,
}: PageActionsDropdownProps) {
  const dialogs = useDialogs();

  const getCurrentPageData = (): PageData => {
    if (!categoryTitle || !categories || categories.length === 0) {
      return singlePage;
    }

    try {
      const currentCategory = categories.find(
        (cat) => cat.title === categoryTitle
      );

      if (!currentCategory) {
        return singlePage;
      }

      const currentPage = currentCategory.pages.find(
        (page) => page.id === singlePage.id
      );

      return currentPage || singlePage;
    } catch (error) {
      return singlePage;
    }
  };

  const updatePageInCategories = (
    pageId: string,
    updates: Partial<PageData>
  ) => {
    if (!categoryTitle) {
      return;
    }

    setCategories((prev) => {
      if (!Array.isArray(prev)) {
        return prev;
      }

      return prev.map((cat) =>
        cat.title !== categoryTitle
          ? cat
          : {
              ...cat,
              pages: cat.pages.map((page) =>
                page.id !== pageId
                  ? page
                  : {
                      ...page,
                      ...updates,
                    }
              ),
            }
      );
    });
  };

  const handleSetPageType = (type: PageType) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.title !== categoryTitle
          ? cat
          : {
              ...cat,
              pages: cat.pages.map((page) =>
                page.id !== singlePage.id
                  ? page
                  : {
                      ...page,
                      type: type,
                    }
              ),
            }
      )
    );
  };

  const isPageTypeActive = (type: PageType) => {
    const currentPage = getCurrentPageData();
    return currentPage.type === type;
  };

  const handleAddTitle = () => {
    if (!categoryTitle) {
      return;
    }

    const currentPage = getCurrentPageData();

    dialogs.show({
      type: currentPage.title ? "edit" : "create",
      title: currentPage.title ? "Edit Page Title" : "Add Page Title",
      description: currentPage.title
        ? `Current title: "${currentPage.title}"`
        : "Enter a title for this page",
      value: currentPage.title || "",
      placeholder: "Enter page title...",
      confirmLabel: currentPage.title ? "Update Title" : "Add Title",
      onConfirm: (value) => {
        if (!value?.trim()) return;

        updatePageInCategories(singlePage.id, {
          title: value.trim(),
        });
      },
    });
  };

  const handleAddDescription = () => {
    if (!categoryTitle) {
      return;
    }

    const currentPage = getCurrentPageData();

    dialogs.show({
      type: currentPage.description ? "edit" : "create",
      inputType: "textarea",
      title: currentPage.description
        ? "Edit Page Description"
        : "Add Page Description",
      description: currentPage.description
        ? "Update the page description"
        : "Enter a description for this page",
      value: currentPage.description || "",
      placeholder: "Enter page description...",
      confirmLabel: currentPage.description
        ? "Update Description"
        : "Add Description",
      onConfirm: (value) => {
        if (!value?.trim()) return;

        updatePageInCategories(singlePage.id, {
          description: value.trim(),
        });
      },
    });
  };

  const handleAddKeywords = () => {
    if (!categoryTitle) {
      return;
    }

    const currentPage = getCurrentPageData();

    dialogs.show({
      type: currentPage.keyWords?.length ? "edit" : "create",
      inputType: "keywords",
      title: currentPage.keyWords?.length ? "Edit Keywords" : "Add Keywords",
      description: currentPage.keyWords?.length
        ? `Current keywords: ${currentPage.keyWords.length} keyword${
            currentPage.keyWords.length > 1 ? "s" : ""
          }`
        : "Enter keywords for this page to improve SEO",
      keywords: currentPage.keyWords?.length ? [...currentPage.keyWords] : [""],
      confirmLabel: currentPage.keyWords?.length
        ? "Update Keywords"
        : "Add Keywords",
      onConfirm: (_, keywords) => {
        if (!keywords || keywords.length === 0) {
          updatePageInCategories(singlePage.id, {
            keyWords: [],
          });
          return;
        }

        updatePageInCategories(singlePage.id, {
          keyWords: keywords,
        });
      },
    });
  };

  const handleAddImages = () => {
    if (!categoryTitle) {
      return;
    }

    const currentPage = getCurrentPageData();

    dialogs.show({
      type: currentPage.images?.length ? "edit" : "create",
      inputType: "images",
      title: currentPage.images?.length ? "Edit Images" : "Add Images",
      description: currentPage.images?.length
        ? `Current images: ${currentPage.images.length} image${
            currentPage.images.length > 1 ? "s" : ""
          }`
        : "Add images with alt descriptions and links for better SEO and user experience",
      images: currentPage.images?.length ? [...currentPage.images] : undefined,
      confirmLabel: currentPage.images?.length ? "Update Images" : "Add Images",
      onConfirm: (_, __, images) => {
        if (!images || images.length === 0) {
          updatePageInCategories(singlePage.id, {
            images: [],
          });
          return;
        }

        updatePageInCategories(singlePage.id, {
          images: images,
        });
      },
    });
  };

  const handleAddPageCode = () => {
    console.log("Add page code for:", singlePage.id);
  };

  const StatusIndicator = ({ isActive }: { isActive: boolean }) => (
    <span
      className={cn(
        "inline-block mr-3 align-middle rounded-full border border-black/20",
        isActive ? "bg-green-500" : "bg-gray-400"
      )}
      style={{ width: 8, height: 8, minWidth: 8, minHeight: 8 }}
    />
  );

  const currentPageData = getCurrentPageData();
  const hasTitleData = Boolean(currentPageData.title?.trim());
  const hasDescriptionData = Boolean(currentPageData.description?.trim());
  const hasKeywordsData = Boolean(currentPageData.keyWords?.length);
  const hasImagesData = Boolean(currentPageData.images?.length);

  if (!categoryTitle || !categories) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 rounded">
        <h3 className="font-bold text-red-800">Configuration Error</h3>
        <p className="text-red-700">
          Missing required props:
          {!categoryTitle && " categoryTitle"}
          {!categories && " categories"}
        </p>
        <p className="text-sm text-red-600 mt-2">
          Check parent component prop passing
        </p>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center justify-center w-8 h-8 rounded transition hover:bg-accent/60"
          tabIndex={-1}
        >
          <FileCode2 className="w-4 h-4 text-primary/80" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[190px]">
        <DropdownMenuItem
          onClick={handleAddTitle}
          className="flex items-center"
        >
          <StatusIndicator isActive={hasTitleData} />
          <span>{hasTitleData ? "Edit Title" : "Add Title"}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleAddDescription}
          className="flex items-center"
        >
          <StatusIndicator isActive={hasDescriptionData} />
          <span>
            {hasDescriptionData ? "Edit Description" : "Add Description"}
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleAddImages}
          className="flex items-center"
        >
          <StatusIndicator isActive={hasImagesData} />
          <span>{hasImagesData ? "Edit Images" : "Add Images"}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleAddKeywords}
          className="flex items-center"
        >
          <StatusIndicator isActive={hasKeywordsData} />
          <span>{hasKeywordsData ? "Edit Keywords" : "Add Keywords"}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleAddPageCode}>
          Page Body
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Page Type</DropdownMenuLabel>
        <div className="max-h-[100px] overflow-y-auto custom-scrollbar">
          <DropdownMenuGroup>
            {PAGE_TYPES.map((pageType) => (
              <DropdownMenuItem
                key={pageType.value}
                onClick={() => handleSetPageType(pageType.value)}
                className="cursor-pointer select-none"
              >
                <span
                  className={cn(
                    "inline-block mr-3 align-middle rounded-full border border-black/30",
                    isPageTypeActive(pageType.value)
                      ? "bg-green-500"
                      : "bg-muted-foreground"
                  )}
                  style={{ width: 12, height: 12, minWidth: 12, minHeight: 12 }}
                />
                <span>{pageType.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </div>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
