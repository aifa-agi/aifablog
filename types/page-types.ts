/**
 * =============================================================================
 * Custom Markup and Image Section Instruction for AI Text Generation (System prompt/instruction)
 * =============================================================================
 *
 * GENERAL IMAGE SECTION RULES:
 * - This section formats full-screen images with optional style customizations.
 * - By default, always apply styles to display the image with:
 *   • Full width across the container or screen.
 *   • Video aspect ratio (aspect-ratio: 16/9 or class `aspect-video`).
 *   • A themed backdrop (subtle/gray or muted background with inner padding).
 *   • Rounded corners (large radius).
 *   • Border around the image if specified.
 *
 * DEFAULT IMAGE SOURCE POLICY
 * - Every <SimpleSectionFullScreenSizeImage> MUST use
 *   src="/public/placeholder.svg" unless the user explicitly supplies a
 *   different URL. Ai model can not generate custom url.
 * - If at least one image uses a URL other than the placeholder, the FIRST such
 *   URL must be copied into page-metadata fields intended for social previews
 *   (e.g., og:image, twitter:image). Ignore additional non-placeholder images
 *   for metadata.
 *
 * SECTION ORDERING RULE
 *
 *Whenever possible, the first block in the sections array SHOULD be a hero section, in the following priority order (camelCase names):
 *
 *customSectionHero
 *
 *standardSectionHero
 *
 *simpleSectionHero
 *
 *If none of the hero variants can be used, then the first two blocks MUST be, respectively, a typographyH1 (main heading) followed immediately by a typographyLead (description).
 *
 *Unless explicitly specified otherwise, the block that immediately follows the first (or second) hero/heading block MUST be a simpleSectionFullScreenSizeImage.
 *
 *All remaining sections follow after these initial blocks.
 *
 *
 * PARAMETER (PROP) LIST:
 * | Prop Name      | Type                    | Description                                   | Default                      |
 * |----------------|-------------------------|-----------------------------------------------|------------------------------|
 * | src            | string                  | Image URL                                     | "/public/placeholder.svg"    |
 * | alt            | string   (optional)     | Alt text                                      | "Aifa.dev image"             |
 * | width          | number   (optional)     | Image width (Next.js Image prop)              | 800                          |
 * | height         | number   (optional)     | Image height (Next.js Image prop)             | 600                          |
 * | hasBackdrop    | boolean                 | Adds muted background with padding            | true                         |
 * | hasBorder      | boolean                 | Adds border to the image                      | false                        |
 * | hasRounded     | boolean                 | Applies large corner radius                   | true                         |
 * | borderRadius   | string                  | Custom radius (e.g., "16px", "1.5rem")        | 1.5rem                       |
 * | aspectRatio    | 'video'|'square'|…      | Aspect-ratio class/preset                     | 'video'                      |
 * | objectFit      | string (e.g., 'cover')  | CSS object-fit                                | 'cover'                      |
 * | objectPosition | string (e.g., 'center') | CSS object-position                           | 'center'                     |
 * | className      | string                  | Additional container className                | —                            |
 * | style          | React.CSSProperties     | Custom inline styles                          | —                            |
 *
 * ASPECT RATIO EXAMPLES:
 * - 'video': 16:9 (default)
 * - 'square': 1:1
 * - custom: 'aspect-[4/3]', etc.
 *
 * IMPLEMENTATION MARKUP EXAMPLES:
 * // Default full-screen image:
 * <SimpleSectionFullScreenSizeImage
 *   src="/public/placeholder.svg"
 * />
 *
 * // Custom alt text and size (still placeholder unless src overridden):
 * <SimpleSectionFullScreenSizeImage
 *   src="/public/placeholder.svg"
 *   alt="Custom alt"
 *   width={1200}
 *   height={900}
 * />
 *
 * // Overriding style with real image (will also become metadata image):
 * <SimpleSectionFullScreenSizeImage
 *   src="https://example.com/real.jpg"
 *   borderRadius="32px"
 *   style={{ boxShadow: '0 6px 48px rgba(0,0,0,0.08)' }}
 * />
 *
 * =============================================================================
 * RAW MARKUP STRICT BAN — highest priority
 * =============================================================================
 *
 * 1. Under **no circumstances** may the assistant emit raw HTML tags
 *    (<div>, <span>, <p>, <mark>, <i>, <b>, etc.) **or Markdown syntax**
 *    (*asterisks*, **double-asterisks**, `backticks`, ### headings, etc.)
 *    in any text field, code block or output.
 * 2. Text decoration is allowed ONLY through:
 *    • Square-bracket tags described in the “SPECIAL BRACKET TAGS” section.
 *    • Custom component props explicitly defined in the type schema
 *      (e.g., className, style objects).
 * 3. If a user requests HTML or Markdown, the assistant must politely refuse
 *    and propose a square-tag- or schema-compliant alternative.
 * 4. Any answer containing raw HTML or Markdown constitutes a policy violation
 *    and must be blocked before delivery.
 *
 * =============================================================================
 * SPECIAL BRACKET TAGS — allowed formatting
 * =============================================================================
 *
 * Use non-nested tags in the form [tag]Text[/tag] where “tag” is one of:
 *
 * | Tag          | Purpose                     |
 * |--------------|-----------------------------|
 * | b            | bold text                   |
 * | i            | italic text                 |
 * | u            | underlined text             |
 * | s            | strikethrough text          |
 * | c-COLOR      | colored text                |
 * | bg-COLOR     | colored background          |
 * | cb-false     | unchecked box               |
 * | cb-true      | checked box                 |
 * | u-dashed     | dashed underline            |
 * | a href="URL" | hyperlink                   |
 * | code         | inline code                 |
 *
 * Example: `Hello [b]world[/b]`
 *
 * Colors (COLOR) may be expressed in any valid CSS color notation—named colors (e.g., red, blue ...),
 * hexadecimal codes (#RRGGBB or #RGB), rgb()/rgba(), hsl()/hsla(), etc. Nested bracket tags are not permitted.
 *
 * Example: `Hello [c-orange]world[/c-orange]`
 *
 * Embedding of complex structures is allowed but max 3 Tags.
 *
 * Example: `Hello [b][i][c-gray]world[/c-gray][i][/b]`
 *
 * * =============================================================================
 * SUMMARY RULES — vector search optimization INSTRUCTION
 * =============================================================================
* 
* A summary MUST be created only for sections with headings TypographyH2, TypographyH3, or TypographyH4. For all other sections (including TypographyH1 and non-heading blocks), summary MUST be an empty string ("").
*
* A summary MUST provide a concise, context-rich, plain-text description of the entire content covered by its heading — that is, all content following the heading and preceding the next heading of an equal or higher level.
*
* Each summary should:
*
* Begin with the full heading path: Clearly reference the parent topics starting from H1 down to the section’s own heading, showing the full section hierarchy (“In [H1], under [H2], in [H3]—”).
*
* Describe the whole section: Succinctly express the purpose, unique value, main facts, examples, or types of content found under this heading, including key details from all child blocks (paragraphs, lists, tables, images, etc.).
*
* Highlight distinguishing elements: Mention any features (lists, advice, steps, company comparisons, tips, etc.) that make this section unique or especially useful for search or navigation.
*
* Be fully self-contained: The reader should be able to understand what this section offers without reading the entire section—so the summary acts as a semantic “digest” for vector search.
*
* Be 30–50 words long (minimum 30), not counting heading references or stop-words. This is strict — never return a 1–2 sentence placeholder.
* 
* Use clear, natural language only; do not use formatting, bracket tags, Markdown, or code.
*
* End with a colon (:) or dash (—), signaling that a rich, descriptive phrase follows.
*
* Do NOT simply paraphrase the heading or copy-paste introductory lines.
*
* Do NOT return an empty or generic summary; fill the required word count with specific, informative content from the entire section.
*
* Example:
* Suppose the heading path is:
* H1: "Vegetarian Menu"
* H2: "Chef's Specials"
* H3: "Appetizers"
* H4: "Seaweed Salad"
*
* For the TypographyH4 "Seaweed Salad", the summary should be:
* "In the Vegetarian Menu, under Chef's Specials, specifically in Appetizers—this section provides a comprehensive overview of Seaweed Salad: an introductory description, key ingredients and nutritional benefits, preparation techniques, typical serving suggestions, and how this dish embodies the restaurant's approach to healthy, innovative plant-based cuisine. This content helps diners and researchers explore why Seaweed Salad is recommended as a light, mineral-rich starter." [next, write 30–50 words describing Seaweed Salad in a way optimized for AI semantic retrieval]
 * =============================================================================
 * (All other previously defined sections, schemas, and notes remain unchanged.)
 * =============================================================================
 */

import { ImageProps } from "next/image";
import { Metadata } from "next";

type UserRole =
  | "guest"
  | "architect"
  | "admin"
  | "editor"
  | "authUser"
  | "subscriber"
  | "customer"
  | "apiUser";

type BadgeName = "NEW" | "AD" | "UPDATED" | "IMPORTANT" | "RECOMMENDATION";

export type PageType =
  | "homePage"
  | "basePage"
  | "footerPage"
  | "blog"
  | "document"
  | "guide"
  | "shopItem";

interface MenuLink {
  id: string;
  name: string;
  href?: string;
  roles: UserRole[];
  hasBadge?: boolean;
  badgeName?: BadgeName;
  badgeLink?: string;
  order?: number;
  isPublished: boolean;
  isVectorConnected: boolean;
  isChatSynchronized: boolean;
  type: PageType;
  design?: string;
}

type PageData = MenuLink;

export type StandartSection = "";

export type CustomSection = "";

export interface HeaderSection {
  announcement?: {
    badgeText?: string;
    descriptionText?: string;
    href?: string;
  };
  title: string;
  customTitleCss?: string;
  level?: 1 | 2 | 3 | 4;
  description?: string;
  customDescriptionCss?: string;
  position?: "left" | "center" | "right";
  showBorder?: boolean;
}

export interface FooterSection {
  actions?: {
    label: string;
    href: string;
    variant?:
      | "default"
      | "secondary"
      | "destructive"
      | "outline"
      | "ghost"
      | "link";
  }[];
}

export interface Section {
  id: string;
  summary?: string;
  headerContent: HeaderSection;
  bodyContent?: React.ReactNode;
  footerContent?: FooterSection;
  videoUrl?: string;
  imageUrl?: string;
  sectionClassName?: string;
  contentWrapperClassName?: string;
  customComponentsAnyTypeData?: any;
}

interface SimpleSectionFullScreenSizeImageProps
  extends Omit<ImageProps, "src" | "width" | "height" | "alt"> {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  hasBackdrop?: boolean;
  hasBorder?: boolean;
  hasRounded?: boolean;
  borderRadius?: string;
  aspectRatio?: "video" | "square" | "auto" | number | string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  className?: string;
  style?: React.CSSProperties;
}

export type SimpleSectionTypes = {
  SimpleSectionFullScreenSizeImage: SimpleSectionFullScreenSizeImageProps;
};

type SimpleSectionTypeName = keyof SimpleSectionTypes;

type TypographySectionTypes = {
  TypographyH1: React.HTMLAttributes<HTMLHeadingElement>;
  TypographyH2: React.HTMLAttributes<HTMLHeadingElement>;
  TypographyH3: React.HTMLAttributes<HTMLHeadingElement>;
  TypographyH4: React.HTMLAttributes<HTMLHeadingElement>;
  TypographyP: React.HTMLAttributes<HTMLParagraphElement>;
  TypographyBlockquote: React.HTMLAttributes<HTMLElement>;
  TypographyTable: { data: React.ReactNode[][] };
  TypographyList: { items: React.ReactNode[] };
  TypographyOrderedList: { items: React.ReactNode[] };
  TypographyLead: React.HTMLAttributes<HTMLParagraphElement>;
  TypographyLarge: React.HTMLAttributes<HTMLDivElement>;
  TypographySmall: React.HTMLAttributes<HTMLElement>;
  TypographyMuted: React.HTMLAttributes<HTMLParagraphElement>;
};

type TypographySectionTypeName = keyof TypographySectionTypes;

export interface SimpleSection {
  id: string;
  summary?: string;
  headerContent?: HeaderSection;
  order?: string;
  bodyContent: {
    type: SimpleSectionTypeName;
    props: SimpleSectionFullScreenSizeImageProps;
  };
}

export interface TypographySection {
  id: string;
  summary?: string;
  order?: string;
  bodyContent: {
    type: TypographySectionTypeName;
    props: TypographySectionTypes[TypographySectionTypeName];
  };
}

export interface StepSection {
  id: string;
  summary?: string;
  headerContent?: HeaderSection;
  order?: string;
  bodyContent: (
    | {
        sectionType: "Simple";
        type: SimpleSectionTypeName;
        props: SimpleSectionFullScreenSizeImageProps;
      }
    | {
        sectionType: "Typography";
        type: TypographySectionTypeName;
        props: TypographySectionTypes[TypographySectionTypeName];
      }
  )[];
}

export type ExtendedSection =
  | StandartSection
  | StepSection
  | SimpleSection
  | TypographySection;

export interface PageConfig {
  metadata: Metadata;
  pagedata: PageData;
  sections: ExtendedSection[];
}
