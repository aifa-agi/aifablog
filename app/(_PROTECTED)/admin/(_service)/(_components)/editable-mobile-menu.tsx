// @/app/(_PROTECTED)/admin/(_service)/(_components)/editable-mobile-menu.tsx

"use client";

import type React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { MenuCategory, MenuLink } from "@/types/menu-types";
import { cn } from "@/lib/utils";

interface EditableMobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  topOffset: string;
  categories: MenuCategory[];
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
}

const greenDotClass = "bg-emerald-500";

export default function EditableMobileMenu({
  isOpen,
  topOffset,
  categories,
  setCategories,
}: EditableMobileMenuProps) {
  const renderCategoryLinks = (categoryLinks: MenuLink[]) => (
    <ul className="space-y-3 py-2">
      {categoryLinks.map((link) => (
        <li key={link.name}>
          <a
            href={link.href ?? "#"}
            className="flex items-center text-white transition-colors duration-200 relative"
          >
            {link.hasBadge && link.badgeName ? (
              <div className="flex items-center justify-between gap-2 w-full">
                <span className="flex-grow overflow-hidden whitespace-nowrap text-ellipsis flex items-center gap-2">
                  {link.name}
                </span>
                <Badge
                  className={cn(
                    "shadow-none rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  )}
                >
                  <div
                    className={cn(
                      "h-1.5 w-1.5 rounded-full mr-2",
                      greenDotClass
                    )}
                  />
                  {link.badgeName}
                </Badge>
              </div>
            ) : (
              <span className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
                {link.name}
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-x-0 flex justify-center items-start z-50"
      style={{ marginTop: topOffset }}
    >
      <div
        className="bg-black text-white rounded-lg shadow-2xl border border-gray-700 p-6 mx-6 mb-6 w-full max-w-md flex flex-col"
        style={{ height: `calc(100vh - ${topOffset} - 100px)` }}
      >
        <h2 className="text-2xl font-bold mb-4 text-left">Mobile Menu</h2>
        <p className="leading-7 ">
          The mobile menu in this starter is currently unavailable for editing, use the full-screen version.
        </p>
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <Accordion type="single" collapsible className="w-full">
            {categories.map((category, index) => (
              <AccordionItem key={category.title} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg flex items-center gap-3">
                  {category.title}
                </AccordionTrigger>
                <AccordionContent>
                  {renderCategoryLinks(category.links)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
