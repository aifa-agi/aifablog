// @/app/(_service)/components/nav-bar/admin-flow/page-actions-dropdown/types.ts

import { MenuCategory } from "@/app/(_service)/types/menu-types";
import { PageData, PageType } from "@/app/(_service)/types/page-types";

export interface PageActionsDropdownProps {
  singlePage: PageData;
  categoryTitle: string;
  categories?: MenuCategory[];
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
}

export interface PageDataStatus {
  hasTitleData: boolean;
  hasDescriptionData: boolean;
  hasKeywordsData: boolean;
  hasImagesData: boolean;
}

export interface PageActionsHook {
  handleAddTitle: () => void;
  handleAddDescription: () => void;
  handleAddKeywords: () => void;
  handleAddImages: () => void;
  handleAddPageCode: () => void;
  handleSetPageType: (type: PageType) => void;
  isPageTypeActive: (type: PageType) => boolean;
}

export type IconStatus = "default" | "partial" | "complete";