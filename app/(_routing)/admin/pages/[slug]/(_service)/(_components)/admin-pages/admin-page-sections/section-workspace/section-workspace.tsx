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

  // Состояние для отслеживания ручного управления
  const [isManualControl, setIsManualControl] = useState(false);
  const [lastManualAction, setLastManualAction] = useState<number>(0);

  // ✅ КЛЮЧЕВАЯ ЛОГИКА: Автоматическое управление галереей
  useEffect(() => {
    const now = Date.now();
    const timeSinceManualAction = now - lastManualAction;
    
    // Автоматическое управление работает только если:
    // 1. Не было ручного действия в последние 3 секунды
    // 2. Или если пользователь выбрал секции после ручного закрытия
    const shouldAutoControl = !isManualControl || timeSinceManualAction > 3000;
    
    if (shouldAutoControl) {
      if (selectedCount > 0 && !isGalleryOpen) {
        openGallery();
        setIsManualControl(false); // Сброс флага при автоматическом открытии
      } else if (selectedCount === 0 && isGalleryOpen && !isManualControl) {
        closeGallery();
      }
    }
  }, [selectedCount, isGalleryOpen, isManualControl, lastManualAction, openGallery, closeGallery]);

  // ✅ ИСПРАВЛЕННЫЙ обработчик ручного переключения
  const handleToggleGallery = () => {
    const now = Date.now();
    
    // Переключаем галерею
    toggleGallery();
    
    // Устанавливаем флаги ручного управления
    setIsManualControl(true);
    setLastManualAction(now);
    
    console.log('Manual gallery toggle:', !isGalleryOpen ? 'opening' : 'closing');
  };

  // Сброс ручного управления при отсутствии выбранных секций
  useEffect(() => {
    if (isManualControl && selectedCount === 0) {
      const timer = setTimeout(() => {
        setIsManualControl(false);
        console.log('Manual control reset - no sections selected');
      }, 3000); // Увеличено до 3 секунд
      
      return () => clearTimeout(timer);
    }
  }, [isManualControl, selectedCount]);

  // Обработчик для закрытия галереи (используется DesignGalleryPanel)
  const handleCloseGallery = () => {
    closeGallery();
    setIsManualControl(true);
    setLastManualAction(Date.now());
    console.log('Manual gallery close');
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
          onSectionReorder={handleSectionReorder}
          sectionManagement={sectionManagement}
        />
      </WorkspaceLayout>
    </div>
  );
};
