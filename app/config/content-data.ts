import { MenuCategory } from "@/app/(_service)/types/menu-types";

export const contentData = {
  categories: [
  {
    "order": 0,
    "title": "website",
    "pages": [
      {
        "id": "clwn5jb6b0000ufd9ukcrgrjt",
        "order": 0,
        "name": "dashboard10101",
        "href": "/dashboard10101",
        "roles": [
          "editor",
          "guest",
          "architect",
          "admin"
        ],
        "isPublished": false,
        "isVectorConnected": true,
        "isChatSynchronized": true
      },
      {
        "id": "clwn5jb6b0001ufd9ukcrgrjw",
        "order": 1,
        "name": "user-management",
        "href": "/user-management",
        "roles": [
          "guest",
          "admin"
        ],
        "hasBadge": true,
        "badgeName": "ADMIN",
        "isPublished": true,
        "isVectorConnected": false,
        "isChatSynchronized": false
      }
    ]
  },
  {
    "order": 1,
    "title": "commerce123",
    "pages": [
      {
        "id": "clwn5jb6b0002ufd9ukcrgrj2",
        "order": 0,
        "name": "ecommerce",
        "href": "/ecommerce",
        "roles": [
          "guest",
          "customer"
        ],
        "isPublished": false,
        "isVectorConnected": false,
        "isChatSynchronized": true
      },
      {
        "id": "clwn5jb6b0003ufd9ukcrgrj6",
        "order": 1,
        "name": "ecommerce-templates",
        "href": "/ecommerce-templates",
        "roles": [
          "guest",
          "admin"
        ],
        "isPublished": true,
        "isVectorConnected": true,
        "isChatSynchronized": false
      }
    ]
  }
]
} as { categories: MenuCategory[] };

export type contentData = typeof contentData;
