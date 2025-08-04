// @/components/nav-bar-role-selector.tsx
"use client";
import { useRole } from "@/app/contexts/role-provider";
import EditableNavBar from "@/app/(_PROTECTED)/admin/(_service)/(_components)/editable-nav-bar";
import StaticNavBar from "@/app/(_PUBLIC)/(_serice)/(_components)/static-nav-bar";

export default function NavBarRoleSelector() {
  const { role } = useRole();

  if (role === "admin") {
    return <EditableNavBar />;
  }
  return <StaticNavBar />;
}
