"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRole, BadgeName, MenuLink, MenuCategory } from "@/types/menu-types";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDialogs } from "@/app/contexts/dialogs-providers";

interface LinkActionsDropdownProps {
  link: MenuLink;
  categoryTitle: string;
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
}

const ALL_ROLES: UserRole[] = [
  "guest",
  "architect",
  "admin",
  "editor",
  "authUser",
  "subscriber",
  "customer",
  "apiUser",
];

const ALL_BADGES: BadgeName[] = [
  "NEW",
  "AD",
  "UPDATED",
  "IMPORTANT",
  "RECOMMENDATION",
];

export function LinkActionsDropdown({
  link,
  categoryTitle,
  setCategories,
}: LinkActionsDropdownProps) {
  const dialogs = useDialogs();

  const handleToggleRole = (role: UserRole) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.title !== categoryTitle
          ? cat
          : {
              ...cat,
              links: cat.links.map((l) =>
                l.name !== link.name
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
  };

  const handleToggleBadge = (badge: BadgeName) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.title !== categoryTitle
          ? cat
          : {
              ...cat,
              links: cat.links.map((l) =>
                l.name !== link.name
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
  };

  const isRoleActive = (role: UserRole) => link.roles?.includes(role);
  const isBadgeActive = (badge: BadgeName) => link.hasBadge && link.badgeName === badge;

 const handleRename = () => {
  dialogs.show({
    type: "edit",
    title: "Rename link",
    description: link.name,
    value: link.name,
    confirmLabel: "Save changes",
    onConfirm: (value) => {
      console.log("!!! [LinkActionsDropdown] onConfirm работает", value);
      if (!value) return;
      setCategories((prev) => {
        const updated = prev.map((cat) =>
          cat.title !== categoryTitle
            ? cat
            : {
                ...cat,
                links: cat.links.map((l) =>
                  l.name === link.name ? { ...l, name: value } : l
                ),
              }
        );
        console.log("!!! [LinkActionsDropdown] categories обновлены", updated);
        return updated;
      });
    },
  });
};
  const handleDelete = () => {
    dialogs.show({
      type: "delete",
      title: "Delete link",
      description: `Are you sure you want to delete link "${link.name}"?`,
      confirmLabel: "Delete",
      onConfirm: () => {
        setCategories((prev) =>
          prev.map((cat) =>
            cat.title !== categoryTitle
              ? cat
              : {
                  ...cat,
                  links: cat.links.filter((l) => l.name !== link.name),
                }
          )
        );
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center justify-center w-8 h-8 rounded transition hover:bg-accent/60"
          tabIndex={-1}
        >
          <Pencil className="w-4 h-4 text-primary/80" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[190px]">
        <DropdownMenuItem onClick={handleRename}>
          <span>Rename</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Roles</DropdownMenuLabel>
        <div className="max-h-[100px] overflow-y-auto custom-scrollbar">
          <DropdownMenuGroup>
            {ALL_ROLES.map((role) => (
              <DropdownMenuItem
                key={role}
                onClick={() => handleToggleRole(role)}
                className="cursor-pointer select-none"
              >
                <span
                  className={cn(
                    "inline-block mr-3 align-middle rounded-full border border-black/30",
                    isRoleActive(role) ? "bg-green-500" : "bg-muted-foreground"
                  )}
                  style={{ width: 12, height: 12, minWidth: 12, minHeight: 12 }}
                />
                <span className="capitalize">{role}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Badge</DropdownMenuLabel>
        <div className="max-h-[100px] overflow-y-auto custom-scrollbar">
          <DropdownMenuGroup>
            {ALL_BADGES.map((badge) => (
              <DropdownMenuItem
                key={badge}
                onClick={() => handleToggleBadge(badge)}
                className="cursor-pointer select-none"
              >
                <span
                  className={cn(
                    "inline-block mr-3 align-middle rounded-full border border-black/30",
                    isBadgeActive(badge) ? "bg-green-500" : "bg-muted-foreground"
                  )}
                  style={{ width: 12, height: 12, minWidth: 12, minHeight: 12 }}
                />
                <span className="capitalize">{badge}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
