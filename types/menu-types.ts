// @/types/menu-types.ts

export type UserRole =
  | "guest"
  | "architect"
  | "admin"
  | "editor"
  | "authUser"
  | "subscriber"
  | "customer"
  | "apiUser";

export type BadgeName =
  | "NEW"
  | "AD"
  | "UPDATED"
  | "IMPORTANT"
  | "RECOMMENDATION";

export interface MenuLink {
  name: string;
  href?: string;
  roles: UserRole[];
  hasBadge?: boolean;
  badgeName?: BadgeName;
  order?: number;
}

export interface MenuCategory {
  title: string;
  links: MenuLink[];
  order?: number; 
}