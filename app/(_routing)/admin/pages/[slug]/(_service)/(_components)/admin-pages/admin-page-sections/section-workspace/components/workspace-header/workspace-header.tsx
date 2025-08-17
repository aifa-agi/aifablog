
// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/section-workspace/components/workspace-header/workspace-header.tsx
"use client";

import React from "react";
import { Badge } from "@/app/(_service)/components/ui/badge";
import { Button } from "@/app/(_service)/components/ui/button";
import { Palette, ChevronLeft, ChevronRight } from "lucide-react";
import { WorkspaceHeaderProps } from "../../types";
import { getPageTypeName, getPageTypeColor } from "../../utils";

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  pageType,
  sectionsCount,
  isGalleryOpen,
  onGalleryToggle,
  selectedCount = 0,
  hasSelectedSections = false
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Main Workspace
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge 
              className={`text-xs ${getPageTypeColor(pageType)}`}
              variant="secondary"
            >
              {getPageTypeName(pageType)}
            </Badge>
            {sectionsCount > 0 && (
              <Badge variant="outline" className="text-xs">
                {sectionsCount} sections
              </Badge>
            )}
            {hasSelectedSections && (
              <Badge variant="default" className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {selectedCount} selected
              </Badge>
            )}
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onGalleryToggle}
        className="flex items-center gap-2"
        disabled={sectionsCount === 0}
      >
        <Palette className="h-4 w-4" />
        Section Designs
        {hasSelectedSections && (
          <Badge variant="secondary" className="text-xs ml-1">
            Auto
          </Badge>
        )}
        {isGalleryOpen ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>
    </div>
  );
};

