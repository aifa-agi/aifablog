// @/app/admin/pages/[slug]/page.tsx

import { Suspense } from "react";
import { LoadingSpinner } from "@/app/(_service)/components/ui/loading-spinner";
import { AdminPagesNavBarProvider } from "./(_service)/(_components)/(_context)/admin-pages-nav-context";
import { AdminPageContent } from "./(_service)/(_components)/admin-page-content";
import AdminPagesNavBar from "./(_service)/(_components)/admin-page-nav-bar";

interface AdminPageDetailsProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Server component that extracts slug from route parameters
 * and passes it to the client component for data processing
 */
export default async function AdminPageDetails({
  params,
}: AdminPageDetailsProps) {
  // Await params before accessing its properties (Next.js 15 requirement)
  const { slug } = await params;

  return (
    <AdminPagesNavBarProvider slug={slug}>
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="bg-secondary rounded-lg shadow-sm border p-6">
          <div className="flex flex-row justify-between items-start gap-3">
            <div className="mb-6 pb-4 border-b">
              <h1 className="text-2xl font-bold mb-2">Page Administration</h1>
              <p className="text-muted-foreground">
                Managing page content and settings
              </p>
            </div>

            <AdminPagesNavBar />
          </div>

          <Suspense fallback={<LoadingSpinner />}>
            <AdminPageContent />
          </Suspense>
        </div>
      </div>
    </AdminPagesNavBarProvider>
  );
}

/**
 * Generate metadata for the page based on slug
 */
export async function generateMetadata({ params }: AdminPageDetailsProps) {
  // Also await params in generateMetadata
  const { slug } = await params;

  return {
    title: `Admin: ${slug}`,
    description: `Administrating page ${slug}`,
  };
}
