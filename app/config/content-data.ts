import { MenuCategory } from "@/app/(_service)/types/menu-types";

export const contentData = {
  categories: [
  {
    "title": "website1234",
    "order": 5,
    "pages": [
      {
        "id": "vcln0phubwqtrg1ujz80o1lr",
        "order": 0,
        "linkName": "dashboard1",
        "href": "/dashboard1",
        "roles": [
          "editor",
          "architect",
          "admin"
        ],
        "isPublished": true,
        "isVectorConnected": true,
        "isChatSynchronized": true,
        "images": [
          {
            "id": "xxgkehkjphinpxflk6x0bd6r",
            "alt": "rub",
            "href": "https://images.unsplash.com/1/irish-hands.jpg?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            "id": "f7ggc0jk18o9osfyi2v8wmes",
            "alt": "sdreresdrere",
            "href": "https://images.unsplash.com/1/irish-hands.jpg?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        ],
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
        "hasBadge": true,
        "badgeName": "NEW",
        "type": "homePage",
        "title": "fdgsdfg",
        "description": "sdfgsdfg",
        "keyWords": [
          "sdfgsdfg"
        ]
      },
      {
        "id": "ts360avslnh1ltiinqexdpc7",
        "order": 1,
        "linkName": "user-management Copy",
        "href": "/user-management-copy",
        "roles": [
          "guest",
          "admin"
        ],
        "hasBadge": true,
        "badgeName": "ADMIN",
        "isPublished": false,
        "isVectorConnected": false,
        "isChatSynchronized": false,
        "title": "asdf",
        "description": "asdf",
        "images": [
          {
            "id": "ae2332cw6v5fqugr23eqwpo6",
            "alt": "asdfasd",
            "href": "asdf"
          }
        ],
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
          "asdf"
        ],
        "linkConfiguration": {
          "outgoing": "active",
          "incoming": "active",
          "external": "active"
        }
      },
      {
        "id": "p26k9rz82xcqvamls8cch6c9",
        "linkName": "zzdfsazdf",
        "href": "/zzdfsazdf",
        "roles": [
          "guest"
        ],
        "hasBadge": false,
        "type": "blog",
        "isPublished": false,
        "isVectorConnected": false,
        "isChatSynchronized": false,
        "order": 2
      }
    ]
  },
  {
    "id": "sjdbw625o55k2qkxtfzvtysi",
    "title": "roma",
    "pages": [],
    "order": 6
  }
]
} as { categories: MenuCategory[] };

export type contentData = typeof contentData;
