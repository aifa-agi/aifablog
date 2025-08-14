import { MenuCategory } from "@/app/(_service)/types/menu-types";

export const contentData = {
  categories: [
  {
    "title": "new-category123",
    "pages": [],
    "order": 3
  },
  {
    "title": "admin",
    "pages": [
      {
        "id": "r70rhidyb8w0o8ikzuuu8nil",
        "linkName": "vercel-deploy",
        "href": "/admin/vercel-deploy",
        "roles": [
          "guest"
        ],
        "hasBadge": false,
        "type": "blog",
        "isPublished": true,
        "isVectorConnected": true,
        "isChatSynchronized": true,
        "order": 1
      }
    ],
    "order": 4
  },
  {
    "title": "canary-islands1111",
    "pages": [
      {
        "id": "gdwn8jw1g3vp8js9im14jvgj",
        "linkName": "paromy-na-tenerife",
        "href": "/canary-islands/paromy-na-tenerife",
        "roles": [
          "guest"
        ],
        "hasBadge": false,
        "type": "blog",
        "isPublished": false,
        "isVectorConnected": true,
        "isChatSynchronized": false,
        "order": 1,
        "title": "Паромы на Тенерифе",
        "description": ": Полный гид по морским перевозкам 2025",
        "keyWords": [
          "Паромы на Тенерифе"
        ],
        "images": [
          {
            "id": "uyto1jwjrxkkykis19o7w9jg",
            "alt": "Паромы на Тенерифе",
            "href": "https://9d8adypzz8xutnay.public.blob.vercel-storage.com/Screenshot%202023-12-14%20193752-iLFevnFZR8YF77PoIZRUXcusgSutpX.png"
          }
        ],
        "updatedAt": "2025-08-14T09:30:55.427Z",
        "sections": [
          {
            "id": "section-1"
          },
          {
            "id": "section-2"
          },
          {
            "id": "section-3"
          }
        ]
      },
      {
        "id": "bft9sas1qpjtnp0dauhchecj",
        "linkName": "paromy-to-cadiz",
        "href": "/canary-islands/paromy-to-cadiz",
        "roles": [
          "guest"
        ],
        "hasBadge": false,
        "type": "blog",
        "isPublished": false,
        "isVectorConnected": true,
        "isChatSynchronized": false,
        "order": 2,
        "title": "паром из Кадис",
        "description": "Забронируйте паром из Кадис",
        "keyWords": [
          "паром из Кадис"
        ],
        "images": [
          {
            "id": "r4qubk99cxtzrevmwpjjznfe",
            "alt": "Забронируйте паром из Кадис",
            "href": "https://9d8adypzz8xutnay.public.blob.vercel-storage.com/Screenshot%202023-12-14%20193738-2b9rzOUfoSrjgb3GhqV9ZEVP8UioDw.png"
          }
        ],
        "sections": [
          {
            "id": "section-1"
          },
          {
            "id": "section-2"
          }
        ],
        "updatedAt": "2025-08-14T10:45:56.924Z"
      }
    ],
    "order": 2
  }
]
} as { categories: MenuCategory[] };

export type contentData = typeof contentData;
