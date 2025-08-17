
// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/section-workspace/components/workspace-layout/workspace-layout.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { WorkspaceLayoutProps } from "../../types";

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({
  isGalleryOpen,
  children,
  galleryContent
}) => {
  return (
    <div className="flex h-full min-h-[500px] relative">
      {/* Main Content Area */}
      <motion.div
        animate={{
          width: isGalleryOpen ? '60%' : '100%'
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        className="flex-shrink-0 pr-4"
      >
        {children}
      </motion.div>

      {/* Gallery Panel */}
      {galleryContent}
    </div>
  );
};
