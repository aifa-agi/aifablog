// @/app/(_service)/components/nav-bar/admin-flow/page-actions-dropdown/hooks/use-icon-status.ts
import { useMemo } from "react";
import { PageData } from "@/app/(_service)/types/page-types";
import { IconStatus } from "../types";

interface UseIconStatusProps {
  currentPageData: PageData | null;
  dataStatus: {
    hasTitleData: boolean;
    hasDescriptionData: boolean;
    hasKeywordsData: boolean;
    hasImagesData: boolean;
  };
}

export function useIconStatus({ currentPageData, dataStatus }: UseIconStatusProps) {
  const iconStatus: IconStatus = useMemo(() => {
    if (!currentPageData) {
      return "default";
    }

    const { hasTitleData, hasDescriptionData, hasKeywordsData, hasImagesData } = dataStatus;
    
    const hasBasicData = hasTitleData && hasDescriptionData && hasKeywordsData && hasImagesData;
    
    const hasSections = currentPageData.sections && currentPageData.sections.length > 0;

    if (hasBasicData && hasSections) {
      return "complete";
    } else if (hasBasicData && !hasSections) {
      return "partial";
    } else {
      return "default";
    }
  }, [currentPageData, dataStatus]);

  return { iconStatus };
}
