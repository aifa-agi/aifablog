
"use client";
import { useRole } from "@/app/contexts/role-provider";
import EditableNavBar from "@/components/nav-bar/admin-flow/editable-nav-bar";
import StaticNavBar from "./nav-bar/public-flow/static-nav-bar";

export default function NavBarRoleSelector() {
  const { role } = useRole();

  if (role === "admin") {
    return <EditableNavBar />;
  }
  return <StaticNavBar />;
}
