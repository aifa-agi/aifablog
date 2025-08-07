import { cn } from "@/lib/utils";

import { Announcement } from "./announcement";
import { HeaderTitle } from "./header-title";
import { HeaderSection as HeaderSectionType } from "@/types/page-types";

export function HeaderSection({
  announcement,
  title,
  customTitleCss,
  level,
  description,
  customDescriptionCss,
  position,
  showBorder,
}: HeaderSectionType) {
  if (!title) return null;

  return (
    <section
      className={cn(showBorder && "border-t-4 border-b-4 border-primary")}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-1 py-8 md:py-10 lg:py-12">
          {announcement && (
            <Announcement
              badgeText={announcement.badgeText}
              descriptionText={announcement.descriptionText}
              href={announcement.href}
            />
          )}
          <HeaderTitle
            level={level ?? 1}
            position={position ?? "center"}
            className={customTitleCss}
          >
            {title}
          </HeaderTitle>
          <p className="text-muted-foreground text-xl">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
