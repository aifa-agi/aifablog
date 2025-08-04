import { MenuCategory } from "@/types/menu-types";

// Эти cuid'ы сгенерированы заранее вручную для примера
export const menuData = {
  categories: [
    {
      order: 0,
      title: "WEBSITE",
      links: [
        {
          id: "clwn5jb6b0000ufd9ukcrgrjt", // пример cuid
          order: 0,
          name: "Dashboard",
          href: "/dashboard",
          roles: ["guest", "admin", "editor", "architect"],
          isPublished: false,
        },
        {
          id: "clwn5jb6b0001ufd9ukcrgrjw",
          order: 1,
          name: "User Management",
          href: "/user-management",
          roles: ["guest", "admin"],
          hasBadge: true,
          badgeName: "ADMIN",
          isPublished: true,
        },
      ],
    },
    {
      order: 1,
      title: "COMMERCE",
      links: [
        {
          id: "clwn5jb6b0002ufd9ukcrgrj2",
          order: 0,
          name: "Ecommerce",
          href: "/ecommerce",
          roles: ["guest", "customer"],
          isPublished: false,
        },
        {
          id: "clwn5jb6b0003ufd9ukcrgrj6",
          order: 1,
          name: "Ecommerce Templates",
          href: "/ecommerce-templates",
          roles: ["guest", "admin"],
          isPublished: true,
        },
      ],
    },
  ] as MenuCategory[],
};

export type MenuData = typeof menuData;
