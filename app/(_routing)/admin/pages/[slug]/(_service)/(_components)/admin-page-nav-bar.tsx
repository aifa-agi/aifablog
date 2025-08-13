// @/app/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-page-nav-bar.tsx

"use client";

import { Button } from "@/app/(_service)/components/ui/button";
import {
  AdminPageTab,
  useAdminPagesNav,
} from "../(_context)/admin-pages-nav-context";

/**
 * Navigation component for admin page tabs with horizontal scroll
 * Uses context to manage active tab state
 * Implements custom scrollbar that appears only when content overflows
 */
export default function AdminPagesNavBar() {
  const { activeTab, setActiveTab } = useAdminPagesNav();

  // Определяем конфигурацию кнопок
  const tabs: { key: AdminPageTab; label: string }[] = [
    { key: "info", label: "Info" },
    { key: "prompt", label: "Prompt" },
    { key: "data", label: "Data" },
    { key: "n8n", label: "N8N" },
    { key: "sections", label: "Sections" },
    { key: "preview", label: "Preview" },
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Горизонтальный скроллируемый контейнер с кастомным скроллбаром */}
      <div className="overflow-x-auto custom-scrollbar">
        <div className="flex justify-end  flex-row gap-1 min-w-max pb-2">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "outline"}
              onClick={() => setActiveTab(tab.key)}
              className={`
                whitespace-nowrap flex-shrink-0
                ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
              `}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
