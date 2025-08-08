// @/lib/utils.ts
import { ALL_ROLES, UserRole } from "@/app/config/user-roles";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
