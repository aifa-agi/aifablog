// @/app/(_routing)/admin\pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/admin-page-sections.tsx

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useNavigationMenu,
  useMenuOperations,
} from "@/app/(_service)/contexts/nav-bar-provider";
import { useRole } from "@/app/(_service)/contexts/role-provider";
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
  Shield,
  ArrowUpDown,
  Lightbulb,
  Palette,
  Database,
} from "lucide-react";
import {
  useSections,
} from "../../../(_context)/section-provider";
import { AdminPageInfoProps } from "./types/admin-page-sections.types";
import { findPageBySlug } from "./utils/page-helpers";
import {
  managementInstructions,
  previewInstructions,
} from "./constants/instructions";
import { NoSectionsWarning } from "./components/no-sections-warning/no-sections-warning";

import { getRefreshIconColor } from "./utils/status-helpers";
import { AccessDenied } from "./components/access-control/access-denied";
import { PageInformationCard } from "./components/page-information-card";
import { PageNotFound } from "./components/page-not-found";
import { useDesignMode } from "./hooks/use-design-mode";
import { useSectionOperations } from "./hooks/use-section-operations";
import { SectionWorkspace } from "./section-workspace";

export function AdminPageSections({ slug }: AdminPageInfoProps) {
  // Existing hooks
  const { categories,  loading, initialized, dirty } =
    useNavigationMenu();
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
    return <PageNotFound slug={slug} />;
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
      <PageInformationCard
        page={page}
        category={category}
        dirty={dirty}
        isValidHref={isValidHref}
        pageHref={pageHref}
        sectionsLoading={sectionsLoading}
        sectionsError={sectionsError}
        loadedSections={loadedSections}
        onReloadSections={handleReloadSections}
        getRefreshIconColor={getRefreshIconColor}
      />

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
          {!hasLoadedSections ? (
            <NoSectionsWarning />
          ) : (
            <SectionWorkspace
              sections={loadedSections}
              pageType={page.type || "basePage"}
              onSectionReorder={(reorderedSections) => {
                updateLoadedSections(reorderedSections);
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
