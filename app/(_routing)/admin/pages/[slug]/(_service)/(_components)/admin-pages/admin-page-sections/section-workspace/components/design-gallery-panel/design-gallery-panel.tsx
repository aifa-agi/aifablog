
// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/section-workspace/components/design-gallery-panel/design-gallery-panel.tsx

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/app/(_service)/components/ui/button";
import { X } from "lucide-react";

interface DesignGalleryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TemplateCardProps {
  number: number;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ number }) => (
  <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
    <div 
      className="w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground font-semibold text-lg"
      style={{ aspectRatio: '4/3' }}
    >
      <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center text-primary font-bold">
        {number}
      </div>
    </div>
  </div>
);

export const DesignGalleryPanel: React.FC<DesignGalleryPanelProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '40%', opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          className="bg-background border-l border-border overflow-hidden"
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <h4 className="font-semibold text-foreground">Design Gallery</h4>
                <p className="text-xs text-muted-foreground">Choose a template design</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Template Grid */}
            <div className="flex-1 p-4">
              <div 
                className="grid grid-cols-2 gap-3 overflow-y-auto custom-scrollbar"
                style={{ maxHeight: 'calc(100vh - 300px)' }}
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <TemplateCard key={i + 1} number={i + 1} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
