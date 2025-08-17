
// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/section-workspace/section-workspace.tsx

"use client";

import React, { useEffect, useState, useCallback } from "react";
import { WorkspaceProps } from "./types";
import { useWorkspaceState } from "./hooks";
import { useSectionManagement } from "./hooks/use-section-management";
import {
  WorkspaceHeader,
  WorkspaceLayout,
  DesignGalleryPanel,
  SectionsArea
} from "./components";
import { AddNewSection } from "./components/sections-area/components/add-new-section";

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
    hasSelectedSections,
    selectedCount,
    clearSelection,
    selection
  } = sectionManagement;

  // Состояние для выбранного шаблона из галереи
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);

  // Логика показа AddNewSection
  const shouldShowAddNewSection = 
    !hasSelectedSections && 
    selectedTemplateId !== null && 
    selectedTemplateId > 0;

  // Автоматическое управление галереей на основе выбора секций
  useEffect(() => {
    if (selectedCount > 0 && !isGalleryOpen) {
      openGallery();
    } else if (selectedCount === 0 && isGalleryOpen && !selectedTemplateId) {
      closeGallery();
    }
  }, [selectedCount, isGalleryOpen, selectedTemplateId, openGallery, closeGallery]);

  // Обработчик выбора шаблона
  const handleTemplateSelect = useCallback((templateId: number) => {
    if (templateId === 0) {
      // Сброс выбора
      setSelectedTemplateId(null);
    } else {
      setSelectedTemplateId(templateId);
    }
  }, []);

  // При закрытии галереи сбрасываем выбранный шаблон
  const handleGalleryClose = useCallback(() => {
  setSelectedTemplateId(null);
}, []);

  // Эффект для отслеживания изменений в выборе секций
  useEffect(() => {
    if (shouldShowAddNewSection && hasSelectedSections) {
      // Если открыто окно AddNewSection и пользователь выбрал секции,
      // то закрываем AddNewSection и сбрасываем выбранный шаблон
      setSelectedTemplateId(null);
    }
  }, [hasSelectedSections, shouldShowAddNewSection]);

  const handleAddNewSection = () => {
    console.log(`Creating new section with template ${selectedTemplateId}`);
    // Здесь будет логика создания новой секции
    // После создания сбрасываем состояние
    setSelectedTemplateId(null);
  };

  const handleCloseAddNewSection = () => {
    setSelectedTemplateId(null);
  };

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
        selectedCount={selectedCount}
        hasSelectedSections={hasSelectedSections}
      />

      <WorkspaceLayout
        isGalleryOpen={isGalleryOpen}
        galleryContent={
          <DesignGalleryPanel
            isOpen={isGalleryOpen}
            selectedTemplateId={selectedTemplateId}
            onSelectTemplate={handleTemplateSelect}
            onClose={handleGalleryClose}
          />
        }
      >
        <div className="space-y-4">
          {/* AddNewSection отображается только при выполнении условий */}
          {shouldShowAddNewSection && (
            <AddNewSection
              selectedTemplateId={selectedTemplateId!}
              onAdd={handleAddNewSection}
              onClose={handleCloseAddNewSection}
            />
          )}

          <SectionsArea
            sections={sections}
            onSectionReorder={handleSectionReorder}
            sectionManagement={sectionManagement}
          />
        </div>
      </WorkspaceLayout>
    </div>
  );
};