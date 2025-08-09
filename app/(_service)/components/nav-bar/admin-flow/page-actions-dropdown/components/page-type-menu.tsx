// @/app/(_service)/components/nav-bar/admin-flow/page-actions-dropdown/components/page-type-menu.tsx

import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/app/(_service)/components/ui/dropdown-menu";
import { PageType } from "@/app/(_service)/types/page-types";
import { StatusIndicator } from "./status-indicator";
import { PAGE_TYPES } from "@/app/config/page-variants";

interface PageTypeMenuProps {
  onSetPageType: (type: PageType) => void;
  isPageTypeActive: (type: PageType) => boolean;
}

export function PageTypeMenu({ 
  onSetPageType, 
  isPageTypeActive 
}: PageTypeMenuProps) {
  return (
    <>
      <DropdownMenuSeparator />
      
      <DropdownMenuLabel>Page Type</DropdownMenuLabel>
      
      <div className="max-h-[100px] overflow-y-auto custom-scrollbar">
        <DropdownMenuGroup>
          {PAGE_TYPES.map((pageType) => (
            <DropdownMenuItem
              key={pageType.value}
              onClick={() => onSetPageType(pageType.value)}
              className="cursor-pointer select-none"
            >
              <StatusIndicator 
                isActive={isPageTypeActive(pageType.value)} 
                size="md" 
              />
              <span>{pageType.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </div>
    </>
  );
}
