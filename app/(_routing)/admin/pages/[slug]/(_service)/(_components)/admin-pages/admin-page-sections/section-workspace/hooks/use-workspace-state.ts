

// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/section-workspace/hooks/use-workspace-state.ts

"use client";

import { useState, useCallback } from "react";
import { WorkspaceState, SectionSelectionState } from "../types";

export const useWorkspaceState = () => {
  // Initialize initial selection state
  const initialSelection: SectionSelectionState = {
    selectedSections: new Set<string>(),
    isContiguous: false,
    selectionRange: null
  };

  const openGallery = useCallback(() => {
    setWorkspaceState(prev => ({
      ...prev,
      isGalleryOpen: true,
      layoutMode: 'split'
    }));
  }, []);

  const [workspaceState, setWorkspaceState] = useState<WorkspaceState>({
    isGalleryOpen: false,
    layoutMode: 'full',
    selection: initialSelection,      // Added missing field
    isDirty: false                    // Added missing field
  });

  const toggleGallery = useCallback(() => {
    setWorkspaceState(prev => ({
      ...prev,
      isGalleryOpen: !prev.isGalleryOpen,
      layoutMode: !prev.isGalleryOpen ? 'split' : 'full'
    }));
  }, []);

  const closeGallery = useCallback(() => {
    setWorkspaceState(prev => ({
      ...prev,
      isGalleryOpen: false,
      layoutMode: 'full'
    }));
  }, []);

  // New methods for working with section selection
  const updateSelection = useCallback((sectionId: string, isSelected: boolean) => {
    setWorkspaceState(prev => {
      const newSelectedSections = new Set(prev.selection.selectedSections);
      
      if (isSelected) {
        newSelectedSections.add(sectionId);
      } else {
        newSelectedSections.delete(sectionId);
      }

      // Check if selection is contiguous (for future functionality)
      const isContiguous = newSelectedSections.size <= 1; // Simplified logic for now

      return {
        ...prev,
        selection: {
          selectedSections: newSelectedSections,
          isContiguous,
          selectionRange: newSelectedSections.size > 0 ? { min: 1, max: newSelectedSections.size } : null
        }
      };
    });
  }, []);

  const clearSelection = useCallback(() => {
    setWorkspaceState(prev => ({
      ...prev,
      selection: {
        selectedSections: new Set(),
        isContiguous: false,
        selectionRange: null
      }
    }));
  }, []);

  const markDirty = useCallback(() => {
    setWorkspaceState(prev => ({
      ...prev,
      isDirty: true
    }));
  }, []);

  const markClean = useCallback(() => {
    setWorkspaceState(prev => ({
      ...prev,
      isDirty: false
    }));
  }, []);

  // Computed properties for convenience
  const hasSelectedSections = workspaceState.selection.selectedSections.size > 0;
  const selectedSectionsCount = workspaceState.selection.selectedSections.size;

  return {
    workspaceState,
    isGalleryOpen: workspaceState.isGalleryOpen,
    layoutMode: workspaceState.layoutMode,
    selection: workspaceState.selection,
    isDirty: workspaceState.isDirty,
    hasSelectedSections,
    selectedSectionsCount,
   
    // Gallery management methods
    toggleGallery,
    closeGallery,
    openGallery, // ✅ Добавляем новый метод
   
    // Selection management methods
    updateSelection,
    clearSelection,
   
    // Change state management methods
    markDirty,
    markClean,
  };
};

