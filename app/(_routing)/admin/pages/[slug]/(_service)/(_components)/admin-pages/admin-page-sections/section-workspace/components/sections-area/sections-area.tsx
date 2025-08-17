
// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/section-workspace/components/sections-area/sections-area.tsx

"use client";

import React from "react";
import { ExtendedSection } from "@/app/(_service)/types/section-types";
import { SectionsList } from "./components/sections-list/sections-list";
import { UseSectionManagementReturn } from "../../hooks/use-section-management";
export interface SectionsAreaProps {
  sections: ExtendedSection[];
  onSectionReorder?: (sections: ExtendedSection[]) => void;
  onSectionEdit?: (sectionId: string) => void;
  onSectionPreview?: (sectionId: string) => void;
  sectionManagement?: UseSectionManagementReturn;
}

export const SectionsArea: React.FC<SectionsAreaProps> = ({
  sections,
  onSectionReorder,
  onSectionEdit,
  onSectionPreview,
  sectionManagement
}) => {
  // Если нет секций, показываем заглушку
  if (!sections || sections.length === 0) {
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground text-center py-12 border-2 border-dashed border-border rounded-lg">
          <div className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50 flex items-center justify-center">
            📄
          </div>
          <p>No sections available</p>
          <p className="text-xs mt-1">
            Upload sections or create new ones to get started
          </p>
        </div>
      </div>
    );
  }

  // Рендерим список секций с drag & drop
  return (
    <div className="space-y-4">
      <SectionsList
        sections={sections}
        onSectionReorder={onSectionReorder}
        onSectionEdit={onSectionEdit}
        onSectionPreview={onSectionPreview}
        sectionManagement={sectionManagement}
      />
    </div>
  );
};
