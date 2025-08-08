import { MenuCategory } from "@/app/(_service)/types/menu-types";

export const contentData = {
  categories: [
  {
    "order": 1,
    "title": "commerce1234",
    "pages": [
      {
        "id": "clwn5jb6b0002ufd9ukcrgrj2",
        "order": 0,
        "linkName": "ecommerce1222",
        "href": "/ecommerce1222",
        "roles": [
          "guest",
          "customer",
          "admin"
        ],
        "isPublished": false,
        "isVectorConnected": false,
        "isChatSynchronized": true,
        "title": "data1234",
        "description": "qwerty123",
        "type": "blog",
        "keyWords": [
          "12345678",
          "sdfghj"
        ],
        "images": [
          {
            "id": "rse0ftbnef7syqslrnoiua6d",
            "alt": "ddfsdfgsdfgsdfg",
            "href": "https://images.unsplash.com/1/irish-hands.jpg?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            "id": "xccechqjivdi2tlfdh3gksxa",
            "alt": "zdfgsdfg dfgsdfgsdf",
            "href": "https://9d8adypzz8xutnay.public.blob.vercel-storage.com/Screenshot%202023-11-12%20094730-lJIW2YK5jrcsEjofhVTpFWvNlqOmYo.png"
          },
          {
            "id": "kfmhm6a8iuisse1co0sok2kx",
            "alt": "drtyertybe tryertyerty",
            "href": "https://9d8adypzz8xutnay.public.blob.vercel-storage.com/Screenshot%202023-11-18%20100717-hnJ0bk84RHMBpS7by5lbv5HnXsRzGg.png"
          }
        ]
      },
      {
        "id": "clwn5jb6b0003ufd9ukcrgrj6",
        "order": 1,
        "linkName": "ecommerce-templates",
        "href": "/ecommerce-templates",
        "roles": [
          "guest",
          "admin"
        ],
        "isPublished": true,
        "isVectorConnected": true,
        "isChatSynchronized": false,
        "title": "sdfasdf",
        "description": "asdasdfasdf sd fsdf asdf",
        "type": "homePage"
      }
    ]
  },
  {
    "order": 0,
    "title": "website1234",
    "pages": [
      {
        "id": "clwn5jb6b0000ufd9ukcrgrjt",
        "order": 0,
        "linkName": "dashboard101012233",
        "href": "/dashboard101012233",
        "roles": [
          "editor",
          "architect",
          "admin"
        ],
        "isPublished": false,
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
        "hasBadge": true,
        "badgeName": "NEW"
      },
      {
        "id": "clwn5jb6b0001ufd9ukcrgrjw",
        "order": 1,
        "linkName": "user-management",
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
    "id": "wqm7mvm66jurdfvmcaw5bv8c",
    "title": "new",
    "pages": [],
    "order": 2
  }
]
} as { categories: MenuCategory[] };

export type contentData = typeof contentData;
