import React from "react";
import { cn } from "@/app/(_service)/lib/utils";

/**
 * HeaderTitle — universal heading (h1/h2/h3/h4) for headers.
 * Accepts: level=1...4, position, className, and all standard heading props.
 */
export type HeaderTitleProps = {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4;
  position?: "left" | "center" | "right";
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function HeaderTitle({
  children,
  level = 1,
  position = "center",
  className,
  ...props
}: HeaderTitleProps) {
  const baseClass: Record<number, string> = {
    1: "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
    2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
    3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    4: "scroll-m-20 text-xl font-semibold tracking-tight",
  };

  const alignmentClass: Record<"left" | "center" | "right", string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const classes = cn(baseClass[level], alignmentClass[position], className);

  switch (level) {
    case 1:
      return (
        <h1 className={classes} {...props}>
          {children}
        </h1>
      );
    case 2:
      return (
        <h2 className={classes} {...props}>
          {children}
        </h2>
      );
    case 3:
      return (
        <h3 className={classes} {...props}>
          {children}
        </h3>
      );
    case 4:
      return (
        <h4 className={classes} {...props}>
          {children}
        </h4>
      );
    default:
      return (
        <h1 className={classes} {...props}>
          {children}
        </h1>
      );
  }
}
