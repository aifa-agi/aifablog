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
 * 3. Markdown formatting for Typography components only
 * 4. SEO optimization requirements
 * 5. Vector search optimization
 */

/**
 * =============================================================================
 * SECTION 2: CONTENT STRUCTURE REQUIREMENTS
 * Mandatory Content Hierarchy and Volume Standards
 * =============================================================================
 */

interface ContentStructureRequirements {
  // MANDATORY CONTENT HIERARCHY
  hierarchy: {
    H1: {
      count: 1;
      content: "Main page topic";
      followedBy: ["Introduction: 200-300 words", "Lead paragraph with hook"];
    };
    H2: {
      maxCount: 4; // Reduced from 5 to resolve volume conflicts
      minWordsPerSection: 400; // Reduced from 500 to make math work
      mandatoryElements: {
        introductionParagraph: "100-150 words";
        mainContent: "200-250 words"; // Reduced from 300-400
        practicalExample: "50-100 words"; // Reduced from 100-150
      };
      requiredSubsections: 2; // Exactly 2 H3 subsections (not 2-3)
      imageRequired: true;
      internalLinks: "minimum 2 per H2";
    };
    H3: {
      minWordsPerSection: 200; // Reduced from 300
      requiredSubsections: 2; // Exactly 2 H4 subsections
      contentElements: {
        detailedExplanation: "120-150 words"; // Reduced from 200-250
        practicalTips: "50-80 words"; // Reduced significantly
      };
    };
    H4: {
      minWordsPerSection: 100; // Reduced from 150
      contentElements: {
        specificInformation: "70-90 words"; // Reduced from 100-120
        miniConclusion: "30-50 words";
      };
    };
  };

  // REALISTIC VOLUME CALCULATION
  volumeTargets: {
    H1Section: "200-300 words";
    totalH2Content: "1600 words (4 × 400)"; // 4 H2 × 400 words each
    totalH3Content: "1600 words (8 × 200)"; // 8 H3 × 200 words each  
    totalH4Content: "1600 words (16 × 100)"; // 16 H4 × 100 words each
    totalEstimate: "5000-5200 words"; // Achievable target
    readingTime: "12-15 minutes";
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
}

/**
 * =============================================================================
 * SECTION 5: SUMMARY RULES
 * Vector Search Optimization - H2/H3/H4 Only
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
    contentCoverage: "Describe complete section value and key points";
    keywordInclusion: "Natural integration of relevant terms";
    valueProposition: "What reader learns/achieves from this section";
    selfContained: "Understandable without reading the section";
  };

  // EXAMPLE TEMPLATE
  template: "In [H1_topic], under [H2_section]—[H3/H4_heading] [describes_what] [includes_key_elements] [provides_specific_value] helping readers [achieve_outcome].";
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
  };

  internalLinking: {
    minimumPerH2: 2;
    anchorLinks: "Links to sections within same page";
    relatedArticles: "Links to related blog posts";
    crossReferences: "Between different sections";
  };

  readabilityFactors: {
    paragraphLength: "3-5 sentences maximum";
    sentenceComplexity: "Mix of simple and complex structures";
    transitionWords: "Use between paragraphs for flow";
    targetReadingTime: "12-15 minutes";
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
  summary?: string;
  order?: string;
  bodyContent: {
    type: SimpleSectionTypeName;
    props: SimpleSectionTypes[SimpleSectionTypeName];
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

export interface PageConfig {
  metadata: Metadata;
  pagedata: PageData;
  sections: ExtendedSection[];
}

/**
 * =============================================================================
 * SECTION 8: CONTENT GENERATION ALGORITHM
 * Step-by-Step Content Creation Process
 * =============================================================================
 */

interface ContentGenerationAlgorithm {
  step1_analysis: {
    topicAnalysis: "Identify primary topic and target audience";
    searchIntent: "Determine informational/commercial/navigational intent";
    semanticCore: "Build primary/secondary/LSI keyword lists";
  };

  step2_structure: {
    createH1: "Single main heading with hook introduction";
    planH2Sections: "Maximum 4 main sections, each with clear focus";
    outlineH3H4: "2 H3 per H2, 2 H4 per H3 - strict hierarchy";
  };

  step3_content: {
    writeIntroduction: "200-300 words with value proposition";
    developSections: "Follow volume requirements per heading level";
    addPracticalElements: "Examples, tips, statistics, actionable advice";
    insertVisualSupport: "Images, callouts, structured information";
  };

  step4_optimization: {
    keywordIntegration: "Natural keyword placement at target density";
    internalLinking: "Minimum 2 links per H2 section";
    summaryCreation: "Detailed summaries for H2/H3/H4 headings only";
    qualityValidation: "Final structure and content review";
  };
}

/**
 * =============================================================================
 * SECTION 9: QUALITY VALIDATION CHECKLIST
 * Final Verification Before Publication
 * =============================================================================
 */

interface QualityValidationChecklist {
  structuralValidation: {
    singleH1: "✓ Exactly 1 H1 heading";
    maxH2Count: "✓ Maximum 4 H2 sections";
    mandatoryH3: "✓ Exactly 2 H3 under each H2";
    mandatoryH4: "✓ Exactly 2 H4 under each H3";
    hierarchyMaintained: "✓ No skipped heading levels";
  };

  contentValidation: {
    totalVolume: "✓ 5000-5200 words achieved";
    sectionVolumes: "✓ Minimum words per heading level met";
    keywordDensity: "✓ 1-2% keyword density maintained";
    readingTime: "✓ 12-15 minutes target time";
  };

  enhancementValidation: {
    heroImagePresent: "✓ Image after H1 + Lead";
    sectionImages: "✓ Minimum 1 image per H2";
    internalLinks: "✓ Minimum 2 links per H2";
    markdownInTypographyOnly: "✓ Markdown only in Typography components";
    plainTextInOthers: "✓ Plain text in Simple/Custom/Standard sections";
  };

  seoValidation: {
    summariesCompleted: "✓ Summaries for H2/H3/H4 only";
    altTextOptimized: "✓ Alt text includes keywords when provided";
    metadataOptimized: "✓ Title, description, and og:image set";
    internalLinkingComplete: "✓ Cross-references and related articles linked";
  };
}

/**
 * =============================================================================
 * SECTION 10: IMPLEMENTATION EXAMPLE
 * Structured Blog Post Template
 * =============================================================================
 */

// Example structure for "The Future of AI in Healthcare" topic:
const exampleBlogStructure = {
  H1: "The Future of AI in Healthcare: Transforming Patient Care and Medical Innovation (250 words)",
  
  H2_1: "AI Diagnostic Technologies and Medical Imaging (400 words)",
  H3_1_1: "Machine Learning in Radiology and Pathology (200 words)",
  H4_1_1_1: "Deep Learning Algorithms for Cancer Detection (100 words)",
  H4_1_1_2: "Real-time Imaging Analysis and Clinical Integration (100 words)",
  
  H3_1_2: "Predictive Analytics for Early Disease Detection (200 words)",
  H4_1_2_1: "Risk Assessment Models and Patient Screening (100 words)",
  H4_1_2_2: "Biomarker Analysis and Genetic Predictions (100 words)",

  H2_2: "Personalized Treatment and Precision Medicine (400 words)",
  H3_2_1: "AI-Driven Drug Discovery and Development (200 words)",
  H4_2_1_1: "Molecular Modeling and Compound Optimization (100 words)",
  H4_2_1_2: "Clinical Trial Design and Patient Matching (100 words)",
  
  H3_2_2: "Customized Treatment Plans and Dosage Optimization (200 words)",
  H4_2_2_1: "Pharmacogenomics and Individual Drug Response (100 words)",
  H4_2_2_2: "Adaptive Treatment Protocols and Outcome Prediction (100 words)",

  H2_3: "Healthcare Operations and Administrative Efficiency (400 words)",
  H3_3_1: "Automated Medical Documentation and EHR Integration (200 words)",
  H4_3_1_1: "Natural Language Processing for Clinical Notes (100 words)",
  H4_3_1_2: "Voice Recognition and Transcription Systems (100 words)",
  
  H3_3_2: "Resource Allocation and Hospital Management (200 words)",
  H4_3_2_1: "Staff Scheduling and Capacity Planning (100 words)",
  H4_3_2_2: "Equipment Maintenance and Supply Chain Optimization (100 words)",

  H2_4: "Ethical Considerations and Future Challenges (400 words)",
  H3_4_1: "Data Privacy and Patient Consent in AI Systems (200 words)",
  H4_4_1_1: "HIPAA Compliance and Secure Data Handling (100 words)",
  H4_4_1_2: "Transparency in AI Decision-Making Processes (100 words)",
  
  H3_4_2: "Regulatory Framework and Quality Assurance (200 words)",
  H4_4_2_1: "FDA Approval Processes for AI Medical Devices (100 words)",
  H4_4_2_2: "International Standards and Cross-Border Implementation (100 words)",

  totalWordCount: "5000+ words",
  structureCompliance: "4 H2, 8 H3, 16 H4 sections",
  mathematicalConsistency: "Volume requirements achievable and realistic"
};

/**
 * =============================================================================
 * USAGE INSTRUCTIONS FOR IMPLEMENTATION
 * =============================================================================
 * 
 * When generating blog content:
 * 
 * 1. Follow Section 2 structure requirements exactly
 * 2. Use Markdown only in Typography components (Section 3)
 * 3. Include mandatory images per Section 4 rules
 * 4. Create summaries only for H2/H3/H4 headings (Section 5)
 * 5. Implement SEO optimization per Section 6 guidelines
 * 6. Maintain strict TypeScript schema compliance (Section 7)
 * 7. Follow step-by-step algorithm from Section 8
 * 8. Complete validation checklist from Section 9
 * 9. Use Section 10 example as structural template
 * 
 * CRITICAL SUCCESS FACTORS:
 * - Realistic word count targets that sum correctly
 * - Clear separation between Typography (Markdown allowed) and other components (plain text only)
 * - Maintained functionality of existing pageConfig schema
 * - Optional alt text with automatic fallback generation
 * - Organized sections for easy reference and future editing
 */
