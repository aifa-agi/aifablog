"use client";
import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { MenuCategory } from "@/types/menu-types";
import { menuData } from "@/app/config.ts/menu-data";

interface NavigationMenuContextProps {
  categories: MenuCategory[];
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
  resetCategories: () => void;
  serverCategoriesRef: React.MutableRefObject<MenuCategory[]>;
  loading: boolean;
  dirty: boolean;
  updateCategories: () => Promise<void>;
}

const NavigationMenuContext = createContext<NavigationMenuContextProps | undefined>(undefined);

function isCategoriesEqual(a: MenuCategory[], b: MenuCategory[]): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function fakeServerUpdate(data: MenuCategory[]): Promise<"ok"> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("ok"), 3000);
  });
}



export function NavigationMenuProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<MenuCategory[]>(menuData.categories);
  const serverCategoriesRef = useRef<MenuCategory[]>(menuData.categories);
  const [loading, setLoading] = useState(false);
  const dirty = !isCategoriesEqual(categories, serverCategoriesRef.current);

  const updateCategories = useCallback(async () => {
    setLoading(true);
    try {
      await fakeServerUpdate(categories);
      serverCategoriesRef.current = JSON.parse(JSON.stringify(categories));
    } finally {
      setLoading(false);
    }
  }, [categories]);

  useEffect(() => {
    console.log('categories in NavigationMenuProvider', categories)
  }, [categories]);

  const resetCategories = useCallback(() => {
    setCategories(menuData.categories);
    serverCategoriesRef.current = menuData.categories;
  }, []);

  return (
    <NavigationMenuContext.Provider
      value={{
        categories,
        setCategories,
        resetCategories,
        serverCategoriesRef,
        loading,
        dirty,
        updateCategories,
      }}
    >
      {children}
    </NavigationMenuContext.Provider>
  );
}

export function useNavigationMenu() {
  const context = useContext(NavigationMenuContext);
  if (!context) {
    throw new Error("useNavigationMenu must be used within a NavigationMenuProvider");
  }
  return context;
}
