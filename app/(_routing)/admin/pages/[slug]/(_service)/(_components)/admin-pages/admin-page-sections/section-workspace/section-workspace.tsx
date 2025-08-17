// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/section-workspace/section-workspace.tsx

"use client";

import React, { useEffect } from "react";
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
    // Добавляем новые методы
    openGallery
  } = useWorkspaceState();

  // ✅ Поднимаем управление секциями на уровень workspace
  const sectionManagement = useSectionManagement(sections);
  
  const {
    hasSelectedSections,
    selectedCount,
    getExtendedSections
  } = sectionManagement;

  // ✅ КЛЮЧЕВАЯ ЛОГИКА: Автоматическое управление галереей
  useEffect(() => {
    if (selectedCount > 0 && !isGalleryOpen) {
      // Автоматически открываем галерею при выделении секций
      openGallery();
    } else if (selectedCount === 0 && isGalleryOpen) {
      // Автоматически закрываем галерею при сбросе выделения
      closeGallery();
    }
  }, [selectedCount, isGalleryOpen, openGallery, closeGallery]);

  // Handler для передачи изменений секций наверх
  const handleSectionReorder = (reorderedSections: any[]) => {
    if (onSectionReorder) {
      onSectionReorder(reorderedSections);
    }
  };

  return (
    <div className="space-y-4">
      <WorkspaceHeader
        pageType={pageType}
        sectionsCount={sections.length}
        isGalleryOpen={isGalleryOpen}
        onGalleryToggle={toggleGallery}
        // ✅ Передаем информацию о выделении в header
        selectedCount={selectedCount}
        hasSelectedSections={hasSelectedSections}
      />

      <WorkspaceLayout
        isGalleryOpen={isGalleryOpen}
        galleryContent={
          <DesignGalleryPanel
            isOpen={isGalleryOpen}
            onClose={closeGallery}
          />
        }
      >
        <SectionsArea 
          sections={sections}
          onSectionReorder={handleSectionReorder}
          sectionManagement={sectionManagement}
        />
      </WorkspaceLayout>
    </div>
  );
};
