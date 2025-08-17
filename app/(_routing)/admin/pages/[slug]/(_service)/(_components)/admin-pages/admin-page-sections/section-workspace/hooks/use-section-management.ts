

// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/section-workspace/hooks/use-section-management.ts

"use client";

import { useState, useMemo, useCallback } from "react";
import { ExtendedSection } from "@/app/(_service)/types/section-types";
import { WorkflowSection, SectionSelectionState } from "../types";
import { transformToWorkflowSections } from "../utils";

export interface UseSectionManagementReturn {
  workflowSections: WorkflowSection[];
  selection: SectionSelectionState;
  hasSelectedSections: boolean;
  selectedCount: number;
  canGroup: boolean;
  updateSelection: (sectionId: string, isSelected: boolean) => void;
  clearSelection: () => void;
  selectAll: (sectionIds: string[]) => void;
  reorderSections: (newSections: WorkflowSection[]) => void;
  createGroup: (sectionIds: string[]) => void;
  ungroupSections: (groupId: string) => void;
  getExtendedSections: () => ExtendedSection[];
}

export const useSectionManagement = (sections: ExtendedSection[]): UseSectionManagementReturn => {
  // Transform ExtendedSection to WorkflowSection
  const workflowSections = useMemo(() => {
    return transformToWorkflowSections(sections);
  }, [sections]);

  // Selection state
  const [selection, setSelection] = useState<SectionSelectionState>({
    selectedSections: new Set<string>(),
    isContiguous: false,
    selectionRange: null
  });

  // Internal sections state for reordering
  const [internalSections, setInternalSections] = useState<WorkflowSection[]>(workflowSections);

  // Update internal sections when props change
  useState(() => {
    setInternalSections(workflowSections);
  });

  // Computed values
  const hasSelectedSections = selection.selectedSections.size > 0;
  const selectedCount = selection.selectedSections.size;
  const canGroup = selectedCount >= 2;

  // Update selection
  const updateSelection = useCallback((sectionId: string, isSelected: boolean) => {
    setSelection(prev => {
      const newSelectedSections = new Set(prev.selectedSections);
      
      if (isSelected) {
        newSelectedSections.add(sectionId);
      } else {
        newSelectedSections.delete(sectionId);
      }

      // Simple contiguity check (could be more sophisticated)
      const isContiguous = newSelectedSections.size <= 1;

      return {
        selectedSections: newSelectedSections,
        isContiguous,
        selectionRange: newSelectedSections.size > 0 
          ? { min: 1, max: newSelectedSections.size } 
          : null
      };
    });
  }, []);

  // Clear selection
  const clearSelection = useCallback(() => {
    setSelection({
      selectedSections: new Set(),
      isContiguous: false,
      selectionRange: null
    });
  }, []);

  // Select all
  const selectAll = useCallback((sectionIds: string[]) => {
    setSelection({
      selectedSections: new Set(sectionIds),
      isContiguous: true,
      selectionRange: { min: 1, max: sectionIds.length }
    });
  }, []);

  // Reorder sections
  const reorderSections = useCallback((newSections: WorkflowSection[]) => {
    setInternalSections(newSections);
  }, []);

  // Create group (mock implementation)
  const createGroup = useCallback((sectionIds: string[]) => {
    console.log("Creating group with sections:", sectionIds);
    // TODO: Implement actual grouping logic
    clearSelection();
  }, [clearSelection]);

  // Ungroup sections (mock implementation)
  const ungroupSections = useCallback((groupId: string) => {
    console.log("Ungrouping sections in group:", groupId);
    // TODO: Implement actual ungrouping logic
  }, []);

  // Get extended sections
  const getExtendedSections = useCallback((): ExtendedSection[] => {
    return internalSections.map(ws => ws.extendedSection);
  }, [internalSections]);

  return {
    workflowSections: internalSections,
    selection,
    hasSelectedSections,
    selectedCount,
    canGroup,
    updateSelection,
    clearSelection,
    selectAll,
    reorderSections,
    createGroup,
    ungroupSections,
    getExtendedSections
  };
};
