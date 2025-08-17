// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/section-workspace/utils/section-transformer.ts

import { ExtendedSection } from "@/app/(_service)/types/section-types";
import { WorkflowSection, ExtendedSectionType } from "../types/workspace.types";

/**
 * Determines section type from ExtendedSection
 */
export const getExtendedSectionType = (
  section: ExtendedSection
): ExtendedSectionType => {
  if (!('bodyContent' in section) || !section.bodyContent) {
    console.warn('Section has no bodyContent:', section.id);
    return "Invalid Section";
  }
  
  // StepSection - bodyContent является массивом
  if (Array.isArray(section.bodyContent)) {
    if (section.bodyContent.length === 0) {
      return "Empty Step Section";
    }
    return "Step Section";
  }
  
  // Объектная структура bodyContent
  if (typeof section.bodyContent === 'object' && section.bodyContent !== null) {
    if ('sectionType' in section.bodyContent) {
      const sectionType = section.bodyContent.sectionType;
      
      // Проверяем валидность sectionType
      if (sectionType === "Section" || 
          sectionType === "Simple" || 
          sectionType === "Typography") {
        return sectionType;
      }
      
      console.warn('Unknown sectionType:', sectionType);
      return "Invalid Section";
    }
    
    console.warn('bodyContent object missing sectionType:', section.bodyContent);
    return "Invalid Section";
  }
  
  console.error('Unexpected bodyContent type:', typeof section.bodyContent);
  return "Invalid Section";
};

/**
 * Generates designId based on section type and order
 */
export const generateDesignId = (
  section: ExtendedSection,
  index: number
): string => {
  const sectionType = getExtendedSectionType(section);

  switch (sectionType) {
    case "Section":
      return `S${index.toString().padStart(3, "0")}`;
    case "Simple":
      return `I${index.toString().padStart(3, "0")}`;
    case "Typography":
      const typographyType = (section as any).bodyContent?.type;
      if (typographyType?.startsWith("TypographyH")) {
        return `H${typographyType.slice(-1)}`;
      }
      return `T${index.toString().padStart(3, "0")}`;
    case "Step Section":
      return `ST${index.toString().padStart(2, "0")}`;
    default:
      return `U${index.toString().padStart(3, "0")}`;
  }
};

/**
 * Transforms ExtendedSection to WorkflowSection
 */
export const transformToWorkflowSection = (
  section: ExtendedSection,
  index: number
): WorkflowSection => {
  return {
    id: section.id,
    designId: generateDesignId(section, index),
    sectionType: getExtendedSectionType(section),
    isGrouped: false,
    originalOrder:
      "order" in section ? parseInt(section.order || "0") : index + 1,
    isDirty: false,
    extendedSection: section,
  };
};

/**
 * Transforms array of ExtendedSection to WorkflowSection
 */
export const transformToWorkflowSections = (
  sections: ExtendedSection[]
): WorkflowSection[] => {
  return sections.map((section, index) =>
    transformToWorkflowSection(section, index)
  );
};

/**
 * Reverse transformation from WorkflowSection to ExtendedSection
 */
export const transformFromWorkflowSection = (
  workflowSection: WorkflowSection
): ExtendedSection => {
  const section = { ...workflowSection.extendedSection };

  // Update order if it changed
  if ("order" in section && workflowSection.originalOrder) {
    (section as any).order = workflowSection.originalOrder.toString();
  }

  return section;
};

/**
 * Reverse transformation of array
 */
export const transformFromWorkflowSections = (
  workflowSections: WorkflowSection[]
): ExtendedSection[] => {
  return workflowSections.map(transformFromWorkflowSection);
};
