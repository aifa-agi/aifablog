// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useNavigationMenu,
  useMenuOperations,
} from "@/app/(_service)/contexts/nav-bar-provider";
import { useRole } from "@/app/(_service)/contexts/role-provider";
import { MenuCategory } from "@/app/(_service)/types/menu-types";
import { ExtendedSection } from "@/app/(_service)/types/section-types";
import { Badge } from "@/app/(_service)/components/ui/badge";
import { Button } from "@/app/(_service)/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/(_service)/components/ui/card";
import { LoadingSpinner } from "@/app/(_service)/components/ui/loading-spinner";
import {
  AlertCircle,
  Shield,
  Home,
  ArrowUpDown,
  Lightbulb,
  Info,
  RefreshCw,
  FileText,
  HardDrive,
  Palette,
  Database,
} from "lucide-react";
import { toast } from "sonner";
import {
  usePageSections,
  useSections,
} from "../../(_context)/section-provider";
import { AdminPageInfoProps } from "./types/admin-page-sections.types";
import { DesignModeState } from "./types/design-mode.types";
import { findPageBySlug } from "./utils/page-helpers";
import {
  managementInstructions,
  previewInstructions,
} from "./constants/instructions";
import { NoSectionsWarning } from "./components/no-sections-warning/no-sections-warning";
import { SectionsPlaceholder } from "./components/sections-placeholder/sections-placeholder";
import { useDesignMode } from "./hooks/use-design-mode";
import { getRefreshIconColor } from "./utils/status-helpers";
import { useSectionOperations } from "./hooks/use-section-operations";
import { SectionStatus } from "./components/section-status";
import { SectionComparison } from "./components/section-comparison";
import { AccessDenied } from "./components/access-control/access-denied";

export function AdminPageSections({ slug }: AdminPageInfoProps) {
  // Existing hooks
  const { categories, setCategories, loading, initialized, dirty } =
    useNavigationMenu();
  const { handleUpdate, loading: savingCategories } = useMenuOperations();
  const { role } = useRole();
  const router = useRouter();

  // Section context hooks
  const sectionsContext = useSections();

  // Find current page data using helper function
  const pageData = findPageBySlug(categories, slug);
  const pageHref = pageData?.page?.href;

  const {
    loadedSections,
    sectionsLoading,
    sectionsError,
    handleReloadSections,
    updateLoadedSections,
  } = useSectionOperations(pageHref);

  const {
    designMode,
    isDesignModeActive,
    selectedSections,
    hasSelectedSections,
    selectedSectionsCount,
    handleDesignModeToggle,
    selectSection,
    clearSelection,
  } = useDesignMode();

  useEffect(() => {
    if (role !== "admin") {
      const timer = setTimeout(() => {
        router.push("/");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [role, router]);

  if (role !== "admin") {
    return <AccessDenied currentRole={role} />;
  }

  if (loading || !initialized) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
        <span className="ml-3 text-muted-foreground">
          Loading sections data...
        </span>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="flex bg-background items-center justify-center py-12">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Page Not Found
          </h3>
          <p className="text-muted-foreground mb-4">
            The page with slug{" "}
            <code className="bg-muted px-2 py-1 rounded text-foreground">
              {slug}
            </code>{" "}
            does not exist
          </p>
          <p className="text-sm text-muted-foreground">
            Please check the URL or select an existing page from the menu
          </p>
        </div>
      </div>
    );
  }

  const { page, category } = pageData;
  const hasLoadedSections = loadedSections && loadedSections.length > 0;
  const isValidHref =
    page.href && /^\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/.test(page.href);

  return (
    <div className="space-y-6">
      {/* Admin Access Banner */}
      <div className="bg-muted/50 border border-border rounded-lg px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-muted-foreground">
            Admin Access - Role:{" "}
            <span className="font-mono text-foreground">{role}</span>
          </span>
        </div>
      </div>

      {/* Page Information Card - UNCHANGED */}
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
                onReloadSections={handleReloadSections}
              />
            </div>
          </div>

          <SectionComparison
            metadataSections={pageData?.page?.sections}
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

      {/* Section Management Container - NEW */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ArrowUpDown className="h-6 w-6 text-primary" />
              <div>
                <CardTitle className="text-xl">
                  Page Section Sorting and Editing
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 text-xs"
                  >
                    <Database className="h-3 w-3" />
                    Section Management
                  </Badge>
                  {hasLoadedSections && (
                    <Badge variant="outline" className="text-xs">
                      {loadedSections.length} sections available
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Section Designs Button - Preparing for future functionality */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleDesignModeToggle}
              className="flex items-center gap-2"
              disabled={!hasLoadedSections}
            >
              <Palette className="h-4 w-4" />
              Section Designs
              {designMode.isActive && (
                <Badge variant="secondary" className="text-xs ml-1">
                  Active
                </Badge>
              )}
            </Button>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="leading-relaxed">{managementInstructions}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Instructions Panel */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-950 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm">
                    Preview Instructions:
                  </h4>
                </div>
                <div className="text-blue-800 dark:text-blue-200 text-xs">
                  {previewInstructions}
                </div>
              </div>
            </div>
          </div>

          {/* Conditional Content Rendering */}
          {!hasLoadedSections ? <NoSectionsWarning /> : <SectionsPlaceholder />}
        </CardContent>
      </Card>

      {/* Debug panel for development - can be removed in production */}
      {process.env.NODE_ENV === "development" && loadedSections && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="h-4 w-4" />
              Debug: Loaded Sections ({loadedSections.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">
                Design Mode: {designMode.isActive ? "Active" : "Inactive"}
              </div>
              <div className="text-xs text-muted-foreground">
                Selected Sections: {designMode.selectedSections.length}
              </div>
              {loadedSections.length > 5 && (
                <div className="text-xs text-muted-foreground">
                  ... and {loadedSections.length - 5} more sections
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
