
// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/section-workspace/components/design-gallery-panel/design-gallery-panel.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DesignGalleryPanelProps {
  isOpen: boolean;
  onClose: () => void; // Keep for compatibility but not used in UI
  containerHeight?: number;
}

interface TemplateCardProps {
  number: number;
  onClick?: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ number, onClick }) => (
  <div
    className="bg-card border border-border rounded-lg p-3 hover:shadow-md hover:border-primary/20 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center"
    onClick={onClick}
    style={{ 
      minWidth: '110px',
      aspectRatio: '4/3'
    }}
  >
    <div className="flex-1 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center text-primary font-bold text-sm">
        {number}
      </div>
    </div>
    <div className="mt-2 text-xs text-center text-muted-foreground whitespace-nowrap">
      Template {number}
    </div>
  </div>
);

export const DesignGalleryPanel: React.FC<DesignGalleryPanelProps> = ({
  isOpen,
  containerHeight = 500
}) => {
  const minHeight = Math.max(containerHeight, 400);

  const handleTemplateSelect = (templateNumber: number) => {
    console.log(`Template ${templateNumber} selected`);
    // TODO: Implement template selection logic
  };

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
          className="bg-background border-l border-border overflow-hidden flex flex-col"
          style={{ minHeight: `${minHeight}px` }}
        >
          {/* Header - removed close button */}
          <div className="p-4 pr-0 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-10">
            <div>
              <h4 className="font-semibold text-foreground">Design Gallery</h4>
              <p className="text-xs text-muted-foreground">Choose a template design for selected sections</p>
            </div>
          </div>

          {/* Adaptive Template Grid */}
          <div className="flex-1 p-4 pr-0 overflow-y-auto">
            <div
              className="grid gap-3 auto-fill"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                minHeight: `${minHeight - 80}px` // Subtract header height
              }}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <TemplateCard
                  key={i + 1}
                  number={i + 1}
                  onClick={() => handleTemplateSelect(i + 1)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
