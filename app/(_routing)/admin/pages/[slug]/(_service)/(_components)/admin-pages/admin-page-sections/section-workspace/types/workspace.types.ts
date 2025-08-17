
// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/section-workspace/types/workspace.types.ts

import { ExtendedSection } from "@/app/(_service)/types/section-types";
import { PageType } from "@/app/(_service)/types/page-types";

// Определяем тип секции для workflow
export type ExtendedSectionType =
  | "Step Section"
  | "Section"
  | "Simple"
  | "Typography"
  | "Empty Step Section"
  | "Invalid Section";

// Основной интерфейс WorkflowSection с композицией (НЕ наследование!)
export interface WorkflowSection {
  // Основные поля для workflow
  id: string; // ID секции
  designId: string; // 4-character identifier (h1, C999, etc.)
  sectionType: ExtendedSectionType; // Тип секции из union
  isGrouped: boolean; // Flag indicating group membership

  // Опциональные поля для группировки
  groupId?: string; // Present only when section is part of group
  groupOrder?: number; // Order within group (for multi-section groups)
  originalOrder?: number; // Original order for rollback
  isDirty?: boolean; // Has unsaved changes

  // Композиция: храним оригинальную секцию
  extendedSection: ExtendedSection; // Original section data
}

// Состояние выделения секций
export interface SectionSelectionState {
  selectedSections: Set<string>; // Set of selected section IDs
  isContiguous: boolean; // Whether selection is contiguous
  selectionRange: {
    // Range of selected orders
    min: number;
    max: number;
  } | null;
}

// Обновленное состояние workspace
export interface WorkspaceState {
  isGalleryOpen: boolean;
  layoutMode: "full" | "split";
  selection: SectionSelectionState; // Добавляем состояние выделения
  isDirty: boolean; // Есть несохраненные изменения
}

export interface WorkspaceProps {
  sections: ExtendedSection[];
  pageType: PageType;
  onSectionReorder?: (sections: ExtendedSection[]) => void;
}



export interface WorkspaceLayoutProps {
  isGalleryOpen: boolean;
  children: React.ReactNode;
  galleryContent: React.ReactNode;
}

// Новые типы для интеграции с дизайн-галереей
export interface SelectedSectionsInfo {
  sectionIds: string[];
  designIds: string[];
  sectionTypes: ExtendedSectionType;
  count: number;
  isValid: boolean; // Contiguous selection
}

export interface WorkspaceHeaderProps {
  pageType: PageType;
  sectionsCount: number;
  isGalleryOpen: boolean;
  onGalleryToggle: () => void;

  selectedCount?: number;
  hasSelectedSections?: boolean;
}
