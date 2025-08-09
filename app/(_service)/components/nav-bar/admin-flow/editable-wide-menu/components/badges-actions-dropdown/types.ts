// @/app/(_service)/components/nav-bar/admin-flow/editable-wide-menu/page-section/badges-actions-dropdown/types.ts

import { MenuCategory } from "@/app/(_service)/types/menu-types";
import { PageData } from "@/app/(_service)/types/page-types";
import { UserRole } from "@/app/config/user-roles";
import { BadgeName } from "@/app/config/badge-config";

/**
 * Props for main badges actions dropdown component
 */
export interface BadgesActionsDropdownProps {
  singlePage: PageData;
  categoryTitle: string;
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
}

/**
 * Props for badges trigger button
 */
export interface BadgesTriggerButtonProps {
  // No special state needed - always active for admin functions
}

/**
 * Props for badges dropdown content
 */
export interface BadgesDropdownContentProps {
  singlePage: PageData;
  categoryTitle: string;
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
}

/**
 * Props for badges status indicator
 */
export interface BadgesStatusIndicatorProps {
  isActive: boolean;
}

/**
 * Props for role item row
 */
export interface RoleItemRowProps {
  role: UserRole;
  isActive: boolean;
  onToggle: () => void;
}

/**
 * Props for badge item row
 */
export interface BadgeItemRowProps {
  badge: BadgeName;
  isActive: boolean;
  onToggle: () => void;
}
