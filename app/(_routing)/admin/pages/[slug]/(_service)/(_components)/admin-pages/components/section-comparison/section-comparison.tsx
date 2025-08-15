// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/components/section-comparison/section-comparison.tsx

import React from "react";
import { Info } from "lucide-react";
import { ExtendedSection } from "@/app/(_service)/types/section-types";
import { SectionInfo } from "@/app/(_service)/types/page-types";

interface SectionComparisonProps {
  metadataSections: SectionInfo[] | undefined;
  loadedSections: ExtendedSection[] | null;
}

export const SectionComparison: React.FC<SectionComparisonProps> = ({
  metadataSections,
  loadedSections,
}) => {
  if (!metadataSections || !loadedSections) return null;

  const loadedSectionsCount = loadedSections.length;
  const metadataSectionsCount = metadataSections.length;

  if (loadedSectionsCount !== metadataSectionsCount) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 dark:bg-amber-950 dark:border-amber-800">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h5 className="font-medium text-amber-900 dark:text-amber-100 text-sm">
              Section Count Mismatch
            </h5>
            <p className="text-amber-800 dark:text-amber-200 text-xs mt-1">
              File contains {loadedSectionsCount} sections, but metadata shows{" "}
              {metadataSectionsCount} sections. Consider uploading new
              sections or saving categories to sync.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export type { SectionComparisonProps };
