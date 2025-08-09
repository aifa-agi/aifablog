// @/app/(_service)/components/nav-bar/admin-flow/editable-wide-menu/page-section/publish-actions-dropdown/hooks/use-publish-logic.ts

import { useCallback } from "react";
import { MenuCategory } from "@/app/(_service)/types/menu-types";
import { PageData } from "@/app/(_service)/types/page-types";
import { PublishMode, PublishState } from "../types";
import { getPublishState, getPublishMode } from "../publish-utils";

interface UsePublishLogicProps {
  singlePage: PageData;
  categoryTitle: string;
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
}

interface UsePublishLogicReturn {
  publishState: PublishState;
  publishMode: PublishMode;
  handlePublishMode: (mode: PublishMode) => void;
}

/**
 * Custom hook to handle publish logic and state management
 */
export function usePublishLogic({
  singlePage,
  categoryTitle,
  setCategories,
}: UsePublishLogicProps): UsePublishLogicReturn {
  
  const publishState = getPublishState(singlePage);
  const publishMode = getPublishMode(singlePage.isPublished);

  const handlePublishMode = useCallback((mode: PublishMode) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.title !== categoryTitle
          ? cat
          : {
              ...cat,
              pages: cat.pages.map((page) =>
                page.id !== singlePage.id
                  ? page
                  : {
                      ...page,
                      isPublished: mode === "published",
                    }
              ),
            }
      )
    );
    
    console.log("PUBLISH MODE CHANGED", singlePage.id, mode);
  }, [singlePage.id, categoryTitle, setCategories]);

  return {
    publishState,
    publishMode,
    handlePublishMode,
  };
}
