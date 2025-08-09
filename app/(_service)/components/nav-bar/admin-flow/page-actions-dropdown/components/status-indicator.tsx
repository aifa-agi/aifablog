// @/app/(_service)/components/nav-bar/admin-flow/page-actions-dropdown/components/status-indicator.tsx

import { cn } from "@/app/(_service)/lib/utils";

interface StatusIndicatorProps {
  isActive: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function StatusIndicator({ 
  isActive, 
  size = "sm", 
  className 
}: StatusIndicatorProps) {
  const sizeConfig = {
    sm: { width: 8, height: 8, minWidth: 8, minHeight: 8 },
    md: { width: 12, height: 12, minWidth: 12, minHeight: 12 },
  };

  const dimensions = sizeConfig[size];

  return (
    <span
      className={cn(
        "inline-block mr-3 align-middle rounded-full border",
        size === "sm" ? "border-black/20" : "border-black/30",
        isActive ? "bg-green-500" : "bg-gray-400",
        size === "md" && !isActive && "bg-muted-foreground",
        className
      )}
      style={dimensions}
    />
  );
}
