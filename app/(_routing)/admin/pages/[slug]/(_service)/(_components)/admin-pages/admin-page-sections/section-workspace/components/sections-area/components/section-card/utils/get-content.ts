
// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/section-workspace/components/sections-area/components/section-card/utils/get-content.ts

import { ExtendedSection } from "@/app/(_service)/types/section-types";

export const getContentPreview = (section: ExtendedSection): string => {
  const extSection = section as any;
  
  // Для обычных Section с Typography содержимым
  if (extSection.bodyContent?.props?.children && typeof extSection.bodyContent.props.children === 'string') {
    return extSection.bodyContent.props.children.substring(0, 100) + "...";
  }
  
  // Для TypographySection - проверяем различные типы контента
  if (extSection.bodyContent?.sectionType === "Typography") {
    const { type, props } = extSection.bodyContent;
    
    // Для заголовков и параграфов с children
    if (['TypographyH1', 'TypographyH2', 'TypographyH3', 'TypographyH4', 'TypographyP', 'TypographyLead', 'TypographyLarge', 'TypographyMuted'].includes(type)) {
      if (props.children && typeof props.children === 'string') {
        return props.children.substring(0, 100) + "...";
      }
    }
    
    // Для списков
    if (type === 'TypographyList' || type === 'TypographyOrderedList') {
      if (props.items && Array.isArray(props.items) && props.items.length > 0) {
        const firstItem = props.items[0];
        if (typeof firstItem === 'string') {
          return firstItem.substring(0, 100) + "...";
        }
      }
    }
    
    // Для blockquote
    if (type === 'TypographyBlockquote' && props.children && typeof props.children === 'string') {
      return props.children.substring(0, 100) + "...";
    }
    
    // Для таблиц
    
  }
  
  // Для SimpleSection (например, изображения)
  if (extSection.bodyContent?.sectionType === "Simple") {
    const { type, props } = extSection.bodyContent;
    
    // Для изображений проверяем alt текст
    if (type === 'SimpleSectionFullScreenSizeImage') {
      if (props.alt && typeof props.alt === 'string') {
        return props.alt.substring(0, 100) + "...";
      }
    }
  }
  
  // Для StepSection - берем первый шаг
  if (extSection.bodyContent && Array.isArray(extSection.bodyContent)) {
    const firstStep = extSection.bodyContent[0];
    if (firstStep) {
      if (firstStep.sectionType === "Typography Steps" && firstStep.props?.children && typeof firstStep.props.children === 'string') {
        return firstStep.props.children.substring(0, 100) + "...";
      }
      if (firstStep.sectionType === "Simple Steps" && firstStep.props?.alt && typeof firstStep.props.alt === 'string') {
        return firstStep.props.alt.substring(0, 100) + "...";
      }
    }
  }
  
  // Fallback на headerContent.title если доступен
  if (extSection.headerContent?.title && typeof extSection.headerContent.title === 'string') {
    return extSection.headerContent.title.substring(0, 100) + (extSection.headerContent.title.length > 100 ? "..." : "");
  }
  
  // Дополнительный fallback на announcement если есть
  if (extSection.headerContent?.announcement?.descriptionText && typeof extSection.headerContent.announcement.descriptionText === 'string') {
    return extSection.headerContent.announcement.descriptionText.substring(0, 100) + "...";
  }
  
  return "No content preview available";
};
