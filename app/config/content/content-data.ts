import { MenuCategory } from "@/app/(_service)/types/menu-types";

export const contentData = {
  categories: [
  {
    "title": "canary-islands",
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
        "isPublished": true,
        "isVectorConnected": true,
        "isChatSynchronized": true,
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
        ],
        "updatedAt": "2025-08-13T23:05:58.027Z"
      }
    ],
    "order": 2
  }
]
} as { categories: MenuCategory[] };

export type contentData = typeof contentData;
