"use client";

import React from "react";
import { cn } from "../../lib/utils";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
  isFirstItem?: boolean;
  showSeparator?: boolean;
}

export function Wrapper({ 
  children, 
  className,
  isFirstItem = false,
  showSeparator = false,
  ...props 
}: WrapperProps) {
  return (
    <div 
      className={cn(
        "wrapper-container",
        showSeparator && "border-t border-muted pt-8 mt-8",
        isFirstItem && "header-section",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
