import { MenuCategory } from "@/app/config/menu-types";

// Эти cuid'ы сгенерированы заранее вручную для примера
export const menuData = {
  categories: [
    {
      order: 0,
      title: "Website",
      pages: [
        {
          id: "clwn5jb6b0000ufd9ukcrgrjt", 
          order: 0,
          name: "dashboard",
          href: "/dashboard",
          roles: ["guest", "admin", "editor", "architect"],
          isPublished: false,
          isVectorConnected: true,
          isChatSynchronized:true
        },
        {
          id: "clwn5jb6b0001ufd9ukcrgrjw",
          order: 1,
          name: "user-management",
          href: "/user-management",
          roles: ["guest", "admin"],
          hasBadge: true,
          badgeName: "ADMIN",
          isPublished: true,
          isVectorConnected:false,
          isChatSynchronized:false
        },
      ],
    },
    {
      order: 1,
      title: "Commerce",
      pages: [
        {
          id: "clwn5jb6b0002ufd9ukcrgrj2",
          order: 0,
          name: "ecommerce",
          href: "/ecommerce",
          roles: ["guest", "customer"],
          isPublished: false,
          isVectorConnected:false,
          isChatSynchronized:true
        },
        {
          id: "clwn5jb6b0003ufd9ukcrgrj6",
          order: 1,
          name: "ecommerce-templates",
          href: "/ecommerce-templates",
          roles: ["guest", "admin"],
          isPublished: true,
          isVectorConnected: true,
          isChatSynchronized:false
        },
      ],
    },
  ] as MenuCategory[],
};

export type MenuData = typeof menuData;
