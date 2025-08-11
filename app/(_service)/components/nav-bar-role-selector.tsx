
"use client";
import { useRole } from "@/app/(_service)/contexts/role-provider";
import EditableNavBar from "@/app/(_service)/components/nav-bar/admin-flow/editable-nav-bar";
import StaticNavBar from "./nav-bar/public-flow/static-nav-bar";

export default function NavBar() {
  const { role } = useRole();

  if (role === "admin") {
    return <EditableNavBar />;
  }
  return <StaticNavBar />;
}
