

// @/app/(_routing)/admin/pages/[slug]/(_service)/(_components)/admin-pages/admin-page-sections/utils/status-helpers.ts

export const getRefreshIconColor = (page: any, dirty: boolean): string => {
  if (!page.sections || page.sections.length === 0) {
    return "text-gray-400";
  }
  
  if (dirty) {
    return "text-orange-500";
  }
  
  return "text-green-600";
}