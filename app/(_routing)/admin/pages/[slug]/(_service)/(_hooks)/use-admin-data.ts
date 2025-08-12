// @/app/admin/pages/[slug]/(_service)/(_hooks)/use-admin-data.ts

"use client";

import { useState, useEffect, useCallback } from "react";

export interface UseAdminDataOptions<T> {
  slug: string;
  fetchFn: (slug: string) => Promise<T>;
  initialData?: T;
  dependencies?: any[];
}

export interface UseAdminDataResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateData: (newData: Partial<T>) => void;
}

/**
 * Reusable hook for managing admin data state
 * Handles loading, error states, and data updates
 */
export function useAdminData<T>({
  slug,
  fetchFn,
  initialData = null,
  dependencies = [],
}: UseAdminDataOptions<T>): UseAdminDataResult<T> {
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await fetchFn(slug);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [slug, fetchFn]);

  const updateData = useCallback((newData: Partial<T>) => {
    setData(prev => prev ? { ...prev, ...newData } : null);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    updateData,
  };
}
