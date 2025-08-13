import { ImageProps } from "next/image";
import { Metadata } from "next";
import { UserRole } from "@/app/config/user-roles";
import { BadgeName } from "@/app/config/badge-config";

export type PageType =
  | "homePage"
  | "basePage"
  | "footerPage"
  | "blog"
  | "document"
  | "guide"
  | "shopItem";

export interface LinksData {
  linkBuilderType: "outgoing" | "incoming" | "externa";
  path: string[];
}
export interface SectionInfo {
  id: string;
  summary?: SummaryData;
  linksData?: LinksData[];
}
export interface SummaryData {
  id: string;
  path: string;
  tags?: string[];
  childSummary: string;
  parentSummary: string;
  selfSummary: string;
}

export type LinkItemState = "pending" | "active";

export interface LinkConfiguration {
  outgoing: LinkItemState;
  incoming: LinkItemState;
  external: LinkItemState;
}

export interface Activities {
  likesCount: number;
  bookmarksCount: number;
}

interface PageImages {
  id: string;
  alt?: string;
  href?: string;
}
export interface PageData {
  metadata?: Metadata;
  id: string;
  linkName: string;
  title?: string;
  description?: string;
  images?: PageImages[];
  keyWords?: string[];
  href?: string;
  roles: UserRole[];
  hasBadge?: boolean;
  badgeName?: BadgeName;
  badgeLink?: string;
  order?: number;
  isPublished: boolean;
  isVectorConnected: boolean;
  isChatSynchronized: boolean;
  type: PageType;
  design?: string;
  linkConfiguration?: LinkConfiguration;
  createdAt?: string;
  updatedAt?: string;
  sections?: SectionInfo[];
}
