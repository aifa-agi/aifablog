
// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/section-workspace/section-workspace.tsx

"use client";

import React, { useEffect, useState } from "react";
import { WorkspaceProps } from "./types";
import { useWorkspaceState } from "./hooks";
import { useSectionManagement } from "./hooks/use-section-management";
import {
  WorkspaceHeader,
  WorkspaceLayout,
  DesignGalleryPanel,
  SectionsArea
} from "./components";

export const SectionWorkspace: React.FC<WorkspaceProps> = ({
  sections,
  pageType,
  onSectionReorder
}) => {
  const {
    isGalleryOpen,
    toggleGallery,
    closeGallery,
    openGallery
  } = useWorkspaceState();

  const sectionManagement = useSectionManagement(sections);
  const {
    selectedCount
  } = sectionManagement;

  // State to track manual override of gallery control
  const [manualOverride, setManualOverride] = useState(false);

  // Auto open/close logic - only operates when no manual override
  useEffect(() => {
    if (!manualOverride) {
      if (selectedCount > 0 && !isGalleryOpen) {
        openGallery();
      } else if (selectedCount === 0 && isGalleryOpen) {
        closeGallery();
      }
    }
  }, [selectedCount, isGalleryOpen, manualOverride, openGallery, closeGallery]);

  // Manual toggle handler with override flag
  const handleToggleGallery = () => {
    toggleGallery();
    setManualOverride(true);
  };

  // Close handler with reset of manual override
  const handleCloseGallery = () => {
    closeGallery();
    setManualOverride(false);
  };

  

  return (
    <div className="space-y-4">
      <WorkspaceHeader
        pageType={pageType}
        sectionsCount={sections.length}
        isGalleryOpen={isGalleryOpen}
        onGalleryToggle={handleToggleGallery}
        selectedCount={selectedCount}
        hasSelectedSections={selectedCount > 0}
      />

      <WorkspaceLayout
        isGalleryOpen={isGalleryOpen}
        galleryContent={
          <DesignGalleryPanel
            isOpen={isGalleryOpen}
            onClose={handleCloseGallery}
            containerHeight={600} 
          />
        }
      >
        <SectionsArea
          sections={sections}
          onSectionReorder={onSectionReorder}
          sectionManagement={sectionManagement}
        />
      </WorkspaceLayout>
    </div>
  );
};

