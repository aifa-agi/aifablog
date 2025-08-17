// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/section-workspace/components/sections-area/components/add-new-section/add-new-section.tsx

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/app/(_service)/components/ui/button";
import { Badge } from "@/app/(_service)/components/ui/badge";
import { Card, CardContent } from "@/app/(_service)/components/ui/card";
import { Plus, Sparkles } from "lucide-react";

export interface AddNewSectionProps {
  selectedTemplateId: number;
  onAdd: () => void;
  onClose: () => void;
}

export const AddNewSection: React.FC<AddNewSectionProps> = ({
  selectedTemplateId,
  onAdd,
  onClose
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="sticky top-0 z-10 mb-4"
    >
      <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            {/* Template Info */}
            <div className="flex items-center gap-3">
              <Badge 
                variant="secondary" 
                className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              >
                <Sparkles className="h-3 w-3" />
                Template {selectedTemplateId} selected
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={onAdd}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4" />
                Add New Section
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
                title="Cancel"
              >
                ✕
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-xs text-muted-foreground"
          >
            Create a new section using Template {selectedTemplateId} design
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
