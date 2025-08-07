import React, { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Supported variant keys
export type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "lead"
  | "large"
  | "small"
  | "muted"
  | "blockquote"
  | "ul"
  | "ol"
  | "table";

// Typing for markdown component override props
type MarkdownElementProps = {
  node?: any;
  children?: React.ReactNode;
  [key: string]: any;
};

type TypographyProps = {
  markdown: string;
  variant: Variant;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

// Maps variant to correct tag and base class
function getTagAndDefaultClass(
  variant: Variant
): { tag: string; defaultClass: string } {
  switch (variant) {
    case "h1":
      return {
        tag: "h1",
        defaultClass:
          "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"
      };
    case "h2":
      return {
        tag: "h2",
        defaultClass:
          "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0"
      };
    case "h3":
      return {
        tag: "h3",
        defaultClass: "scroll-m-20 text-2xl font-semibold tracking-tight"
      };
    case "h4":
      return {
        tag: "h4",
        defaultClass: "scroll-m-20 text-xl font-semibold tracking-tight"
      };
    case "p":
      return {
        tag: "p",
        defaultClass: "leading-7 [&:not(:first-child)]:mt-6"
      };
    case "lead":
      return {
        tag: "p",
        defaultClass: "text-muted-foreground text-xl"
      };
    case "large":
      return {
        tag: "div",
        defaultClass: "text-lg font-semibold"
      };
    case "small":
      return {
        tag: "small",
        defaultClass: "text-sm leading-none font-medium"
      };
    case "muted":
      return {
        tag: "p",
        defaultClass: "text-muted-foreground text-sm"
      };
    case "blockquote":
      return {
        tag: "blockquote",
        defaultClass: "mt-6 border-l-2 pl-6 italic"
      };
    case "ul":
      return {
        tag: "ul",
        defaultClass: "my-6 ml-6 list-disc [&>li]:mt-2"
      };
    case "ol":
      return {
        tag: "ol",
        defaultClass: "my-6 ml-6 list-decimal [&>li]:mt-2"
      };
    case "table":
      return {
        tag: "table",
        defaultClass:
          "mt-6 min-w-full border border-gray-700 rounded-md"
      };
    default:
      return { tag: "div", defaultClass: "" };
  }
}

/**
 * Core markdown-powered typography component.
 * FIXED: Only renders markdown once, with proper component mapping
 */
export function TypographyMarkdown({
  markdown,
  variant,
  className = "",
  ...rest
}: TypographyProps) {
  const { defaultClass } = getTagAndDefaultClass(variant);
  const composedClass = `${defaultClass} ${className}`.trim();

  // Component mapping - this is where the actual rendering happens
  const markdownComponents = {
    h1: ({ node, children, ...props }: MarkdownElementProps) => (
      <h1 className={variant === "h1" ? composedClass : "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"} {...props}>
        {children}
      </h1>
    ),
    h2: ({ node, children, ...props }: MarkdownElementProps) => (
      <h2 className={variant === "h2" ? composedClass : "scroll-m-20 text-3xl font-semibold tracking-tight mt-4 first:mt-0"} {...props}>
        {children}
      </h2>
    ),
    h3: ({ node, children, ...props }: MarkdownElementProps) => (
      <h3 className={variant === "h3" ? composedClass : "scroll-m-20 text-2xl font-semibold tracking-tight mt-4 first:mt-0 "} {...props}>
        {children}
      </h3>
    ),
    h4: ({ node, children, ...props }: MarkdownElementProps) => (
      <h4 className={variant === "h4" ? composedClass : "scroll-m-20 text-xl font-semibold tracking-tight mt-4 first:mt-0"} {...props}>
        {children}
      </h4>
    ),
    p: ({ node, children, ...props }: MarkdownElementProps) => (
      <p className={variant === "p" || variant === "lead" || variant === "muted" ? composedClass : "leading-7 [&:not(:first-child)]:mt-6"} {...props}>
        {children}
      </p>
    ),
    blockquote: ({ node, children, ...props }: MarkdownElementProps) => (
      <blockquote className={variant === "blockquote" ? composedClass : "mt-6 border-l-2 pl-6 italic"} {...props}>
        {children}
      </blockquote>
    ),
    ul: ({ node, children, ...props }: MarkdownElementProps) => (
      <ul className={variant === "ul" ? composedClass : "my-6 ml-6 list-disc [&>li]:mt-2"} {...props}>
        {children}
      </ul>
    ),
    ol: ({ node, children, ...props }: MarkdownElementProps) => (
      <ol className={variant === "ol" ? composedClass : "my-6 ml-6 list-decimal [&>li]:mt-2"} {...props}>
        {children}
      </ol>
    ),
    table: ({ node, children, ...props }: MarkdownElementProps) => (
      <div className="overflow-x-auto max-w-full">
        <table className={variant === "table" ? composedClass : "mt-6 min-w-full border border-gray-700 rounded-md"} {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ node, children, ...props }: MarkdownElementProps) => (
      <thead {...props}>{children}</thead>
    ),
    tbody: ({ node, children, ...props }: MarkdownElementProps) => (
      <tbody {...props}>{children}</tbody>
    ),
    tr: ({ node, children, ...props }: MarkdownElementProps) => (
      <tr {...props}>{children}</tr>
    ),
    th: ({ node, children, ...props }: MarkdownElementProps) => (
      <th className="border px-4 py-2 text-left font-bold" {...props}>{children}</th>
    ),
    td: ({ node, children, ...props }: MarkdownElementProps) => (
      <td className="border px-4 py-2 text-left" {...props}>{children}</td>
    ),
    li: ({ node, children, ...props }: MarkdownElementProps) => (
      <li {...props}>{children}</li>
    ),
    div: ({ node, children, ...props }: MarkdownElementProps) => (
      <div className={variant === "large" ? composedClass : ""} {...props}>
        {children}
      </div>
    ),
    small: ({ node, children, ...props }: MarkdownElementProps) => (
      <small className={variant === "small" ? composedClass : "text-sm leading-none font-medium"} {...props}>
        {children}
      </small>
    )
  };

  // Simply return the ReactMarkdown with components - no double wrapping!
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]} 
      components={markdownComponents}
      {...rest}
    >
      {markdown}
    </ReactMarkdown>
  );
}

// ----- Typed short-cut exports for usability -----

export function TypographyH1(props: Omit<TypographyProps, "variant">) {
  return <TypographyMarkdown {...props} variant="h1" />;
}
export function TypographyH2(props: Omit<TypographyProps, "variant">) {
  return <TypographyMarkdown {...props} variant="h2" />;
}
export function TypographyH3(props: Omit<TypographyProps, "variant">) {
  return <TypographyMarkdown {...props} variant="h3" />;
}
export function TypographyH4(props: Omit<TypographyProps, "variant">) {
  return <TypographyMarkdown {...props} variant="h4" />;
}
export function TypographyP(props: Omit<TypographyProps, "variant">) {
  return <TypographyMarkdown {...props} variant="p" />;
}
export function TypographyLead(props: Omit<TypographyProps, "variant">) {
  return <TypographyMarkdown {...props} variant="lead" />;
}
export function TypographyLarge(props: Omit<TypographyProps, "variant">) {
  return <TypographyMarkdown {...props} variant="large" />;
}
export function TypographySmall(props: Omit<TypographyProps, "variant">) {
  return <TypographyMarkdown {...props} variant="small" />;
}
export function TypographyMuted(props: Omit<TypographyProps, "variant">) {
  return <TypographyMarkdown {...props} variant="muted" />;
}
export function TypographyBlockquote(props: Omit<TypographyProps, "variant">) {
  return <TypographyMarkdown {...props} variant="blockquote" />;
}
export function TypographyList(props: Omit<TypographyProps, "variant">) {
  return <TypographyMarkdown {...props} variant="ul" />;
}
export function TypographyOrderedList(props: Omit<TypographyProps, "variant">) {
  return <TypographyMarkdown {...props} variant="ol" />;
}
export function TypographyTable(props: Omit<TypographyProps, "variant">) {
  return <TypographyMarkdown {...props} variant="table" />;
}
