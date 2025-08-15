
// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/components/sections-placeholder/sections-placeholder.tsx


import { Database } from "lucide-react";

export const SectionsPlaceholder: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground text-center py-8">
        <Database className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
        <p>Section management interface will appear here</p>
        <p className="text-xs mt-1">Drag & drop, grouping, and design tools coming soon</p>
      </div>
    </div>
  );
};
