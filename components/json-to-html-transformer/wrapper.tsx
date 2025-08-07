// app/@right/(_service)/(_components)/page-transformer-components/wrappers/wrapper.tsx

import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface WrapperProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function Wrapper({ className, children, ...props }: WrapperProps) {
  return (
    <div
      className={cn("py-4 lg:py-6 bg-background border-b ", className)}
      {...props}
    >
      <div className="container mx-auto px-4 h-full">{children}</div>
    </div>
  );
}
