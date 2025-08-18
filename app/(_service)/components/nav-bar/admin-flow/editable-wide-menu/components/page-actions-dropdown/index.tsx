//
// @/app/(_service)/components/nav-bar/admin-flow/page-actions-dropdown/index.tsx
// Comments: No changes needed; menu items are added inside PageActionsMenu / HomeActionsMenu.

"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/(_service)/components/ui/dropdown-menu";
import { Button } from "@/app/(_service)/components/ui/button";
import { FileCode2 } from "lucide-react";
import { cn } from "@/app/(_service)/lib/utils";

import { PageActionsDropdownProps } from "./types";
import { usePageData } from "./hooks/use-page-data";
import { usePageActions } from "./hooks/use-page-actions";
import { useIconStatus } from "./hooks/use-icon-status";
import { useNavigationMenu } from "@/app/(_service)/contexts/nav-bar-provider";
import { PageActionsMenu } from "./components/page-actions-menu";
import { PageTypeMenu } from "./components/page-type-menu";
import { HomeActionsMenu } from "./components/home-actions-menu";

export function PageActionsDropdown({
  singlePage,
  categoryTitle,
  categories,
  setCategories,
}: PageActionsDropdownProps) {

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

  const { dirty: hasUnsavedChanges } = useNavigationMenu();

  const { currentPageData, dataStatus, getCurrentPageData } = usePageData({
    singlePage,
    categoryTitle,
    categories,
  });

  const pageActions = usePageActions({
    singlePage,
    categoryTitle,
    categories,
    setCategories,
    getCurrentPageData,
  });

  const { iconStatus } = useIconStatus({
    currentPageData,
    dataStatus,
  });

  const getIconColorClass = () => {
    switch (iconStatus) {
      case "complete":
        return "text-green-600 hover:text-green-700";
      case "partial":
        return "text-orange-500 hover:text-orange-600";
      case "default":
      default:
        return "text-primary hover:text-primary/80";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center justify-center w-8 h-8 rounded transition hover:bg-accent/60"
          tabIndex={-1}
        >
          <FileCode2
            className={cn(
              "w-4 h-4 transition-colors",
              getIconColorClass()
            )}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[190px]">
        {categoryTitle !== "home" ? (
          <PageActionsMenu
            {...dataStatus}
            {...pageActions}
            currentPageData={currentPageData}
            hasUnsavedChanges={hasUnsavedChanges}
          />
        ) : (
          <HomeActionsMenu
            {...dataStatus}
            {...pageActions}
            currentPageData={currentPageData}
            hasUnsavedChanges={hasUnsavedChanges}
          />
        )}
        {categoryTitle !== "home" && (
          <PageTypeMenu
            onSetPageType={pageActions.handleSetPageType}
            isPageTypeActive={pageActions.isPageTypeActive}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type { PageActionsDropdownProps } from "./types";
