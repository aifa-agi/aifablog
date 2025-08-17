
// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/section-workspace/components/design-gallery-panel/design-gallery-panel.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DesignGalleryPanelProps {
  isOpen: boolean;
  containerHeight?: number;
  selectedTemplateId?: number | null;
  onSelectTemplate?: (templateNumber: number) => void;
  onClose?: () => void;
}

interface TemplateCardProps {
  number: number;
  isSelected?: boolean;
  onClick?: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ 
  number, 
  isSelected = false, 
  onClick 
}) => (
  <div
    className={`
      bg-card border rounded-lg p-3 hover:shadow-md transition-all duration-200 cursor-pointer 
      flex flex-col items-center justify-center
      ${isSelected 
        ? "border-blue-500 ring-2 ring-blue-200 shadow-lg bg-blue-50 dark:bg-blue-950/50 dark:border-blue-400" 
        : "border-border hover:border-primary/20"
      }
    `}
    onClick={onClick}
    style={{
      minWidth: '110px',
      aspectRatio: '4/3'
    }}
  >
    <div className="flex-1 flex items-center justify-center">
      <div className={`
        w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm
        ${isSelected 
          ? "border-blue-500 text-blue-600 dark:text-blue-400" 
          : "border-primary text-primary"
        }
      `}>
        {number}
      </div>
    </div>
    <div className={`
      mt-2 text-xs text-center whitespace-nowrap
      ${isSelected 
        ? "text-blue-600 dark:text-blue-400 font-medium" 
        : "text-muted-foreground"
      }
    `}>
      Template {number}
      {isSelected && (
        <div className="text-xs text-blue-500 dark:text-blue-300">Selected</div>
      )}
    </div>
  </div>
);

export const DesignGalleryPanel: React.FC<DesignGalleryPanelProps> = ({
  isOpen,
  containerHeight = 500,
  selectedTemplateId,
  onSelectTemplate,
  onClose
}) => {
  const minHeight = Math.max(containerHeight, 400);

  const handleTemplateSelect = (templateNumber: number) => {
    if (onSelectTemplate) {
      // Если уже выбран этот шаблон, то отменяем выбор
      if (selectedTemplateId === templateNumber) {
        onSelectTemplate(0); // 0 означает сброс выбора
      } else {
        onSelectTemplate(templateNumber);
      }
    }
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
          {/* Header */}
          <div className="p-4 pr-0 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-10">
            <div>
              <h4 className="font-semibold text-foreground">Design Gallery</h4>
              <p className="text-xs text-muted-foreground">
                {selectedTemplateId 
                  ? `Template ${selectedTemplateId} selected - click to deselect or choose another`
                  : "Choose a template design for new sections"
                }
              </p>
            </div>
          </div>

          {/* Adaptive Template Grid */}
          <div className="flex-1 p-4 pr-1 overflow-y-auto">
            <div
              className="grid gap-3 auto-fill"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                minHeight: `${minHeight - 80}px`
              }}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <TemplateCard
                  key={i + 1}
                  number={i + 1}
                  isSelected={selectedTemplateId === i + 1}
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