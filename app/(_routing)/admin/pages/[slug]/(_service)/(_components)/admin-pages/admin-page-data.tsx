// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-data.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useNavigationMenu, useMenuOperations } from "@/app/(_service)/contexts/nav-bar-provider";
import { useRole } from "@/app/(_service)/contexts/role-provider";
import { MenuCategory } from "@/app/(_service)/types/menu-types";
import { ExtendedSection } from "@/app/(_service)/types/section-types";
import { Badge } from "@/app/(_service)/components/ui/badge";
import { Button } from "@/app/(_service)/components/ui/button";
import { Textarea } from "@/app/(_service)/components/ui/textarea";
import { Label } from "@/app/(_service)/components/ui/label";
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
  Upload,
  FileUp,
  Lightbulb,
  Database,
  CheckCircle,
  Info,
  RefreshCw,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import { SectionInfo } from "@/app/(_service)/types/page-types";

interface AdminPageInfoProps {
  slug: string;
}

interface SectionsUploadData {
  sections: ExtendedSection[];
}

interface FileSystemResponse {
  success: boolean;
  message: string;
  filePath?: string;
}

export function AdminPageData({ slug }: AdminPageInfoProps) {
  const { categories, setCategories, loading, initialized, dirty } =
    useNavigationMenu();
  const { handleUpdate, loading: savingCategories } = useMenuOperations();
  const { role } = useRole();
  const router = useRouter();

  const [jsonContent, setJsonContent] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>("");
  const [uploadSuccess, setUploadSuccess] = useState<string>("");

  const uploadInstructions = `Follow these steps to upload your generated JSON file:

1. Copy the generated JSON content from your AI model in format: { "sections": ExtendedSection[] }
2. Paste the JSON content into the text area below
3. Click the "Upload JSON Data" button to process the file
4. The system will validate the JSON structure and save it to the file system
5. File will be saved based on the page href to: app/config/content/sections/[firstPart]/[secondPart].ts
6. Page metadata will be automatically updated with section IDs
7. Click "Save Categories" to persist changes to the server

Make sure the JSON follows the required format: { "sections": ExtendedSection[] }`;

  useEffect(() => {
    if (role !== "admin") {
      router.push("/");
      return;
    }
  }, [role, router]);

  const findPageBySlug = (categories: MenuCategory[], targetSlug: string) => {
    for (const category of categories) {
      const page = category.pages.find((page) => page.linkName === targetSlug);
      if (page) {
        return { page, category };
      }
    }
    return null;
  };

  const getTargetFilePath = (href: string): string => {
    try {
      const cleanHref = href.startsWith('/') ? href.slice(1) : href;
      const parts = cleanHref.split('/').filter(part => part.length > 0);
      
      if (parts.length < 2) {
        return `Invalid href format: ${href}`;
      }
      
      const [firstPart, secondPart] = parts;
      return `app/config/content/sections/${firstPart}/${secondPart}.ts`;
    } catch (error) {
      return `Unable to parse href: ${href}`;
    }
  };

  const validateSectionsData = (data: any): data is SectionsUploadData => {
    if (!data || typeof data !== 'object') {
      throw new Error('Data must be an object');
    }
    
    if (!data.sections || !Array.isArray(data.sections)) {
      throw new Error('Data must contain "sections" array');
    }
    
    for (let i = 0; i < data.sections.length; i++) {
      const section = data.sections[i];
      if (!section || typeof section !== 'object') {
        throw new Error(`Section at index ${i} must be an object`);
      }
      if (!section.id || typeof section.id !== 'string') {
        throw new Error(`Section at index ${i} must have a string "id" property`);
      }
      if (!section.bodyContent || typeof section.bodyContent !== 'object') {
        throw new Error(`Section at index ${i} must have a "bodyContent" object`);
      }
    }
    
    return true;
  };

  const validateHrefFormat = (href: string): void => {
    const hrefRegex = /^\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/;
    if (!hrefRegex.test(href)) {
      throw new Error(`Invalid href format: "${href}". Expected format: "/category/subcategory" with only letters, numbers, hyphens, and underscores`);
    }
  };

  const extractSectionIds = (sections: ExtendedSection[]): SectionInfo[] => {
    const sectionInfos: SectionInfo[] = sections.map(section => ({
      id: section.id,
    }));

    return sectionInfos;
  };

  const updatePageSections = (
    categoryTitle: string,
    pageLinkName: string,
    sectionInfos: SectionInfo[]
  ): void => {
    setCategories(prevCategories => {
      return prevCategories.map(category => {
        if (category.title !== categoryTitle) {
          return category;
        }

        return {
          ...category,
          pages: category.pages.map(page => {
            if (page.linkName !== pageLinkName) {
              return page;
            }

            return {
              ...page,
              sections: sectionInfos,
              updatedAt: new Date().toISOString(),
              isVectorConnected: true,
            };
          })
        };
      });
    });
  };

  const handleJsonUpload = async () => {
    if (!jsonContent.trim()) {
      toast.error("Please paste your JSON content before uploading.");
      return;
    }

    setIsUploading(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      const pageResult = findPageBySlug(categories, slug);
      if (!pageResult) {
        throw new Error(`Page with slug "${slug}" not found`);
      }

      const { page, category } = pageResult;
      
      if (!page.href) {
        throw new Error(`Page "${page.linkName}" does not have href property`);
      }
      
      try {
        validateHrefFormat(page.href);
      } catch (error) {
        throw new Error(`Invalid href format: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      let parsedJson;
      try {
        parsedJson = JSON.parse(jsonContent);
      } catch (error) {
        throw new Error(`Invalid JSON format: ${error instanceof Error ? error.message : 'Unknown parsing error'}`);
      }
      
      try {
        validateSectionsData(parsedJson);
      } catch (error) {
        throw new Error(`Invalid sections data: ${error instanceof Error ? error.message : 'Unknown validation error'}`);
      }

      const payload = {
        href: page.href,
        sections: parsedJson.sections,
      };

      const response = await fetch('/api/sections/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      if (responseText.startsWith('<!DOCTYPE') || responseText.startsWith('<html')) {
        throw new Error('Server returned HTML instead of JSON. Check server logs for routing issues.');
      }

      let apiResult: FileSystemResponse;
      try {
        apiResult = JSON.parse(responseText);
      } catch (error) {
        throw new Error(`Failed to parse API response: ${responseText.substring(0, 100)}...`);
      }

      if (!response.ok) {
        throw new Error(apiResult.message || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      if (!apiResult.success) {
        throw new Error(apiResult.message || 'Upload failed');
      }

      try {
        const sectionInfos = extractSectionIds(parsedJson.sections);
        updatePageSections(category.title, page.linkName, sectionInfos);
      } catch (metadataError) {
        toast.error(`Upload successful, but failed to update page metadata: ${metadataError instanceof Error ? metadataError.message : 'Unknown error'}`);
      }

      const successMessage = `JSON data uploaded successfully! File saved to: ${apiResult.filePath}. Page metadata updated with ${parsedJson.sections.length} section(s).`;
      setUploadSuccess(successMessage);
      toast.success("Upload completed successfully!");

      setJsonContent("");
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Invalid JSON format or upload failed";
      setUploadError(errorMessage);
      toast.error(`Upload failed: ${errorMessage}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveCategories = async () => {
    try {
      const success = await handleUpdate();
      
      if (success) {
        toast.success("Categories saved successfully!");
        setUploadSuccess("");
        setUploadError("");
      }
    } catch (error) {
      toast.error('Failed to save categories');
    }
  };

  const getRefreshIconColor = (page: any): string => {
    if (!page.sections || page.sections.length === 0) {
      return "text-gray-400";
    }
    
    if (dirty) {
      return "text-orange-500";
    }
    
    return "text-green-600";
  };

  if (role !== "admin") {
    return (
      <div className="flex bg-background items-center justify-center py-12">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-destructive mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Access Denied
          </h3>
          <p className="text-muted-foreground mb-4">
            You don't have permission to access this admin page
          </p>
          <p className="text-sm text-muted-foreground mb-2">
            Required role:{" "}
            <span className="font-mono bg-muted px-2 py-1 rounded">Admin</span>
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Your role:{" "}
            <span className="font-mono bg-muted px-2 py-1 rounded">{role}</span>
          </p>

          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Go to Home Page
          </Button>
        </div>
      </div>
    );
  }

  if (loading || !initialized) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
        <span className="ml-3 text-muted-foreground">Loading sections data...</span>
      </div>
    );
  }

  const pageData = findPageBySlug(categories, slug);

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

  const targetPath = page.href ? getTargetFilePath(page.href) : "Page href is not defined";
  const isValidHref = page.href && /^\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/.test(page.href);

  return (
    <div className="space-y-6">
      <div className="bg-muted/50 border border-border rounded-lg px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-muted-foreground">
            Admin Access - Role:{" "}
            <span className="font-mono text-foreground">{role}</span>
          </span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            Page Information
            {page.sections && page.sections.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {page.sections.length} sections
              </Badge>
            )}
            {dirty && (
              <Badge variant="outline" className="text-xs text-orange-600 border-orange-300">
                Unsaved changes
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
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
              <Badge variant="default" className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Valid
              </Badge>
            )}
          </div>
          <div className="flex items-start gap-2">
            <span className="text-muted-foreground">Target file:</span>
            <code className="bg-muted px-2 py-1 rounded text-xs flex-1">{targetPath}</code>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-muted-foreground">Current sections:</span>
            <div className="flex-1">
              {page.sections && page.sections.length > 0 ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {page.sections.length} sections loaded
                    </Badge>
                    <RefreshCw className={`h-3 w-3 ${getRefreshIconColor(page)}`} />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Status: {!dirty ? 'Saved' : 'Pending save'} | 
                    IDs: {page.sections.slice(0, 3).map(s => s.id).join(", ")}
                    {page.sections.length > 3 && ` ... +${page.sections.length - 3} more`}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    No sections loaded
                  </Badge>
                  <RefreshCw className={`h-3 w-3 ${getRefreshIconColor(page)}`} />
                </div>
              )}
            </div>
          </div>
          
          {page.href && !isValidHref && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 dark:bg-amber-950 dark:border-amber-800">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h5 className="font-medium text-amber-900 dark:text-amber-100 text-sm">
                    Invalid Href Format
                  </h5>
                  <p className="text-amber-800 dark:text-amber-200 text-xs mt-1">
                    Href must be in format "/category/subcategory" with only letters, numbers, hyphens, and underscores.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <FileUp className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">
              Upload Generated JSON Data
            </CardTitle>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Database className="h-3 w-3" />
              Sections Data
            </Badge>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="leading-relaxed">
              Upload your AI-generated JSON file to update the page content and
              configuration. The JSON will be validated and saved to the file system,
              and the page metadata will be automatically updated with section IDs.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-950 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm">
                    Upload Instructions:
                  </h4>
                </div>
                <div className="text-blue-800 dark:text-blue-200 text-xs space-y-1 whitespace-pre-line">
                  {uploadInstructions}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 dark:bg-gray-950 dark:border-gray-800">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-gray-600 dark:text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 text-xs">
                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  API Information:
                </h5>
                <div className="text-gray-700 dark:text-gray-300 space-y-1">
                  <p>Endpoint: <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">/api/admin/sections/upload</code></p>
                  <p>Method: POST</p>
                  <p>Payload: <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">{"{ href: string, sections: ExtendedSection[] }"}</code></p>
                  <p>Target: <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">{targetPath}</code></p>
                  <p>Metadata Update: <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">page.sections</code> will be updated with section IDs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="json-content" className="text-sm font-medium">
              Paste Generated JSON Content
            </Label>

            <Textarea
              id="json-content"
              placeholder={`Paste your generated JSON content here, for example:
{
  "sections": [
    {
      "id": "hero-section",
      "order": "1",
      "bodyContent": {
        "type": "TypographyH1",
        "props": {
          "children": "# Your Page Title"
        }
      }
    }
  ]
}`}
              value={jsonContent}
              onChange={(e) => {
                setJsonContent(e.target.value);
                setUploadError("");
                setUploadSuccess("");
              }}
              className="min-h-[200px] resize-y font-mono text-sm"
              disabled={!isValidHref || dirty}
            />

            {!isValidHref && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 dark:bg-red-950 dark:border-red-800">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-red-900 dark:text-red-100 text-sm">
                      Cannot Upload:
                    </h5>
                    <p className="text-red-800 dark:text-red-200 text-xs mt-1">
                      Page href is not defined or has invalid format. Upload is disabled until href is corrected.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {dirty && isValidHref && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 dark:bg-orange-950 dark:border-orange-800">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-orange-900 dark:text-orange-100 text-sm">
                      Unsaved Changes:
                    </h5>
                    <p className="text-orange-800 dark:text-orange-200 text-xs mt-1">
                      You have unsaved changes to categories. Please save them first before uploading new JSON data.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {uploadSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 dark:bg-green-950 dark:border-green-800">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h5 className="font-medium text-green-900 dark:text-green-100 text-sm">
                      Upload Successful:
                    </h5>
                    <p className="text-green-800 dark:text-green-200 text-xs mt-1">
                      {uploadSuccess}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {uploadError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 dark:bg-red-950 dark:border-red-800">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-red-900 dark:text-red-100 text-sm">
                      Upload Error:
                    </h5>
                    <p className="text-red-800 dark:text-red-200 text-xs mt-1">
                      {uploadError}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              {!dirty ? (
                <>
                  <Button
                    onClick={handleJsonUpload}
                    disabled={isUploading || !jsonContent.trim() || !isValidHref}
                    className="flex items-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <LoadingSpinner className="h-4 w-4" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Upload JSON Data
                      </>
                    )}
                  </Button>

                  {jsonContent.trim() && (
                    <span className="text-xs text-muted-foreground">
                      {jsonContent.length} characters ready for upload
                    </span>
                  )}
                </>
              ) : (
                <>
                  <Button
                    onClick={handleSaveCategories}
                    disabled={savingCategories}
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    {savingCategories ? (
                      <>
                        <LoadingSpinner className="h-4 w-4" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Categories
                      </>
                    )}
                  </Button>

                  <span className="text-xs text-orange-600">
                    You have unsaved changes to the page metadata
                  </span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
