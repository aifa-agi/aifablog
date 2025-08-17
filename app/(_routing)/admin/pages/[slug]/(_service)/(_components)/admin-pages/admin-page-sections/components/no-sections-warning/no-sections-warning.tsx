
// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/components/no-sections-warning/no-sections-warning.tsx

import { Button } from "@/app/(_service)/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export const NoSectionsWarning: React.FC = () => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 dark:bg-amber-950 dark:border-amber-800">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-medium text-amber-900 dark:text-amber-100 text-lg mb-2">
            No Sections Available
          </h4>
          <p className="text-amber-800 dark:text-amber-200 text-sm mb-4">
            Please pre-upload data objects on the Data tab or configure content generation agents on the N8N tab.
          </p>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-100"
              onClick={() => toast.info("Navigate to Data tab to upload content")}
            >
              Go to Data Tab
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-100"
              onClick={() => toast.info("Navigate to N8N tab to configure agents")}
            >
              Configure N8N
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
