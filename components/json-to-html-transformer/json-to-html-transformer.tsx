"use client";

import React from "react";
import {
  PageConfig,
  ExtendedSection,
  StepSection,
  SimpleSection,
  TypographySection,
  SimpleSectionTypeName,
  TypographySectionTypeName,
} from "@/types/page-types";
import SimpleSectionFullScreenSizeImage from "./simple-sections/simple-section-full-screen-size-image";
import { HeaderSection } from "./header-section/header-section";
import { Wrapper } from "./wrapper";
// NEW IMPORT - markdown-based Typography components
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyBlockquote,
  TypographyTable,
  TypographyList,
  TypographyOrderedList,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
} from "./typography-markdown";

interface JsonToHtmlTransformerProps {
  data: PageConfig;
}

function isStepSection(section: ExtendedSection): section is StepSection {
  return typeof section === "object" && !!section && Array.isArray((section as any).bodyContent);
}

function isSimpleSection(section: ExtendedSection): section is SimpleSection {
  return (
    typeof section === "object" &&
    !!section &&
    !!(section as SimpleSection).bodyContent &&
    typeof (section as SimpleSection).bodyContent === "object" &&
    "type" in (section as SimpleSection).bodyContent &&
    typeof (section as SimpleSection).bodyContent.type === "string" &&
    !(section as SimpleSection).bodyContent.type.startsWith("Typography")
  );
}

function isTypographySection(section: ExtendedSection): section is TypographySection {
  return (
    typeof section === "object" &&
    !!section &&
    !!(section as TypographySection).bodyContent &&
    typeof (section as TypographySection).bodyContent.type === "string" &&
    (section as TypographySection).bodyContent.type.startsWith("Typography")
  );
}

// Helper to convert props to markdown format for new components
function convertPropsToMarkdown(type: TypographySectionTypeName, props: any): { markdown: string; [key: string]: any } {
  // Handle TypographyTable special case - convert data array to markdown table
  if (type === "TypographyTable" && props.data) {
    const [header, ...rows] = props.data;
    if (header && Array.isArray(header)) {
      const headerRow = `| ${header.join(' | ')} |`;
      const separatorRow = `|${header.map(() => '---').join('|')}|`;
      const dataRows = rows.map((row: string[]) => `| ${row.join(' | ')} |`).join('\n');
      const markdown = `${headerRow}\n${separatorRow}\n${dataRows}`;
      
      // Pass through other props except data
      const { data, ...restProps } = props;
      return { markdown, ...restProps };
    }
  }
  
  // Handle TypographyList - convert items array to markdown list
  if ((type === "TypographyList" || type === "TypographyOrderedList") && props.items) {
    const listSymbol = type === "TypographyOrderedList" ? "1." : "*";
    const markdown = props.items.map((item: any, index: number) => {
      const symbol = type === "TypographyOrderedList" ? `${index + 1}.` : "*";
      return `${symbol} ${item}`;
    }).join('\n');
    
    // Pass through other props except items
    const { items, ...restProps } = props;
    return { markdown, ...restProps };
  }
  
  // For all other Typography components, convert children to markdown
  if (props.children) {
    const { children, ...restProps } = props;
    return { markdown: children, ...restProps };
  }
  
  // If already has markdown prop, use it
  if (props.markdown) {
    return props;
  }
  
  // Fallback
  return { markdown: "", ...props };
}

function renderTypographyComponent(
  type: TypographySectionTypeName,
  props: any
) {
  // Convert props to expected markdown format
  const markdownProps = convertPropsToMarkdown(type, props);
  
  switch (type) {
    case "TypographyH1":
      return <TypographyH1 {...markdownProps} />;
    case "TypographyH2":
      return <TypographyH2 {...markdownProps} />;
    case "TypographyH3":
      return <TypographyH3 {...markdownProps} />;
    case "TypographyH4":
      return <TypographyH4 {...markdownProps} />;
    case "TypographyP":
      return <TypographyP {...markdownProps} />;
    case "TypographyBlockquote":
      return <TypographyBlockquote {...markdownProps} />;
    case "TypographyTable":
      return <TypographyTable {...markdownProps} />;
    case "TypographyList":
      return <TypographyList {...markdownProps} />;
    case "TypographyOrderedList":
      return <TypographyOrderedList {...markdownProps} />;
    case "TypographyLead":
      return <TypographyLead {...markdownProps} />;
    case "TypographyLarge":
      return <TypographyLarge {...markdownProps} />;
    case "TypographySmall":
      return <TypographySmall {...markdownProps} />;
    case "TypographyMuted":
      return <TypographyMuted {...markdownProps} />;
    default:
      return null;
  }
}

function renderSimpleComponent(type: SimpleSectionTypeName, props: any) {
  switch (type) {
    case "SimpleSectionFullScreenSizeImage":
      return <SimpleSectionFullScreenSizeImage {...props} />;
    default:
      return null;
  }
}

function renderStepSection(section: StepSection) {
  return (
    <Wrapper key={section.id}>
      {section.headerContent && <HeaderSection {...section.headerContent} />}
      <div className="space-y-6">
        {section.bodyContent.map((item, idx) => {
          if (item.sectionType === "Typography") {
            return (
              <div key={section.id + "-step-typo-" + idx}>
                {renderTypographyComponent(item.type, item.props)}
              </div>
            );
          }
          if (item.sectionType === "Simple") {
            return (
              <div key={section.id + "-step-simple-" + idx}>
                {renderSimpleComponent(item.type, item.props)}
              </div>
            );
          }
          return null;
        })}
      </div>
    </Wrapper>
  );
}

function renderSimpleSection(section: SimpleSection) {
  return (
    <Wrapper key={section.id}>
      <div>{renderSimpleComponent(section.bodyContent.type, section.bodyContent.props)}</div>
    </Wrapper>
  );
}

function renderTypographySection(section: TypographySection) {
  return (
    <Wrapper key={section.id}>
      <div>{renderTypographyComponent(section.bodyContent.type, section.bodyContent.props)}</div>
    </Wrapper>
  );
}

export function JsonToHtmlTransformer({ data }: JsonToHtmlTransformerProps) {
  if (!data?.sections?.length) return null;
  return (
    <div className="page-content">
      {data.sections.map((section, idx) => {
        if (isStepSection(section)) return renderStepSection(section);
        if (isSimpleSection(section)) return renderSimpleSection(section);
        if (isTypographySection(section)) return renderTypographySection(section);
        return null;
      })}
    </div> 
  );
}
