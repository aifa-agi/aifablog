"use client";

import React, { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/app/(_service)/components/ui/card";
import { Badge } from "@/app/(_service)/components/ui/badge";
import { Button } from "@/app/(_service)/components/ui/button";
import { Checkbox } from "@/app/(_service)/components/ui/checkbox";
import {
  GripVertical,
  Eye,
  Edit,
  MoreVertical,
  Link2,
  Unlink,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/app/(_service)/components/ui/dropdown-menu";
import { WorkflowSection } from "../../../../types";
import { getContentPreview } from "./utils/get-content";

export interface SectionCardProps {
  section: WorkflowSection;
  isSelected: boolean;
  isGrouped: boolean;
  groupState?: "current" | "temporary" | "processing" | "resolved";
  isProcessing?: boolean;
  isDragging?: boolean;
  onSelectionToggle: (sectionId: string, isSelected: boolean) => void;
  onEdit?: (sectionId: string) => void;
  onPreview?: (sectionId: string) => void;
  onGroup?: (sectionIds: string[]) => void;
  onUngroup?: (groupId: string) => void;
}

export const SectionCard: React.FC<SectionCardProps> = memo(
  ({
    section,
    isSelected,
    isGrouped,
    groupState,
    isProcessing = false,
    isDragging = false,
    onSelectionToggle,
    onEdit,
    onPreview,
    onGroup,
    onUngroup,
  }) => {
    // Sortable hook for drag and drop
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging: isSortableDragging,
    } = useSortable({ id: section.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    // Определяем состояние перетаскивания
    const isCurrentlyDragging = isDragging || isSortableDragging;

    const handleSelectionChange = (checked: boolean) => {
      onSelectionToggle(section.id, checked);
    };

    const handleEdit = () => {
      onEdit?.(section.id);
    };

    const handlePreview = () => {
      onPreview?.(section.id);
    };

    const handleGroup = () => {
      onGroup?.([section.id]);
    };

    const handleUngroup = () => {
      if (section.groupId) {
        onUngroup?.(section.groupId);
      }
    };

    console.log('section from section-card.tsx', section)

    const getSectionTypeColor = (type: string): string => {
      const colorMap: Record<string, string> = {
        Section: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        SimpleSection: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        StepSection: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
        TypographySection: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      };
      return colorMap[type] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    };

    const getGroupStateColor = (state?: string): string => {
      const colorMap: Record<string, string> = {
        current: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        temporary: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        processing: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
        resolved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      };
      return colorMap[state || ""] || "";
    };

    return (
      <motion.div
        ref={setNodeRef}
        style={style}
        whileHover={{ scale: isCurrentlyDragging ? 1 : 1.02 }}
        className={`
          transition-all duration-200 
          ${isCurrentlyDragging 
            ? "bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-1 shadow-lg rotate-2 z-50 opacity-100" 
            : ""
          }
        `}
      >
        <Card
          className={`
            relative overflow-hidden transition-all duration-200
            ${isSelected ? "ring-2 ring-primary" : ""}
            ${isGrouped ? "border-l-4 border-l-primary" : ""}
            ${isCurrentlyDragging 
              ? "shadow-2xl opacity-100" 
              : isProcessing 
                ? "opacity-75" 
                : ""
            }
          `}
        >
          {/* Processing Overlay - скрываем при перетаскивании */}
          {isProcessing && !isCurrentlyDragging && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
              <div className="flex items-center gap-2 text-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </div>
            </div>
          )}

          <CardContent className={`p-4 ${isCurrentlyDragging ? "opacity-100" : ""}`}>
            <div className="flex items-start gap-3">
              {/* First Column - Only Checkbox */}
              <div className="flex items-center pt-6">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={handleSelectionChange}
                  disabled={isProcessing}
                />
              </div>

              {/* Second Column - Section Content */}
              <div className="flex-1 min-w-0">
                {/* Header with badges */}
                <div className="flex items-center gap-2 mb-0">
                  <Badge
                    variant="secondary"
                    className={`text-xs ${getSectionTypeColor(section.sectionType)}`}
                  >
                    {section.sectionType}
                  </Badge>

                  <Badge variant="outline" className="text-xs font-mono">
                    {section.designId}
                  </Badge>

                  {isGrouped && groupState && (
                    <Badge
                      variant="secondary"
                      className={`text-xs ${getGroupStateColor(groupState)}`}
                    >
                      {groupState}
                    </Badge>
                  )}

                  {section.isDirty && (
                    <Badge variant="outline" className="text-xs text-orange-600">
                      Modified
                    </Badge>
                  )}

                  {/* Показываем индикатор перетаскивания */}
                  {isCurrentlyDragging && (
                    <Badge variant="outline" className="text-xs text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/50">
                      Dragging...
                    </Badge>
                  )}
                </div>

                {/* Content Preview */}
                <div className="text-sm text-muted-foreground mb-2 line-clamp-1">
                  {getContentPreview(section.extendedSection)}
                </div>

                {/* Section Info */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Order: {section.originalOrder}</span>
                  <span>ID: {section.id.substring(0, 8)}...</span>
                </div>
              </div>

              {/* Third Column - Only DropDown and Drag Handle aligned with checkbox */}
              <div className="flex items-center gap-1 pt-4">
                {/* More Actions Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={isProcessing || isCurrentlyDragging}
                      className="h-8 w-8 p-0"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {!isGrouped ? (
                      <DropdownMenuItem onClick={handleGroup}>
                        <Link2 className="h-4 w-4 mr-2" />
                        Group with others
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={handleUngroup}>
                        <Unlink className="h-4 w-4 mr-2" />
                        Ungroup
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleEdit}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handlePreview}>
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Drag Handle */}
                <div
                  {...attributes}
                  {...listeners}
                  className={`
                    cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded transition-all duration-200
                    ${isCurrentlyDragging ? "bg-amber-100 dark:bg-amber-900/50" : ""}
                  `}
                >
                  <GripVertical className={`
                    h-4 w-4 transition-colors duration-200
                    ${isCurrentlyDragging ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"}
                  `} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);

SectionCard.displayName = "SectionCard";
