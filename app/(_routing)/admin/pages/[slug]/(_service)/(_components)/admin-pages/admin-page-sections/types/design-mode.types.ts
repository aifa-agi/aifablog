
// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/utils/page-helpers.ts
export interface DesignModeState {
  isActive: boolean;
  selectedSections: string[];
}

export interface UseDesignModeReturn {
  designMode: DesignModeState;
  isDesignModeActive: boolean;
  selectedSections: string[];
  hasSelectedSections: boolean;
  selectedSectionsCount: number;
  handleDesignModeToggle: () => void;
  selectSection: (sectionId: string) => void;
  selectAllSections: (sectionIds: string[]) => void;
  clearSelection: () => void;
  resetDesignMode: () => void;
}