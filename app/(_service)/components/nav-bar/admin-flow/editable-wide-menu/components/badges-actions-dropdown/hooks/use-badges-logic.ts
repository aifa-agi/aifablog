// @/app/(_service)/components/nav-bar/admin-flow/editable-wide-menu/page-section/badges-actions-dropdown/hooks/use-badges-logic.ts

import { useCallback } from "react";
import { MenuCategory } from "@/app/(_service)/types/menu-types";
import { PageData } from "@/app/(_service)/types/page-types";
import { UserRole } from "@/app/config/user-roles";
import { BadgeName } from "@/app/config/badge-config";
import { normalizeText } from "@/app/(_service)/lib/normalize-text";
import { useDialogs } from "@/app/(_service)/contexts/dialogs";

interface UseBadgesLogicProps {
  singlePage: PageData;
  categoryTitle: string;
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
}

interface UseBadgesLogicReturn {
  handleToggleRole: (role: UserRole) => void;
  handleToggleBadge: (badge: BadgeName) => void;
  handleRename: () => void;
  handleDelete: () => void;
}

/**
 * Custom hook to handle badges and roles management logic
 */
export function useBadgesLogic({
  singlePage,
  categoryTitle,
  setCategories,
}: UseBadgesLogicProps): UseBadgesLogicReturn {
  const dialogs = useDialogs();

  const handleToggleRole = useCallback((role: UserRole) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.title !== categoryTitle
          ? cat
          : {
              ...cat,
              pages: cat.pages.map((l) =>
                l.id !== singlePage.id
                  ? l
                  : {
                      ...l,
                      roles: l.roles.includes(role)
                        ? l.roles.filter((r) => r !== role)
                        : [...l.roles, role],
                    }
              ),
            }
      )
    );
  }, [singlePage.id, categoryTitle, setCategories]);

  const handleToggleBadge = useCallback((badge: BadgeName) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.title !== categoryTitle
          ? cat
          : {
              ...cat,
              pages: cat.pages.map((l) =>
                l.id !== singlePage.id
                  ? l
                  : {
                      ...l,
                      hasBadge: l.hasBadge && l.badgeName === badge ? false : true,
                      badgeName: l.hasBadge && l.badgeName === badge ? undefined : badge,
                    }
              ),
            }
      )
    );
  }, [singlePage.id, categoryTitle, setCategories]);

  const handleRename = useCallback(() => {
    dialogs.show({
      type: "edit",
      inputType: "input",
      title: "Rename link name",
      description: singlePage.linkName,
      value: singlePage.linkName,
      placeholder: "Enter new link name...",
      confirmLabel: "Save changes",
      cancelLabel: "Cancel",
      onConfirm: (value) => {
        if (!value?.trim()) return;
        const normalizedName = normalizeText(value);
        setCategories((prev) => {
          return prev.map((cat) =>
            cat.title !== categoryTitle
              ? cat
              : {
                  ...cat,
                  pages: cat.pages.map((l) =>
                    l.id === singlePage.id
                      ? {
                          ...l,
                          linkName: normalizedName,
                          href: "/" + normalizedName,
                        }
                      : l
                  ),
                }
          );
        });
      },
      onCancel: () => {
        
      }
    });
  }, [singlePage.id, singlePage.linkName, categoryTitle, setCategories, dialogs]);

  const handleDelete = useCallback(() => {
    dialogs.show({
      type: "delete",
      title: "Delete page",
      description: `Are you sure you want to delete page "${singlePage.linkName}"? This action cannot be undone.`,
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
      onConfirm: () => {
        setCategories((prev) =>
          prev.map((cat) =>
            cat.title !== categoryTitle
              ? cat
              : {
                  ...cat,
                  pages: cat.pages.filter((l) => l.id !== singlePage.id),
                }
          )
        );
      },
      onCancel: () => {
        // Действие при отмене (опционально)
      }
    });
  }, [singlePage.id, singlePage.linkName, categoryTitle, setCategories, dialogs]);

  return {
    handleToggleRole,
    handleToggleBadge,
    handleRename,
    handleDelete,
  };
}
