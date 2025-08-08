/**
 * =============================================================================
 * SECTION 1: ENHANCED AI BLOG CONTENT GENERATION SYSTEM
 * Core System Definition and Objectives
 * =============================================================================
 * 
 * OBJECTIVE: Generate high-quality, SEO-optimized blog content capable of 
 * ranking in top search positions through comprehensive, structured content.
 * 
 * PRIORITY HIERARCHY (in order of precedence):
 * 1. TypeScript schema compliance (pageConfig structure)
 * 2. Content structure requirements (H1→H2→H3→H4 hierarchy)
 * 3. Contextual content requirements (mandatory intro paragraphs)
 * 4. Markdown formatting for Typography components only
 * 5. SEO optimization requirements
 */

/**
 * =============================================================================
 * SECTION 2: ENHANCED CONTENT STRUCTURE REQUIREMENTS
 * Mandatory Content Hierarchy with Contextual Content Rules
 * =============================================================================
 */

interface EnhancedContentStructureRequirements {
  // MANDATORY CONTENT HIERARCHY WITH CONTEXTUAL CONTENT
  hierarchy: {
    H1: {
      count: 1;
      content: "Main page topic";
      followedBy: ["Introduction: 200-300 words", "Lead paragraph with hook"];
      noContextualContentRequired: true;
    };
    H2: {
      maxCount: 4;
      minWordsPerSection: 400;
      mandatoryContextualContent: {
        placement: "Immediately after H2, before any H3 or structural elements";
        wordCount: "100-150 words";
        purpose: "Explains value and scope of entire H2 section";
        structure: "1-2 paragraphs introducing the section topic";
      };
      mandatoryElements: {
        introductionParagraph: "100-150 words (contextual content)";
        mainContent: "200-250 words";
        practicalExample: "50-100 words";
      };
      requiredSubsections: 2; // Exactly 2 H3 subsections
      imageRequired: true;
      internalLinks: "minimum 2 per H2";
    };
    H3: {
      minWordsPerSection: 200;
      mandatoryContextualContent: {
        placement: "Immediately after H3, before any H4 or structural elements";
        wordCount: "80-120 words";
        purpose: "Context and significance of H3 subsection";
        structure: "1-2 paragraphs explaining subsection relevance";
      };
      requiredSubsections: 2; // Exactly 2 H4 subsections
      contentElements: {
        contextualIntroduction: "80-120 words (contextual content)";
        detailedExplanation: "120-150 words";
        practicalTips: "50-80 words";
      };
    };
    H4: {
      minWordsPerSection: 100;
      contextualContentOptional: true;
      contentElements: {
        specificInformation: "70-90 words";
        miniConclusion: "30-50 words";
      };
    };
  };

  // CONTEXTUAL CONTENT RULES FOR STRUCTURAL ELEMENTS
  structuralElementsRules: {
    beforeLists: {
      rule: "1-2 paragraphs before any list (ordered or unordered)";
      minimumWords: "60-100 words";
      purpose: "Explanation of list relevance and context";
    };
    beforeTables: {
      rule: "1-2 paragraphs before any table";
      minimumWords: "60-100 words";
      purpose: "Introduction to table content and significance";
    };
    beforeImages: {
      rule: "1 paragraph before complex images or infographics";
      minimumWords: "40-80 words";
      purpose: "Context for visual content";
    };
  };

  // REVISED REALISTIC VOLUME CALCULATION
  revisedVolumeTargets: {
    H1Section: "200-300 words";
    H2ContextualContent: "400-600 words (4 × 100-150)"; // NEW
    H2MainContent: "1600 words (4 × 400)";
    H3ContextualContent: "640-960 words (8 × 80-120)"; // NEW
    H3MainContent: "1600 words (8 × 200)";
    H4Content: "1600 words (16 × 100)";
    structuralElementsIntros: "200-400 words"; // NEW
    totalEstimate: "6240-6860 words"; // UPDATED
    readingTime: "16-19 minutes"; // UPDATED
  };
}

/**
 * =============================================================================
 * SECTION 3: MARKDOWN FORMATTING RULES
 * Typography Components Only – react-markdown/MDX Standard
 * =============================================================================
 *
 * CRITICAL RULE: Markdown formatting is ONLY allowed within Typography components,
 * rendered using react-markdown (or @mdx-js/react for MDX), with remark-gfm and
 * rehype-raw if needed. All other component types (Simple, Custom, Standard sections)
 * must receive plain text only—NO markdown, NO HTML, and NO inline styles.
 *
 * Style (colors, font size, emphasis, etc.) must be applied EXCLUSIVELY through
 * CSS classes on the Typography components—not via content, HTML tags, or inline props.
 *
 * Implementation instructions:
 * - Typography sections (e.g. TypographyH1, TypographyH2, TypographyP, TypographyBlockquote, TypographyTable, etc.)
 *   must receive the content as a markdown string—not as React elements, HTML, or styled text.
 * - Allowed formatting in Typography content:
 *     - Markdown bold (**text**)
 *     - Markdown italics (_text_)
 *     - Blockquotes (> block)
 *     - Lists
 *     - Code spans and blocks
 *     - Tables (pipe syntax, GFM, etc.)
 *     - No raw HTML or inline styles allowed in content
 * - Render Typography content using react-markdown with remark-gfm (and rehype-raw ONLY for very limited, trusted HTML if absolutely needed).
 * - Any design (color, font size, weight, etc.) must be applied through the Typography component's CSS classes.
 * - All non-Typography (Simple, Custom, Standard) sections must receive only plain strings—NO markdown, NO HTML, no formatting.
 *
 * EXAMPLES (ALLOWED):
 * // In Typography section:
 *   "children": "# Ferries in **Tenerife**: The Complete 2025 Guide"
 *   "children": "| Operator | Routes | Features |\n|---|---|---|\n| Olsen | ... | ... |"
 *
 * // In Simple or Custom sections:
 *   "bodyContent": { "type": "SimpleSectionFullScreenSizeImage", "props": { "alt": "Ferry in Tenerife 2025" } }
 *
 * EXAMPLES (PROHIBITED):
 * - "children": "<span style=\"color:blue\">Tenerife</span>"
 * - "children": "<b>Tenerife</b>"
 * - "children": "**Tenerife**", if not passed to a component that parses markdown (must not be treated as React child)
 * - "children": "<b style='font-size:48px'>Tenerife</b>"
 *
 * =============================================================================
 */

/**
 * =============================================================================
 * SECTION 4: IMAGE REQUIREMENTS AND PLACEMENT
 * Enhanced Image Rules with Optional Alt Text
 * =============================================================================
 */

interface ImageRequirements {
  // PLACEMENT RULES
  mandatoryPlacements: {
    heroImage: "After H1 + Lead paragraph combination";
    sectionImages: "Minimum 1 per H2 section";
    h3Images: "Optional but recommended";
  };

  // SOURCE PREFERENCES (not requirements)
  sourcePreferences: {
    preferred: "Real, relevant URLs when available";
    fallback: "/public/placeholder.svg";
    altText: "Optional - code generates fallback if missing";
  };

  // SEO OPTIMIZATION
  seoOptimization: {
    descriptiveAlt: "When provided, include natural keywords";
    contextualRelevance: "Image should relate to surrounding content";
    socialMetadata: "First non-placeholder image used for og:image";
  };

  // CONTEXTUAL CONTENT FOR IMAGES
  contextualImageRules: {
    complexImages: "1 paragraph (40-80 words) before infographics or detailed visuals";
    simpleImages: "Brief context can be integrated into surrounding paragraphs";
    imageGroups: "Introduction paragraph when multiple related images are presented";
  };
}

/**
 * =============================================================================
 * SECTION 5: SUMMARY RULES
 * SEO Search Optimization - H2/H3/H4 Only
 * =============================================================================
 */

interface SummaryRules {
  // CLEAR SCOPE DEFINITION
  applicableHeadings: ["TypographyH2", "TypographyH3", "TypographyH4"];
  excludedHeadings: ["TypographyH1", "all non-heading components"];
  
  // SUMMARY REQUIREMENTS
  requirements: {
    lengthTarget: "40-60 words (content words, excluding heading references)";
    hierarchyReference: "Include full heading path from H1 down";
    contentCoverage: "Describe complete section value including contextual content";
    keywordInclusion: "Natural integration of relevant terms";
    valueProposition: "What reader learns/achieves from this section";
    selfContained: "Understandable without reading the section";
    contextualContentIncluded: "Must reflect both contextual and detailed content";
  };

  // ENHANCED EXAMPLE TEMPLATE
  template: "In [H1_topic], under [H2_section]—[H3/H4_heading] [introduces_context] [provides_detailed_coverage] [includes_key_elements] [delivers_specific_value] helping readers [achieve_outcome].";
}

/**
 * =============================================================================
 * SECTION 6: SEO CONTENT OPTIMIZATION
 * Keyword Strategy and Internal Linking
 * =============================================================================
 */

interface SEOOptimization {
  keywordStrategy: {
    primaryKeywords: "1-2 main terms";
    secondaryKeywords: "5-8 supporting terms";
    lsiKeywords: "10-15 semantic variations";
    keywordDensity: "1-2% of total content";
    contextualKeywordPlacement: "Natural integration in contextual paragraphs";
  };

  internalLinking: {
    minimumPerH2: 2;
    anchorLinks: "Links to sections within same page";
    relatedArticles: "Links to related blog posts";
    crossReferences: "Between different sections";
    contextualLinking: "Links naturally integrated in contextual paragraphs";
  };

  readabilityFactors: {
    paragraphLength: "3-5 sentences maximum";
    sentenceComplexity: "Mix of simple and complex structures";
    transitionWords: "Use between paragraphs for flow";
    contextualTransitions: "Smooth flow from contextual to detailed content";
    targetReadingTime: "16-19 minutes"; // UPDATED
  };
}

/**
 * =============================================================================
 * SECTION 7: TYPESCRIPT SCHEMA COMPLIANCE
 * pageConfig and Dependent Types (UNCHANGED)
 * =============================================================================
 */

// CRITICAL: These types must remain unchanged as they form working project schema

import { ImageProps } from "next/image";
import { Metadata } from "next";
import { UserRole } from "@/app/config/user-roles";
import { BadgeName } from "@/app/config/badge-config";



export type PageType =
  | "homePage"
  | "basePage" 
  | "footerPage"
  | "blog"
  | "document"
  | "guide"
  | "shopItem";



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
  headerContent: HeaderSection;
  bodyContent?: React.ReactNode;
  footerContent?: FooterSection;
  linksData?: LinksData[];
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

export type SimpleSectionTypeName = keyof SimpleSectionTypes;

export type TypographySectionTypes = {
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

export type TypographySectionTypeName = keyof TypographySectionTypes;

export interface SimpleSection {
  id: string;
  order?: string;
  linksData?: LinksData[];
  bodyContent: {
    type: SimpleSectionTypeName;
    props: SimpleSectionTypes[SimpleSectionTypeName];
  };
}

export interface TypographySection {
  id: string;
  order?: string;
  linksData?: LinksData[];
  bodyContent: {
    type: TypographySectionTypeName;
    props: TypographySectionTypes[TypographySectionTypeName];
  };
}

export interface StepSection {
  id: string;
  linksData?: LinksData[];
  order?: string;
  bodyContent: (
    | {
        sectionType: "Simple";
        type: SimpleSectionTypeName;
        props: SimpleSectionTypes[SimpleSectionTypeName];
      }
    | {
        sectionType: "Typography";
        type: TypographySectionTypeName;
        props: TypographySectionTypes[TypographySectionTypeName];
      }
  )[];
}

export type ExtendedSection =
  | Section
  | SimpleSection
  | StepSection
  | TypographySection;

export interface SummaryData {
  id: string;
  path: string;
  tags?: string[];
  childSummary: string;
  parentSummary: string;
  selfSummary: string;
}


export interface LinksData {
  outgoingLinks: string[];      
  incomingLinks: string[];      
  externalLinks: string[];      
}


export interface Activities {
  likesCount: number;           
  bookmarksCount: number;       
}

interface PageImages {
  id: string;
  alt?: string;
  href?: string;
}
export interface PageData {
  metadata?: Metadata;
  id: string;
  linkName: string;
  title?:string;
  description?:string
  images?:PageImages[]
  keyWords?: string[]
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
  summaryData?: SummaryData[];
  linksData?: LinksData[];
  createdAt?: string;           
  updatedAt?: string; 
  sections?: ExtendedSection[];
}



/**
 * =============================================================================
 * SECTION 8: ENHANCED CONTENT GENERATION ALGORITHM
 * Step-by-Step Content Creation Process with Contextual Content
 * =============================================================================
 */

interface EnhancedContentGenerationAlgorithm {
  step1_analysis: {
    topicAnalysis: "Identify primary topic and target audience";
    searchIntent: "Determine informational/commercial/navigational intent";
    semanticCore: "Build primary/secondary/LSI keyword lists";
  };

  step2_structure: {
    createH1: "Single main heading with hook introduction";
    planH2Sections: "Maximum 4 main sections, each with clear focus";
    outlineH3H4: "2 H3 per H2, 2 H4 per H3 - strict hierarchy";
    planContextualContent: "Plan contextual paragraphs for each H2 and H3";
  };

  step3_content: {
    writeIntroduction: "200-300 words with value proposition";
    createContextualContent: {
      H2Context: "100-150 words introducing each H2 section before H3s";
      H3Context: "80-120 words introducing each H3 section before H4s";
      structuralIntros: "60-100 words before lists, tables, complex elements";
    };
    developDetailedSections: "Follow volume requirements per heading level";
    addPracticalElements: "Examples, tips, statistics, actionable advice";
    insertVisualSupport: "Images, callouts, structured information";
  };

  step4_optimization: {
    keywordIntegration: "Natural keyword placement in contextual and detailed content";
    internalLinking: "Minimum 2 links per H2 section, integrated naturally";
    qualityValidation: "Final structure and contextual content review";
  };
}

/**
 * =============================================================================
 * SECTION 9: ENHANCED QUALITY VALIDATION CHECKLIST
 * Final Verification Including Contextual Content
 * =============================================================================
 */

interface EnhancedQualityValidationChecklist {
  structuralValidation: {
    singleH1: "✓ Exactly 1 H1 heading";
    maxH2Count: "✓ Maximum 4 H2 sections";
    mandatoryH3: "✓ Exactly 2 H3 under each H2";
    mandatoryH4: "✓ Exactly 2 H4 under each H3";
    hierarchyMaintained: "✓ No skipped heading levels";
  };

  contextualContentValidation: {
    H2ContextualContent: "✓ 100-150 words after each H2, before H3s";
    H3ContextualContent: "✓ 80-120 words after each H3, before H4s";
    structuralElementsIntros: "✓ Contextual content before lists, tables, images";
    contextualFlow: "✓ Smooth transitions from contextual to detailed content";
    noOrphanHeadings: "✓ No headings without accompanying content";
  };

  contentValidation: {
    totalVolume: "✓ 6240-6860 words achieved";
    contextualContentVolume: "✓ 1040-1360 words of contextual content";
    sectionVolumes: "✓ Minimum words per heading level met";
    keywordDensity: "✓ 1-2% keyword density maintained across all content";
    readingTime: "✓ 16-19 minutes target time";
  };

  enhancementValidation: {
    heroImagePresent: "✓ Image after H1 + Lead";
    sectionImages: "✓ Minimum 1 image per H2";
    imageContexts: "✓ Contextual content before complex images";
    internalLinks: "✓ Minimum 2 links per H2";
    markdownInTypographyOnly: "✓ Markdown only in Typography components";
    plainTextInOthers: "✓ Plain text in Simple/Custom/Standard sections";
  };

  seoValidation: {
    altTextOptimized: "✓ Alt text includes keywords when provided";
    metadataOptimized: "✓ Title, description, and og:image set";
    internalLinkingComplete: "✓ Cross-references and related articles linked";
    contextualKeywords: "✓ Keywords naturally integrated in contextual paragraphs";
  };
}

/**
 * =============================================================================
 * SECTION 10: ENHANCED IMPLEMENTATION EXAMPLE
 * Structured Blog Post Template with Contextual Content
 * =============================================================================
 */

// Enhanced example structure for "The Future of AI in Healthcare" topic:
const enhancedBlogStructure = {
  H1: "The Future of AI in Healthcare: Transforming Patient Care and Medical Innovation (250 words)",
  
  H2_1: "AI Diagnostic Technologies and Medical Imaging",
  H2_1_Context: "Introduction to AI diagnostics importance and overview (120 words)",
  H2_1_Content: "Main content (280 words)",
  
  H3_1_1: "Machine Learning in Radiology and Pathology",
  H3_1_1_Context: "Context for ML applications in medical imaging (100 words)",
  H3_1_1_Content: "Detailed content (100 words)",
  H4_1_1_1: "Deep Learning Algorithms for Cancer Detection (100 words)",
  H4_1_1_2: "Real-time Imaging Analysis and Clinical Integration (100 words)",
  
  H3_1_2: "Predictive Analytics for Early Disease Detection",
  H3_1_2_Context: "Introduction to predictive analytics value (100 words)",
  H3_1_2_Content: "Detailed content (100 words)",
  H4_1_2_1: "Risk Assessment Models and Patient Screening (100 words)",
  H4_1_2_2: "Biomarker Analysis and Genetic Predictions (100 words)",

  // Pattern continues for H2_2, H2_3, H2_4...

  totalWordCount: "6400+ words",
  contextualContent: "1200+ words of contextual introductions",
  structureCompliance: "4 H2, 8 H3, 16 H4 sections with mandatory contextual content",
  mathematicalConsistency: "All volume requirements achievable and realistic"
};

/**
 * =============================================================================
 * SECTION 11: CONTEXTUAL CONTENT TEMPLATES
 * Ready-to-Use Templates for Different Content Types
 * =============================================================================
 */

interface ContextualContentTemplates {
  H2ContextualTemplate: {
    structure: "Problem statement + Section overview + Value proposition";
    example: "Understanding [topic] has become crucial for [audience] because [problem/opportunity]. This section explores [main aspects] through [approach]. You'll discover [specific benefits] that will help you [achieve outcome].";
    wordRange: "100-150 words";
  };

  H3ContextualTemplate: {
    structure: "Subsection importance + Connection to H2 + What's covered";
    example: "[Subtopic] represents a critical component of [H2 topic] due to [specific reason]. Building on [H2 context], this subsection examines [specific aspects] and provides [practical elements].";
    wordRange: "80-120 words";
  };

  structuralElementTemplates: {
    beforeTable: "The following table summarizes [data type] to help you [purpose]:";
    beforeList: "Key [elements/steps/factors] include:";
    beforeImage: "The visualization below demonstrates [concept] and illustrates [specific point]:";
    wordRange: "60-100 words per structural element introduction";
  };
}

/**
 * =============================================================================
 * USAGE INSTRUCTIONS FOR ENHANCED IMPLEMENTATION
 * =============================================================================
 * 
 * When generating blog content:
 * 
 * 1. Follow Section 2 enhanced structure requirements exactly
 * 2. Create mandatory contextual content for H2 and H3 headings
 * 3. Add contextual introductions before structural elements
 * 4. Use Markdown only in Typography components (Section 3)
 * 5. Include mandatory images with contextual introductions (Section 4)
 * 6. Implement enhanced SEO optimization (Section 6)
 * 7. Maintain strict TypeScript schema compliance (Section 7)
 * 8. Follow enhanced step-by-step algorithm (Section 8)
 * 9. Complete enhanced validation checklist (Section 9)
 * 10. Use Section 10 example as structural template
 * 11. Apply contextual content templates from Section 11
 * 
 * CRITICAL SUCCESS FACTORS:
 * - Contextual content under every H2 and H3 heading
 * - No orphan headings without accompanying text
 * - Smooth flow from contextual to detailed content
 * - Realistic word count targets including contextual content
 * - Clear separation between Typography and other components
 * - Optional alt text with automatic fallback generation
 * - Structured organization for maintainability
 */
