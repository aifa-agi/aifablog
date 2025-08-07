"use client";

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { MenuCategory } from "@/app/(_service)/types/menu-types";
import { persistMenuCategories } from "@/app/(_service)/lib/persist-menu";
import { fetchMenuCategories } from "@/app/(_service)/lib/fetch-menu";
import { toast } from "sonner";

interface NavigationMenuContextProps {
  categories: MenuCategory[];
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
  resetCategories: () => void;
  serverCategoriesRef: React.MutableRefObject<MenuCategory[]>;
  loading: boolean;
  dirty: boolean;
  updateCategories: () => Promise<void>;
  refreshCategories: () => Promise<void>;
  initialized: boolean;
}

const NavigationMenuContext = createContext<NavigationMenuContextProps | undefined>(undefined);

function isCategoriesEqual(a: MenuCategory[], b: MenuCategory[]): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function NavigationMenuProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const serverCategoriesRef = useRef<MenuCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const dirty = !isCategoriesEqual(categories, serverCategoriesRef.current);

  const refreshCategories = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchMenuCategories();
      if (result.status === "ok" && result.categories) {
        setCategories(result.categories);
        serverCategoriesRef.current = JSON.parse(JSON.stringify(result.categories));
      }
    } catch (error) {
      console.error("Failed to refresh categories:", error);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  }, []);

  const updateCategories = useCallback(async () => {
    setLoading(true);
    try {
      const result = await persistMenuCategories(categories);
      if (result.status === "ok") {
        serverCategoriesRef.current = JSON.parse(JSON.stringify(categories));
        toast.success("All changes pushed to file system");
      } else {
        await refreshCategories();
      }
    } finally {
      toast.error("Error updating on server");
      setLoading(false);
    }
  }, [categories, refreshCategories]);

  const resetCategories = useCallback(async () => {
    await refreshCategories();
  }, [refreshCategories]);

  useEffect(() => {
    refreshCategories();
  }, [refreshCategories]);

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
        refreshCategories,
        initialized,
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
