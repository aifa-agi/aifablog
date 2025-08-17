// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/section-workspace/components/sections-area/components/sections-list/components/grouping-controls/grouping-controls.tsx

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/app/(_service)/components/ui/button";
import { Badge } from "@/app/(_service)/components/ui/badge";
import { Card, CardContent } from "@/app/(_service)/components/ui/card";
import {
  Link2,
  X,
  Palette,
  Users,
} from "lucide-react";

export interface GroupingControlsProps {
  selectedCount: number;
  canGroup: boolean;
  onGroup: () => void;
  onClearSelection: () => void;
  onSelectAll: () => void;
  onOpenDesignGallery?: () => void;
  totalSections: number;
  isAllSelected: boolean;
}

export const GroupingControls: React.FC<GroupingControlsProps> = ({
  selectedCount,
  canGroup,
  onGroup,
  onClearSelection,
  onOpenDesignGallery,
}) => {
  if (selectedCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="sticky top-0 z-10 mb-4"
      >
        <Card className="bg-gray-400 dark:bg-gray-800 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              {/* Selection Info */}
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {selectedCount} selected
                </Badge>

                {canGroup && (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Can group
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Group Action */}
                <Button
                  variant="default"
                  size="sm"
                  onClick={onGroup}
                  disabled={!canGroup}
                  className="flex items-center gap-2"
                >
                  <Link2 className="h-4 w-4" />
                  Group ({selectedCount})
                </Button>

                {/* Design Gallery (future feature) */}
                {onOpenDesignGallery && canGroup && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onOpenDesignGallery}
                    className="flex items-center gap-2"
                  >
                    <Palette className="h-4 w-4" />
                    Apply Design
                  </Button>
                )}

                {/* Clear Selection */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearSelection}
                  className="h-8 w-8 p-0"
                  title="Clear selection"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Help Text */}
            {selectedCount === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-xs text-muted-foreground"
              >
                Select at least one more section to create a group
              </motion.div>
            )}

            {canGroup && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-xs text-muted-foreground"
              >
                Selected sections will be grouped and can be processed with AI design templates
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};
