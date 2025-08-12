// @/app/admin/pages/[slug]/(_service)/(_components)/admin-page-content.tsx

"use client";

import { useAdminPagesNav } from "../(_context)/admin-pages-nav-context";
import { AdminPageInfo } from "./admin-pages/admin-page-info";
import { AdminPagePrompt } from "./admin-pages/admin-page-prompt";
import { AdminPageData } from "./admin-pages/admin-page-data";


export function AdminPageContent() {
  const { activeTab, slug } = useAdminPagesNav();

  switch (activeTab) {
    case "info":
      return <AdminPageInfo slug={slug} />;
    case "prompt":
      return <AdminPagePrompt slug={slug} />;
    case "data":
      return <AdminPageData slug={slug} />;
    default:
      return <AdminPageInfo slug={slug} />;
  }
}
