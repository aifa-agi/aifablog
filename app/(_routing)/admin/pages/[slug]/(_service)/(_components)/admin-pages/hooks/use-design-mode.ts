
// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/hooks/use-design-mode.ts

"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { DesignModeState, UseDesignModeReturn } from "../types/design-mode.types";

export const useDesignMode = (): UseDesignModeReturn => {
  const [designMode, setDesignMode] = useState<DesignModeState>({
    isActive: false,
    selectedSections: []
  });

  const handleDesignModeToggle = useCallback(() => {
    setDesignMode(prev => {
      const newState = {
        ...prev,
        isActive: !prev.isActive,
        selectedSections: !prev.isActive ? prev.selectedSections : [] // Clear selections when deactivating
      };

      if (newState.isActive) {
        toast.info("Design mode activated - Section gallery will appear here");
      } else {
        toast.info("Design mode deactivated");
      }

      return newState;
    });
  }, []);

  const selectSection = useCallback((sectionId: string) => {
    setDesignMode(prev => ({
      ...prev,
      selectedSections: prev.selectedSections.includes(sectionId)
        ? prev.selectedSections.filter(id => id !== sectionId)
        : [...prev.selectedSections, sectionId]
    }));
  }, []);

  const selectAllSections = useCallback((sectionIds: string[]) => {
    setDesignMode(prev => ({
      ...prev,
      selectedSections: sectionIds
    }));
  }, []);

  const clearSelection = useCallback(() => {
    setDesignMode(prev => ({
      ...prev,
      selectedSections: []
    }));
  }, []);

  const resetDesignMode = useCallback(() => {
    setDesignMode({
      isActive: false,
      selectedSections: []
    });
  }, []);

  return {
    designMode,
    isDesignModeActive: designMode.isActive,
    selectedSections: designMode.selectedSections,
    hasSelectedSections: designMode.selectedSections.length > 0,
    selectedSectionsCount: designMode.selectedSections.length,
    handleDesignModeToggle,
    selectSection,
    selectAllSections,
    clearSelection,
    resetDesignMode
  };
};
