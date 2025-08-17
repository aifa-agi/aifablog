// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-page-details-client.tsx

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNavigationMenu } from "@/app/(_service)/contexts/nav-bar-provider";
import { useRole } from "@/app/(_service)/contexts/role-provider"; // Добавляем импорт useRole
import { MenuCategory } from "@/app/(_service)/types/menu-types";
import { Badge } from "@/app/(_service)/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/(_service)/components/ui/card";
import { LoadingSpinner } from "@/app/(_service)/components/ui/loading-spinner";
import { AlertCircle, FileText, Globe, Eye, EyeOff, Shield, Home } from "lucide-react";
import { Button } from "@/app/(_service)/components/ui/button";
import { AdminPageInfoProps } from "./admin-page-sections/types/admin-page-sections.types";
import { findPageBySlug } from "./admin-page-sections/utils/page-helpers";
import { AccessDenied } from "./admin-page-sections/components/access-control/access-denied";
import { PageNotFound } from "./admin-page-sections/components/page-not-found";



/**
 * Client component that uses NavigationMenuProvider context
 * to find page by slug and display its details
 * 
 * Refactored to use Tailwind CSS theme variables instead of hardcoded colors
 * for proper dark/light theme support
 * 
 * Added role-based access control - redirects non-admin users to home page
 */
export function AdminPageInfo({ slug }: AdminPageInfoProps) {
  const { categories, loading, initialized } = useNavigationMenu();
  const { role } = useRole(); // Получаем роль пользователя из контекста
  const router = useRouter();

  // Role-based access control
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


  // Show loading state with theme-aware colors
  if (loading || !initialized) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
        <span className="ml-3 text-muted-foreground">Loading page data...</span>
      </div>
    );
  }

  const pageData = findPageBySlug(categories, slug);

  // Show error state if page not found with theme-aware styling
  if (!pageData) {
    return <PageNotFound slug={slug} />;
  }

  const { page, category } = pageData;

  return (
    <div className="space-y-6">
      {/* Admin Access Indicator */}
      <div className="bg-muted/50 border border-y-foreground  py-3">
        <div className="flex items-center gap-2 text-sm">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-muted-foreground">
            Admin Access - Role: <span className="font-mono text-foreground">{role}</span>
          </span>
        </div>
      </div>

      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-semibold text-muted-foreground">
              {page.title || page.linkName}
            </h2>
            {page.hasBadge && page.badgeName && (
              <Badge variant="secondary">{page.badgeName}</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            Category: <span className="font-medium text-foreground">{category.title}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            URL:{" "}
            <code className="bg-muted text-foreground px-2 py-1 rounded text-xs">
              {page.href}
            </code>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {page.isPublished ? (
            <Badge variant="default" className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              Published
            </Badge>
          ) : (
            <Badge variant="outline" className="flex items-center gap-1">
              <EyeOff className="h-3 w-3" />
              Draft
            </Badge>
          )}
        </div>
      </div>

      {/* Page Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-4 w-4" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">
                Title
              </label>
              <p className="text-sm text-foreground bg-muted p-2 rounded">
                {page.title || "Not specified"}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1">
                Description
              </label>
              <p className="text-sm text-foreground bg-muted p-2 rounded min-h-[60px]">
                {page.description || "No description provided"}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1">
                Content Type
              </label>
              <Badge variant="outline">{page.type}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Status & Settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="h-4 w-4" />
              Status & Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">
                  Order
                </label>
                <p className="text-sm text-foreground">{page.order}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-1">
                  Page ID
                </label>
                <code className="text-xs text-muted-foreground break-all">
                  {page.id}
                </code>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground block">
                Integrations
              </label>
              <div className="flex flex-wrap gap-2">
                {page.isVectorConnected && (
                  <Badge variant="secondary" className="text-xs">
                    Vector Connected
                  </Badge>
                )}
                {page.isChatSynchronized && (
                  <Badge variant="secondary" className="text-xs">
                    Chat Synchronized
                  </Badge>
                )}
                {!page.isVectorConnected && !page.isChatSynchronized && (
                  <span className="text-xs text-muted-foreground">No integrations</span>
                )}
              </div>
            </div>

            {page.roles && page.roles.length > 0 && (
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">
                  Access Roles
                </label>
                <div className="flex flex-wrap gap-1">
                  {page.roles.map((role, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Keywords */}
      {page.keyWords && page.keyWords.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {page.keyWords.map((keyword, index) => (
                <Badge key={index} variant="secondary">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Images */}
      {page.images && page.images.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {page.images.map((image, index) => (
                <div key={image.id || index} className="border border-foreground rounded-lg p-3">
                  <img
                    src={image.href}
                    alt={image.alt}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <p className="text-xs text-muted-foreground break-all">{image.alt}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
