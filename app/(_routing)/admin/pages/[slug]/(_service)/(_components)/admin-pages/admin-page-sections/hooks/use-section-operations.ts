
// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/hooks/use-section-operations.ts

"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { usePageSections } from "../../../../(_context)/section-provider";

export const useSectionOperations = (pageHref?: string) => {
  const {
    sections: loadedSections,
    loading: sectionsLoading,
    error: sectionsError,
    reload: reloadSections,
    update: updateLoadedSections
  } = usePageSections(pageHref);

  const handleReloadSections = async (): Promise<void> => {
  if (!pageHref) return;
  
  try {
    await reloadSections();
    toast.success("Sections reloaded from file system");
  } catch (error) {
    toast.error("Failed to reload sections");
  }
};
  return {
    loadedSections,
    sectionsLoading,
    sectionsError,
    handleReloadSections,
    updateLoadedSections
  };
};
