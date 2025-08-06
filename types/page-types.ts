/**
 * =============================================================================
 * ENHANCED AI BLOG CONTENT GENERATION SYSTEM — SEO & Quality Focused
 * Integration with existing markup and image rules
 * =============================================================================
 *
 * OBJECTIVE: Create high-quality blog pages capable of ranking in top search
 * engine positions for extended periods through comprehensive, in-depth content.
 *
 * =============================================================================
 * ENHANCED CONTENT STRUCTURE REQUIREMENTS — Structural Requirements
 * =============================================================================
 *
 * MANDATORY CONTENT HIERARCHY:
 *
 * └── H1 (1 piece) — Main page topic
 *     ├── Introduction: 200-300 words with keywords
 *     ├── Lead paragraph with hook sentence
 *     └── [...H2 (maximum 4-5 pieces) — Main sections]
 *          ├── Main text: minimum 500-800 words
 *          ├── 2-3 H3 subsections MANDATORY
 *          ├── Minimum 1 SimpleSectionFullScreenSizeImage
 *          ├── Lists, quotes, tables as needed
 *          ├── FAQ block or "Good to Know" (Requirements only for last sections)
 *          ├── 2-3 internal links
 *          └── [...H3 (2-3 under each H2) — Subtopics]
 *                ├── Main text: minimum 300-400 words
 *                ├── 2 H4 subsections MANDATORY
 *                ├── Practical examples with details
 *                ├── Supporting media elements
 *                └── [...H4 (minimum 2 under each H3) — Specific aspects]
 *                      ├── Main text: minimum 150-250 words
 *                      ├── Specific details with numbers
 *                      ├── Practical advice
 *                      └── Mini-conclusions
 *
 * MINIMUM VOLUME REQUIREMENTS:
 * - Total page volume: 3000-5000 words
 * - Header to text ratio: 1:10 (1 header — minimum 10 sentences)
 * - Keyword density: 1-2% of total text
 * - Reading time: 8-12 minutes
 *
 * =============================================================================
 * GENERAL IMAGE SECTION RULES — Enhanced
 * =============================================================================
 *
 * - This section formats full-screen images with optional style customizations.
 * - By default, always apply styles to display the image with:
 *   • Full width across the container or screen.
 *   • Video aspect ratio (aspect-ratio: 16/9 or class `aspect-video`).
 *   • A themed backdrop (subtle/gray or muted background with inner padding).
 *   • Rounded corners (large radius).
 *   • Border around the image if specified.
 *
 * ENHANCED IMAGE SOURCE POLICY:
 * - Every <SimpleSectionFullScreenSizeImage> SHOULD use real, relevant URLs when possible
 * - Use src="/public/placeholder.svg" only as fallback
 * - For SEO blogs: MINIMUM 1 hero image + 1 image per H2 section
 * - Images must have descriptive alt text with natural keyword inclusion
 * - If at least one image uses a URL other than the placeholder, the FIRST such
 *   URL must be copied into page-metadata fields intended for social previews
 *   (e.g., og:image, twitter:image). Ignore additional non-placeholder images
 *   for metadata.
 *
 * MANDATORY IMAGE PLACEMENT RULES:
 * - HERO IMAGE: Must appear after H1 + Lead paragraph combination
 * - SECTION IMAGES: Minimum 1 image per H2 section, preferably in the middle
 * - H3 IMAGES: Optional, but recommended for visual topics
 * - Image captions should be provided when context-relevant
 *
 * SECTION ORDERING RULE — Enhanced:
 *
 * For SEO-optimized blog content, the MANDATORY order is:
 * 1. TypographyH1 (main heading)
 * 2. TypographyLead (hook description 100-150 words)
 * 3. SimpleSectionFullScreenSizeImage (hero image - MANDATORY)
 * 4. First H2 section with content
 * 5. All remaining H2→H3→H4 hierarchical sections
 * 6. Optional FAQ section at the end
 *
 * All remaining sections follow after these initial blocks with strict hierarchy.
 *
 * =============================================================================
 * SEO CONTENT QUALITY REQUIREMENTS — New Standards
 * =============================================================================
 */

interface EnhancedSEOContentRequirements {
  // Mandatory elements for each heading level
  contentDepthRequirements: {
    H1: {
      introductionText: string; // 200-300 words with natural keyword inclusion
      leadParagraph: string; // 100-150 words, hook for reader
      keywordDensity: number; // 1-2% of section text
      heroImageRequired: true; // Mandatory image after lead
    };

    H2: {
      minimumWords: 500; // Minimum 500 words of main text
      requiredSubsections: 2 | 3; // Mandatory 2-3 H3 subsections
      mandatoryElements: {
        introductionParagraph: string; // Intro paragraph 100-150 words
        mainContent: string; // Main content 300-400 words
        practicalExample: string; // Practical example 100-150 words
        supportingList: string[]; // Supporting list 5-7 points
        conclusionParagraph: string; // Conclusion paragraph 50-100 words
      };
      mediaElements: {
        imageRequired: true; // Minimum 1 image per H2
        tableOrQuoteOptional: boolean; // Table or quote by context
      };
      internalLinks: string[]; // Minimum 2-3 internal links
    };

    H3: {
      minimumWords: 300; // Minimum 300 words
      requiredSubsections: 2; // Mandatory 2 H4 subsections
      contentElements: {
        detailedExplanation: string; // Detailed explanation 200-250 words
        specificExamples: string[]; // Specific examples 2-3 pieces
        practicalTips: string[]; // Practical tips 3-5 pieces
        supportingEvidence: string; // Supporting data 50-100 words
      };
      visualSupport: boolean; // Image or structured information
    };

    H4: {
      minimumWords: 150; // Minimum 150 words
      contentElements: {
        specificInformation: string; // Specific information 100-120 words
        actionableSteps: string[]; // Practical steps 3-5 pieces
        keyNumbers: number[]; // Key figures and statistics
        miniConclusion: string; // Mini-conclusion 30-50 words
      };
      factualDensity: number; // High density of facts and details
    };
  };

  // SEO optimization and semantics
  seoOptimization: {
    semanticCore: {
      primaryKeywords: string[]; // 1-2 primary keywords
      secondaryKeywords: string[]; // 5-8 secondary keywords
      lsiKeywords: string[]; // 10-15 LSI words (synonyms and related terms)
      longTailKeywords: string[]; // Long tail keywords for H3/H4
    };

    internalLinking: {
      anchorLinks: string[]; // Anchor links to sections within page
      relatedArticles: string[]; // Links to related articles
      crossReferences: string[]; // Cross-references between sections
      minimumLinksPerH2: number; // Minimum 2-3 links per H2
    };

    readabilityFactors: {
      averageReadingTime: number; // 8-12 minutes target time
      paragraphLength: number; // 3-5 sentences per paragraph
      sentenceComplexity: "mixed"; // Mixed sentence complexity
      transitionWords: string[]; // Transition words between paragraphs
    };
  };
}

/**
 * =============================================================================
 * FORMATTING RULES — STRICT ENFORCEMENT
 * =============================================================================
 * 
 * FORBIDDEN: Any HTML tags or Markdown syntax
 * ALLOWED: Only bracket tags [tag]content[/tag]
 * VIOLATION: Any HTML/Markdown = immediate rejection
 * 
 * Examples:
 * ❌ <b>text</b>, **text**, *text*, `code`, ### heading
 * ✅ [b]text[/b], [c-red]text[/c-red], [code]text[/code]
 * =============================================================================
 * SPECIAL BRACKET TAGS — allowed formatting (UNCHANGED)
 * =============================================================================
 *
 * /**
 * SPECIAL BRACKET TAGS — TypeScript Definition
 */

type Color = "red" | "green" | "blue" | "orange" | "violet" | "yellow";
type BasicTag = "b" | "i" | "u" | "s" | "code" | "u-dashed";
type ColorTag = `c-${Color}` | `bg-${Color}`;
type CheckboxTag = "cb-true" | "cb-false";
type LinkTag = `a href="${string}"`;
type Tag = BasicTag | ColorTag | CheckboxTag | LinkTag;

// Упрощенные правила
interface TagRules {
  format: `[${Tag}]${string}[/${Tag extends LinkTag ? "a" : Tag}]`;
  allowedTags: Tag[];
  maxTagsPerText: 3;
}

const validateBracketTag = (input: string): boolean => {
  const tagPattern = /\[([^\]]+)\](.*?)\[\/([^\]]+)\]/g;
  const matches = Array.from(input.matchAll(tagPattern));

  if (matches.length > 3) return false; // maxComplexity

  return matches.every((match) => {
    const [, openTag, , closeTag] = match;

    // Специальная обработка ссылок
    if (openTag.startsWith("a href=")) {
      return closeTag === "a";
    }

    return openTag === closeTag;
  });
};

type ValidExamples = [
  "[b]text[/b]",
  "[c-red]text[/c-red]",
  '[a href="https://example.com"]text[/a]',
  "[cb-true][/cb-true]"
];

type InvalidExamples = [
  "[b][i]nested[/i][/b]", // вложенность запрещена
  "[c-Red]text[/c-Red]", // неправильный регистр
  "[c-pink]text[/c-pink]", // несуществующий цвет
  "[b]text[/i]" // несоответствие тегов
];

type ComplexValid =
  "[b]Bold text[/b] and [c-red]red text[/c-red] and [i]italic[/i]";


// New section types for FAQ and additional blocks
interface EnhancedContentSections {
  // FAQ section
  FAQSection: {
    id: string;
    summary: string; // Filled according to H3 rules
    bodyContent: {
      type: "TypographyH3";
      props: {
        children:
          | "Frequently Asked Questions"
          | "Good to Know"
          | "Important Details";
      };
    }[];
    faqItems: {
      question: string; // Natural question with keywords
      answer: string; // Detailed answer 100-200 words
      keywords: string[]; // Relevant keywords
    }[];
  };

  // Useful tips block
  TipsSection: {
    id: string;
    summary: string;
    bodyContent: {
      type: "TypographyH4";
      props: { children: string }; // "💡 Expert Tip" | "⚠️ Important to Remember" | "🎯 Practical Recommendations"
    }[];
    tipsContent: {
      practicalTips: string[]; // 3-5 specific tips
      commonMistakes: string[]; // Common mistakes
      bestPractices: string[]; // Best practices
      additionalResources: string[]; // Additional resources
    };
  };

  // Enhanced comparison table
  EnhancedComparisonTable: {
    id: string;
    summary: string;
    headerContent: {
      title: string;
      description: string; // Table description 50-100 words
    };
    bodyContent: {
      type: "TypographyTable";
      props: {
        data: string[][]; // Minimum 3x4, maximum 6x8
        hasHeader: true;
        tableCaption: string; // Table caption
      };
    };
    tableAnalysis: string; // Table data analysis 100-150 words
  };
}

/**
 * =============================================================================
 * PARAMETER (PROP) LIST — Enhanced Image Properties
 * =============================================================================
 */

interface EnhancedImageProps extends SimpleSectionFullScreenSizeImageProps {
  // SEO-optimized image properties
  seoOptimization: {
    altTextWithKeywords: string; // Alt text with natural keyword inclusion
    captionText?: string; // Image caption for context
    contextualRelevance: string; // Description of image relevance to text
  };

  // Mandatory images by content types
  imageCategory:
    | "hero"
    | "section"
    | "example"
    | "infographic"
    | "screenshot"
    | "comparison";

  // Placement in SEO context
  placementContext: {
    afterHeadingLevel: 1 | 2 | 3 | 4; // After which heading level
    withinTextPosition: "beginning" | "middle" | "end"; // Position in text section
  };
}

/**
 * =============================================================================
 * FINAL TYPE DEFINITIONS — Enhanced (KEEPING EXISTING + ADDING NEW)
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

/**
 * =============================================================================
 * BLOG CONTENT GENERATION ALGORITHM — Quality Content Generation Algorithm
 * =============================================================================
 */

interface BlogContentGenerationAlgorithm {
  // Step 1: Topic analysis and semantic core creation
  topicAnalysis: {
    primaryTopic: string;
    targetAudience: string;
    searchIntent:
      | "informational"
      | "commercial"
      | "navigational"
      | "transactional";
    competitorAnalysis: string[]; // Analysis of top-3 competitors
  };

  // Step 2: Structure planning (maximum 4-5 H2)
  structurePlanning: {
    maxH2Sections: 5; // Maximum 5 H2 sections
    mandatoryH3PerH2: 2 | 3; // Mandatory 2-3 H3 under each H2
    mandatoryH4PerH3: 2; // Mandatory 2 H4 under each H3
    totalTargetWords: number; // 3000-5000 words total volume
  };

  // Step 3: Rich content creation
  contentCreation: {
    introductionRequirements: {
      hookSentence: string; // Catchy first sentence
      problemStatement: string; // Problem statement
      valueProposition: string; // Value proposition
      articlePreview: string; // Article content preview
    };

    sectionDevelopment: {
      detailedExplanations: boolean; // Detailed explanations
      practicalExamples: boolean; // Practical examples
      statisticsAndFacts: boolean; // Statistics and facts
      actionableAdvice: boolean; // Practical advice
      visualSupport: boolean; // Visual support
    };
  };

  // Step 4: SEO optimization and final check
  seoOptimization: {
    keywordDensityCheck: number; // 1-2% density
    internalLinkingCheck: boolean; // Internal links check
    readabilityScore: number; // Readability assessment
    metadataOptimization: boolean; // Metadata optimization
    imageAltTextCheck: boolean; // Image alt texts check
  };
}

/**
 * =============================================================================
 * QUALITY VALIDATION CHECKLIST — Content Quality Checklist
 * =============================================================================
 */

interface ContentQualityValidation {
  // Mandatory checks before publication:
  structuralChecks: {
    h1Present: boolean; // ✓ H1 present (1 piece)
    h2CountValid: boolean; // ✓ No more than 5 H2 sections
    h3CountValid: boolean; // ✓ Each H2 contains 2-3 H3
    h4CountValid: boolean; // ✓ Each H3 contains 2 H4
    hierarchyMaintained: boolean; // ✓ Hierarchy maintained
  };

  contentChecks: {
    totalWordCount: number; // ✓ Total volume 3000+ words
    h2MinWords: boolean; // ✓ Each H2 minimum 500 words
    h3MinWords: boolean; // ✓ Each H3 minimum 300 words
    h4MinWords: boolean; // ✓ Each H4 minimum 150 words
    keywordDensity: number; // ✓ Keyword density 1-2%
  };

  enhancementChecks: {
    heroImagePresent: boolean; // ✓ Hero image after H1
    sectionImagesCount: number; // ✓ Minimum 1 image per H2
    internalLinksCount: number; // ✓ Minimum 2-3 internal links per H2
    listsAndTablesPresent: boolean; // ✓ Lists and tables for structuring
    faqOrTipsPresent: boolean; // ✓ FAQ or "Good to Know" blocks
  };

  seoChecks: {
    titleOptimized: boolean; // ✓ Title optimized
    metaDescriptionPresent: boolean; // ✓ Meta description filled
    altTextsOptimized: boolean; // ✓ Image alt texts optimized
    summariesFilled: boolean; // ✓ Summaries filled for H2-H4
    readingTimeOptimal: boolean; // ✓ Reading time 8-12 minutes
  };
}

/**
 * =============================================================================
 * EIFFEL TOWER EXAMPLE — Usage Example with Eiffel Tower
 * =============================================================================
 */

// Example of correct structure for "Eiffel Tower" topic:
const eiffelTowerExampleStructure = {
  H1: "The Eiffel Tower — Symbol of Paris and Engineering Marvel (200-300 words introduction)",

  H2_1: "History and Construction of the Eiffel Tower (500-800 words)",
  H3_1_1: "Planning and Design Phase 1884-1887 (300-400 words)",
  H4_1_1_1: "Gustave Eiffel's Vision and Initial Sketches (150-250 words)",
  H4_1_1_2: "Engineering Challenges and Solutions (150-250 words)",

  H3_1_2: "Construction Process 1887-1889 (300-400 words)",
  H4_1_2_1: "Foundation Work and Iron Framework Assembly (150-250 words)",
  H4_1_2_2: "Workforce and Construction Timeline (150-250 words)",

  H2_2: "Architecture and Structural Engineering (500-800 words)",
  H3_2_1: "Iron Lattice Design and Wind Resistance (300-400 words)",
  H4_2_1_1: "Mathematical Calculations and Structural Analysis (150-250 words)",
  H4_2_1_2: "Material Specifications and Quality Control (150-250 words)",

  H3_2_2: "Dimensions and Technical Specifications (300-400 words)",
  H4_2_2_1: "Height Measurements and Comparative Analysis (150-250 words)",
  H4_2_2_2: "Weight Distribution and Load-Bearing Capacity (150-250 words)",

  H2_3: "Cultural Impact and Tourism (500-800 words)",
  H3_3_1: "Symbol of French Culture and Identity (300-400 words)",
  H4_3_1_1: "International Recognition and World Exhibitions (150-250 words)",
  H4_3_1_2: "Representation in Art and Literature (150-250 words)",

  H3_3_2: "Modern Tourism and Economic Impact (300-400 words)",
  H4_3_2_1: "Annual Visitor Statistics and Revenue (150-250 words)",
  H4_3_2_2: "Tourism Infrastructure and Services (150-250 words)",

  H2_4: "Maintenance and Preservation (500-800 words)",
  H3_4_1: "Regular Maintenance Cycles and Procedures (300-400 words)",
  H4_4_1_1: "Paint Renewal and Corrosion Prevention (150-250 words)",
  H4_4_1_2: "Structural Inspections and Safety Measures (150-250 words)",

  H3_4_2: "Modernization and Future Plans (300-400 words)",
  H4_4_2_1: "LED Lighting System and Energy Efficiency (150-250 words)",
  H4_4_2_2: "Security Enhancements and Visitor Experience (150-250 words)",

  totalWordCount: "4000+ words",
  totalSections: "10-12 sections instead of 15",
  depth: "Maximum depth development of each topic",
};

/**
 * =============================================================================
 * USAGE INSTRUCTIONS — Usage Instructions
 * =============================================================================
 *
 * When generating a blog page MANDATORY:
 *
 * 1. Start with topic analysis and semantic core building
 * 2. Create structure: H1 → Lead → Hero Image → max 5 H2 (each with 2-3 H3, each with 2 H4)
 * 3. Fill each section according to minimum word requirements
 * 4. Add practical elements: examples, tips, lists, tables
 * 5. Include minimum 1 image per each H2 section
 * 6. Add internal links and cross-references
 * 7. Create detailed summaries only for H2-H4 headings
 * 8. Conduct final quality checklist validation
 *
 * RESULT: Page with 3000-5000 words volume, capable of competing
 * in top search engine results thanks to content depth and quality.
 *
 * =============================================================================
 */

/** export {
 *EnhancedSEOContentRequirements,
 *EnhancedContentSections,
 *BlogContentGenerationAlgorithm,
 *ContentQualityValidation
 *};
 */
