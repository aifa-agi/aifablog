// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/section-workspace/hooks/use-workspace-state.ts

"use client";

import { useState, useCallback } from "react";
import { WorkspaceState, SectionSelectionState } from "../types";

export const useWorkspaceState = () => {
  const initialSelection: SectionSelectionState = {
    selectedSections: new Set<string>(),
    isContiguous: false,
    selectionRange: null
  };

  const [workspaceState, setWorkspaceState] = useState<WorkspaceState>({
    isGalleryOpen: false,
    layoutMode: 'full',
    selection: initialSelection,
    isDirty: false
  });

  const toggleGallery = useCallback(() => {
    setWorkspaceState(prev => {
      const newIsGalleryOpen = !prev.isGalleryOpen;
      const newLayoutMode: 'full' | 'split' = newIsGalleryOpen ? 'split' : 'full';

      console.log('toggleGallery:', prev.isGalleryOpen, '->', newIsGalleryOpen);
      
      return {
        ...prev,
        isGalleryOpen: newIsGalleryOpen,
        layoutMode: newLayoutMode
      };
    });
  }, []);

  const openGallery = useCallback(() => {
    setWorkspaceState(prev => {
      if (!prev.isGalleryOpen) {
        console.log('openGallery: opening gallery');
        return {
          ...prev,
          isGalleryOpen: true,
          layoutMode: 'split' as const
        };
      }
      return prev;
    });
  }, []);

  const closeGallery = useCallback(() => {
    setWorkspaceState(prev => {
      if (prev.isGalleryOpen) {
        console.log('closeGallery: closing gallery');
        return {
          ...prev,
          isGalleryOpen: false,
          layoutMode: 'full' as const
        };
      }
      return prev;
    });
  }, []);

  // Остальные методы остаются без изменений...
  const updateSelection = useCallback((sectionId: string, isSelected: boolean) => {
    setWorkspaceState(prev => {
      const newSelectedSections = new Set(prev.selection.selectedSections);
      
      if (isSelected) {
        newSelectedSections.add(sectionId);
      } else {
        newSelectedSections.delete(sectionId);
      }

      const isContiguous = newSelectedSections.size <= 1;

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
    openGallery,
    
    // Selection management methods
    updateSelection,
    clearSelection,
    
    // Change state management methods
    markDirty,
    markClean,
  };
};
