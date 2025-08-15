// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/components/section-status/section-status.tsx

import React from "react";
import { Badge } from "@/app/(_service)/components/ui/badge";
import { Button } from "@/app/(_service)/components/ui/button";
import { LoadingSpinner } from "@/app/(_service)/components/ui/loading-spinner";
import { RefreshCw, HardDrive, FileText } from "lucide-react";
import { ExtendedSection } from "@/app/(_service)/types/section-types";

export interface SectionStatusProps {
  pageHref: string | undefined;
  sectionsLoading: boolean;
  sectionsError: string | null;
  loadedSections: ExtendedSection[] | null;
  onReloadSections: () => Promise<void>;
}

export const SectionStatus: React.FC<SectionStatusProps> = ({
  pageHref,
  sectionsLoading,
  sectionsError,
  loadedSections,
  onReloadSections,
}) => {
  if (!pageHref) return null;

  if (sectionsLoading) {
    return (
      <div className="flex items-center gap-2">
        <LoadingSpinner className="h-3 w-3" />
        <span className="text-xs text-muted-foreground">
          Loading sections from file...
        </span>
      </div>
    );
  }

  if (sectionsError) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="destructive" className="text-xs">
          Error loading sections
        </Badge>
        <Button
          size="sm"
          variant="ghost"
          onClick={onReloadSections}
          className="h-auto p-1"
        >
          <RefreshCw className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  if (loadedSections) {
    const sectionsCount = loadedSections.length;
    return (
      <div className="flex items-center gap-2">
        <Badge
          variant="default"
          className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
        >
          <HardDrive className="h-3 w-3 mr-1" />
          {sectionsCount} sections loaded from file
        </Badge>
        <Button
          size="sm"
          variant="ghost"
          onClick={onReloadSections}
          className="h-auto p-1"
          title="Reload sections from file system"
        >
          <RefreshCw className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary" className="text-xs">
        <FileText className="h-3 w-3 mr-1" />
        No sections file found
      </Badge>
      <Button
        size="sm"
        variant="ghost"
        onClick={onReloadSections}
        className="h-auto p-1"
        title="Check for sections file"
      >
        <RefreshCw className="h-3 w-3" />
      </Button>
    </div>
  );
};
