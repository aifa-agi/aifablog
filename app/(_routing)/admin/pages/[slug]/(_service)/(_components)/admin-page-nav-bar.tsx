// @/app/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-page-nav-bar.tsx

"use client";

import { Button } from "@/app/(_service)/components/ui/button";
import {
  AdminPageTab,
  useAdminPagesNav,
} from "../(_context)/admin-pages-nav-context";

/**
 * Navigation component for admin page tabs
 * Uses context to manage active tab state
 */
export default function AdminPagesNavBar() {
  const { activeTab, setActiveTab } = useAdminPagesNav();

  // Определяем конфигурацию кнопок
  const tabs: { key: AdminPageTab; label: string }[] = [
    { key: "info", label: "Info" },
    { key: "prompt", label: "Prompt" },
    { key: "data", label: "Data" },
    { key: "n8n", label: "N8N" },
  ];

  return (
    <div className="flex flex-row justify-between items-start gap-1">
      {tabs.map((tab) => (
        <Button
          key={tab.key}
          variant={activeTab === tab.key ? "default" : "outline"}
          onClick={() => setActiveTab(tab.key)}
          className={
            activeTab === tab.key ? "bg-primary text-primary-foreground" : ""
          }
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
