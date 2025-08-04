// @/app/config.ts/menu-data.ts

import { MenuCategory } from "@/types/menu-types";

export const menuData = {
  categories: [
    {
      order: 0,
      title: "WEBSITE",
      links: [
        {
          order: 0,
          name: "Dashboard",
          href: "/dashboard",
          roles: ["guest", "admin", "editor", "architect"],
        },
        {
          order: 1,
          name: "User Management",
          href: "/user-management",
          roles: ["guest", "admin"],
          hasBadge: true,
          badgeName: "ADMIN",
        },
        {
          order: 2,
          name: "Content Editor",
          href: "/content-editor",
          roles: ["guest", "editor", "admin"],
        },
        {
          order: 3,
          name: "Analytics",
          href: "/analytics",
          roles: ["guest", "admin", "architect"],
        },
        {
          order: 4,
          name: "API Keys",
          href: "/api-keys",
          roles: ["guest", "apiUser", "admin"],
        },
        {
          order: 5,
          name: "Webhooks",
          href: "/webhooks",
          roles: ["guest", "apiUser", "architect"],
        },
        {
          order: 6,
          name: "SDK Downloads",
          href: "/sdk-downloads",
          roles: ["guest", "apiUser", "architect"],
        },
        {
          order: 7,
          name: "Developer Tools",
          href: "/dev-tools",
          roles: ["guest", "architect", "apiUser"],
        },
        {
          order: 8,
          name: "Code Examples",
          href: "/code-examples",
          roles: ["guest", "apiUser", "architect"],
        },
        {
          order: 9,
          name: "Testing Environment",
          href: "/testing-env",
          roles: ["guest", "architect", "apiUser"],
        },
        {
          order: 10,
          name: "Version Control",
          href: "/version-control",
          roles: ["guest", "architect", "admin"],
        },
        {
          order: 11,
          name: "Build Status",
          href: "/build-status",
          roles: ["guest", "architect"],
          hasBadge: true,
          badgeName: "BETA",
        },
        {
          order: 12,
          name: "Performance Monitor",
          href: "/performance",
          roles: ["guest", "architect", "admin"],
        },
        {
          order: 13,
          name: "Media Library",
          href: "/media-library",
          roles: ["guest", "editor", "admin", "authUser"],
        },
        {
          order: 14,
          name: "Blog Posts",
          href: "/blog-posts",
          roles: ["guest", "editor", "admin"],
        },
        {
          order: 15,
          name: "Pages",
          href: "/pages",
          roles: ["guest", "editor", "admin"],
        },
        {
          order: 16,
          name: "Categories",
          href: "/categories",
          roles: ["guest", "editor", "admin"],
        },
        {
          order: 17,
          name: "Tags",
          href: "/tags",
          roles: ["guest", "editor", "admin"],
        },
        {
          order: 18,
          name: "Comments",
          href: "/comments",
          roles: ["guest", "editor", "admin"],
        },
        {
          order: 19,
          name: "SEO Tools",
          href: "/seo-tools",
          roles: ["guest", "editor", "admin"],
        },
        {
          order: 20,
          name: "Site Map",
          href: "/sitemap",
          roles: ["guest", "editor", "admin", "architect"],
        },
        {
          order: 21,
          name: "Content Templates",
          href: "/content-templates",
          roles: ["guest", "editor", "admin"],
          hasBadge: true,
          badgeName: "PRO",
        },
        {
          order: 22,
          name: "Backup Manager",
          href: "/backup-manager",
          roles: ["guest", "admin", "architect"],
        },
        {
          order: 23,
          name: "My Account",
          href: "/my-account",
          roles: ["guest", "authUser", "subscriber", "customer"],
        },
        {
          order: 24,
          name: "Subscription",
          href: "/subscription",
          roles: ["guest", "subscriber", "customer"],
        },
      ],
    },
    {
      order: 1,
      title: "COMMERCE",
      links: [
        {
          order: 0,
          name: "Ecommerce",
          href: "/ecommerce",
          roles: ["guest", "customer"],
        },
        {
          order: 1,
          name: "Ecommerce Templates",
          href: "/ecommerce-templates",
          roles: ["guest", "admin"],
        },
        {
          order: 2,
          name: "Online Stores",
          href: "/stores",
          roles: ["guest", "customer"],
          hasBadge: true,
          badgeName: "IMPORTANT",
        },
        {
          order: 3,
          name: "Services",
          href: "/services",
          roles: ["guest", "editor"],
        },
        {
          order: 4,
          name: "Invoicing",
          href: "/invoicing",
          roles: ["guest", "authUser"],
          hasBadge: true,
          badgeName: "AD",
        },
      ],
    },
  ] as MenuCategory[],
};

export type MenuData = typeof menuData;
