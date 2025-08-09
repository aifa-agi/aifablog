// @/app/(_service)/components/nav-bar/admin-flow/editable-wide-menu/page-section/publish-actions-dropdown/types.ts

import { MenuCategory } from "@/app/(_service)/types/menu-types";
import { PageData } from "@/app/(_service)/types/page-types";

export type PublishState = "inactive" | "pending" | "active";
export type PublishMode = "draft" | "published";

export interface PublishActionsDropdownProps {
  singlePage: PageData;
  categoryTitle: string;
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
}

export interface PublishTriggerButtonProps {
  publishState: PublishState;
  onClick?: () => void;
}

export interface PublishDropdownContentProps {
  currentMode: PublishMode;
  onModeChange: (mode: PublishMode) => void;
}

export interface PublishStatusIndicatorProps {
  mode: PublishMode;
  isActive: boolean;
}
