import { MenuCategory } from "@/app/(_service)/types/menu-types";

export const contentData = {
  categories: [
  {
    "title": "canary-islands",
    "pages": [
      {
        "id": "rh9jy75u98gtea7trilycm7a",
        "linkName": "asdfasd",
        "href": "/asdfasd",
        "roles": [
          "guest"
        ],
        "hasBadge": false,
        "type": "blog",
        "isPublished": false,
        "isVectorConnected": false,
        "isChatSynchronized": false,
        "order": 3
      },
      {
        "id": "vv50djnvcin3px5335dhay42",
        "linkName": "paromy-na-tenerife",
        "href": "/paromy-na-tenerife",
        "roles": [
          "guest"
        ],
        "hasBadge": true,
        "type": "blog",
        "isPublished": true,
        "isVectorConnected": true,
        "isChatSynchronized": false,
        "order": 2,
        "title": "Паромы на Тенерифе",
        "description": "Паромы на Тенерифе: Полный гид по морским перевозкам 2025",
        "sections": [
          {
            "id": "hero-title",
            "order": "1",
            "bodyContent": {
              "type": "TypographyH1",
              "props": {
                "children": "# Паромы на **Тенерифе**: Полный гид по морским перевозкам 2025",
                "className": "text-5xl font-bold leading-tight",
                "style": {
                  "fontSize": "48px"
                }
              }
            }
          }
        ],
        "keyWords": [
          "Паромы на Тенерифе",
          "Паромы"
        ],
        "images": [
          {
            "id": "pf6aetbo97ni1bhzu9cl0oq5",
            "alt": "Паромы на Тенерифе: Полный гид по морским перевозкам 2025",
            "href": "https://9d8adypzz8xutnay.public.blob.vercel-storage.com/AI%20vs%20messenger-TL5G6UIqrnzdX6WwYEw8DoROtfpHvy.png"
          }
        ],
        "linkConfiguration": {
          "outgoing": "active",
          "incoming": "active",
          "external": "active"
        },
        "badgeName": "NEW"
      }
    ],
    "order": 2
  }
]
} as { categories: MenuCategory[] };

export type contentData = typeof contentData;
