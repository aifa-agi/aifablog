import { PageData } from "./page-types";


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


export interface MenuCategory {  
  title: string;
  pages: PageData[];
  order?: number; 
}