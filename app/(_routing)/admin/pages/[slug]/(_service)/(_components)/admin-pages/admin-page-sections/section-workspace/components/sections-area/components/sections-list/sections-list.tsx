// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/section-workspace/components/sections-area/components/sections-list/sections-list.tsx

"use client";

import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { motion, AnimatePresence } from "framer-motion";
import { ExtendedSection } from "@/app/(_service)/types/section-types";
import { WorkflowSection } from "../../../../types";
import { transformFromWorkflowSections } from "../../../../utils";
import { useSectionManagement, UseSectionManagementReturn } from "../../../../hooks/use-section-management";
import { SectionCard } from "../section-card/section-card";
import { GroupingControls } from "../grouping-controls";

export interface SectionsListProps {
  sections: ExtendedSection[];
  onSectionReorder?: (sections: ExtendedSection[]) => void;
  onSectionEdit?: (sectionId: string) => void;
  onSectionPreview?: (sectionId: string) => void;
  sectionManagement?: UseSectionManagementReturn;
}

export const SectionsList: React.FC<SectionsListProps> = ({
  sections,
  onSectionReorder,
  onSectionEdit,
  onSectionPreview,
  sectionManagement: externalManagement
}) => {
  const localManagement = useSectionManagement(sections);
  const sectionManagement = externalManagement || localManagement;

  const {
    workflowSections,
    selection,
    hasSelectedSections,
    selectedCount,
    canGroup,
    updateSelection,
    clearSelection,
    selectAll,
    reorderSections,
    createGroup,
    ungroupSections,
  } = sectionManagement;

  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedSection, setDraggedSection] = useState<WorkflowSection | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    const section = workflowSections.find((s: WorkflowSection) => s.id === event.active.id);
    setDraggedSection(section || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = workflowSections.findIndex((s: WorkflowSection) => s.id === active.id);
      const newIndex = workflowSections.findIndex((s: WorkflowSection) => s.id === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newSections = arrayMove<WorkflowSection>(workflowSections, oldIndex, newIndex);
        reorderSections(newSections);

        if (onSectionReorder) {
          const extendedSections = transformFromWorkflowSections(newSections);
          onSectionReorder(extendedSections);
        }
      }
    }

    setActiveId(null);
    setDraggedSection(null);
  };

  const handleSectionSelection = (sectionId: string, isSelected: boolean) => {
    updateSelection(sectionId, isSelected);
  };

  const handleCreateGroup = () => {
    const selectedIds = Array.from(selection.selectedSections);
    createGroup(selectedIds);
  };

  const handleSelectAll = () => {
    const allIds = workflowSections.map((s: WorkflowSection) => s.id);
    selectAll(allIds);
  };

  const isAllSelected = selection.selectedSections.size === workflowSections.length;

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {hasSelectedSections && (
          <GroupingControls
            selectedCount={selectedCount}
            canGroup={canGroup}
            onGroup={handleCreateGroup}
            onClearSelection={clearSelection}
            onSelectAll={handleSelectAll}
            totalSections={workflowSections.length}
            isAllSelected={isAllSelected}
          />
        )}
      </AnimatePresence>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={workflowSections.map((s: WorkflowSection) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {workflowSections.map((section: WorkflowSection) => (
                <motion.div
                  key={section.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <SectionCard
                    section={section}
                    isSelected={selection.selectedSections.has(section.id)}
                    isGrouped={section.isGrouped}
                    isDragging={activeId === section.id}
                    onSelectionToggle={handleSectionSelection}
                    onEdit={onSectionEdit}
                    onPreview={onSectionPreview}
                    onGroup={createGroup}
                    onUngroup={ungroupSections}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>

        <DragOverlay>
          {draggedSection && (
            <div className="opacity-80 rotate-3 scale-105">
              <SectionCard
                section={draggedSection}
                isSelected={false}
                isGrouped={draggedSection.isGrouped}
                isDragging={true}
                onSelectionToggle={() => {}}
                onEdit={() => {}}
                onPreview={() => {}}
                onGroup={() => {}}
                onUngroup={() => {}}
              />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
