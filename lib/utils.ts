// @/lib/utils.ts
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";



export type Role =
  | "guest"
  | "architect"
  | "admin"
  | "editor"
  | "authUser"
  | "subscriber"
  | "customer"
  | "apiUser";

  
export const ROLE_LABELS: Record<Role, string> = {
  guest: "Guest",
  architect: "Architect",
  admin: "Admin",
  editor: "Editor",
  authUser: "Authorized User",
  subscriber: "Subscriber",
  customer: "Customer",
  apiUser: "API User",
};

export const LOCALSTORAGE_KEY = "aifa-role";

export function getStoredRole(): Role {
  if (typeof window === "undefined") return "guest";
  const stored = localStorage.getItem(LOCALSTORAGE_KEY);
  if (stored && Object.hasOwn(ROLE_LABELS, stored)) {
    return stored as Role;
  }
  return "guest";
}

export function setStoredRole(role: Role) {
  if (typeof window === "undefined") return;
  
  if (Object.hasOwn(ROLE_LABELS, role)) {
    localStorage.setItem(LOCALSTORAGE_KEY, role);
  }
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}