// @/app/(_service)/components/nav-bar/admin-flow/page-actions-dropdown/components/page-actions-menu.tsx

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/app/(_service)/components/ui/dropdown-menu";
import { PageDataStatus, PageActionsHook } from "../types";
import { StatusIndicator } from "./status-indicator";

interface PageActionsMenuProps extends PageDataStatus, Pick<PageActionsHook, 
  "handleAddTitle" | 
  "handleAddDescription" | 
  "handleAddImages" | 
  "handleAddKeywords" | 
  "handleAddPageCode"
> {}

export function PageActionsMenu({
  hasTitleData,
  hasDescriptionData,
  hasImagesData,
  hasKeywordsData,
  handleAddTitle,
  handleAddDescription,
  handleAddImages,
  handleAddKeywords,
  handleAddPageCode,
}: PageActionsMenuProps) {
  return (
    <>
      <DropdownMenuItem
        onClick={handleAddTitle}
        className="flex items-center"
      >
        <StatusIndicator isActive={hasTitleData} />
        <span>{hasTitleData ? "Edit Title" : "Add Title"}</span>
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={handleAddDescription}
        className="flex items-center"
      >
        <StatusIndicator isActive={hasDescriptionData} />
        <span>
          {hasDescriptionData ? "Edit Description" : "Add Description"}
        </span>
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={handleAddImages}
        className="flex items-center"
      >
        <StatusIndicator isActive={hasImagesData} />
        <span>{hasImagesData ? "Edit Images" : "Add Images"}</span>
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={handleAddKeywords}
        className="flex items-center"
      >
        <StatusIndicator isActive={hasKeywordsData} />
        <span>{hasKeywordsData ? "Edit Keywords" : "Add Keywords"}</span>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={handleAddPageCode}>
        Page Body
      </DropdownMenuItem>
    </>
  );
}
