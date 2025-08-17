
// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/components/page-not-found/index.ts

"use client";

import React from "react";
import { Badge } from "@/app/(_service)/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/(_service)/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";
import { SectionStatus } from "../section-status/section-status";
import { SectionComparison } from "../section-comparison/section-comparison";

export interface PageInformationCardProps {
  page: {
    title?: string | undefined;
    href?: string | undefined;
    sections?: Array<{ id: string }>;
  };
  category: {
    title: string;
  };
  dirty: boolean;
  isValidHref: string | boolean | undefined;
  pageHref?: string;
  sectionsLoading: boolean;
  sectionsError: string | null;
  loadedSections: any[] | null;
  onReloadSections: () => Promise<void>;
  getRefreshIconColor: (page: any, dirty: boolean) => string;
}

// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/components/PageInformationCard/page-information-card.tsx
export function PageInformationCard({
  page,
  category,
  dirty,
  isValidHref,
  pageHref,
  sectionsLoading,
  sectionsError,
  loadedSections,
  onReloadSections,
  getRefreshIconColor
}: PageInformationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Page Information
          {page.sections && page.sections.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {page.sections.length} sections (metadata)
            </Badge>
          )}
          {dirty && (
            <Badge
              variant="outline"
              className="text-xs text-orange-600 border-orange-300"
            >
              Unsaved changes
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Category:</span>
          <Badge variant="outline">{category.title}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Page:</span>
          <Badge variant="outline">{page.title}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Href:</span>
          <code className="bg-muted px-2 py-1 rounded text-xs">
            {page.href || "Not defined"}
          </code>
          {page.href && !isValidHref && (
            <Badge variant="destructive" className="text-xs">
              Invalid format
            </Badge>
          )}
          {isValidHref && (
            <Badge
              variant="default"
              className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            >
              Valid
            </Badge>
          )}
        </div>

        <div className="flex items-start gap-2">
          <span className="text-muted-foreground">Metadata sections:</span>
          <div className="flex-1">
            {page.sections && page.sections.length > 0 ? (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {page.sections.length} sections in metadata
                  </Badge>
                  <RefreshCw
                    className={`h-3 w-3 ${getRefreshIconColor(page, dirty)}`}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  Status: {!dirty ? "Saved" : "Pending save"} | IDs:{" "}
                  {page.sections
                    .slice(0, 3)
                    .map((s) => s.id)
                    .join(", ")}
                  {page.sections.length > 3 &&
                    ` ... +${page.sections.length - 3} more`}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  No sections in metadata
                </Badge>
                <RefreshCw
                  className={`h-3 w-3 ${getRefreshIconColor(page, dirty)}`}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <span className="text-muted-foreground">File sections:</span>
          <div className="flex-1">
            <SectionStatus
              pageHref={pageHref}
              sectionsLoading={sectionsLoading}
              sectionsError={sectionsError}
              loadedSections={loadedSections}
              onReloadSections={onReloadSections}
            />
          </div>
        </div>

        <SectionComparison
          metadataSections={page.sections}
          loadedSections={loadedSections}
        />

        {page.href && !isValidHref && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 dark:bg-amber-950 dark:border-amber-800">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h5 className="font-medium text-amber-900 dark:text-amber-100 text-sm">
                  Invalid Href Format
                </h5>
                <p className="text-amber-800 dark:text-amber-200 text-xs mt-1">
                  Href must be in format "/category/subcategory" with only
                  letters, numbers, hyphens, and underscores.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
