/**
 * =============================================================================
 * Custom Markup and Typography Instruction for AI Text Generation (System prompt/instruction)
 * =============================================================================
 * 
 * GENERAL MARKUP RULES:
 * - To format any part of the text, use tags in square brackets: [tag.../tag].
 * - Everything between the opening and closing tag will be formatted according to the tag type.
 * - Nested tags are NOT allowed.
 * - Use the following abbreviations for formatting:
 * 
 * | Formatting Type         | Format                 | Example                                 |
 * |------------------------|------------------------|-----------------------------------------|
 * | Bold                   | [bText/b]              | [bVery important/b]                     |
 * | Italic                 | [iText/i]              | [iComment/i]                            |
 * | Underlined             | [uText/u]              | [uFragment/u]                           |
 * | Strikethrough          | [sText/s]              | [sTo delete/s]                          |
 * | Text color             | [c-redText/c-red]      | [c-redError/c-red]                      |
 * | Background color       | [bg-pinkText/bg-pink]  | [bg-pinkAttention/bg-pink]              |
 * | Checkbox (unchecked)   | [cb-falseText/cb-false]| [cb-falseDo the report/cb-false]        |
 * | Checkbox (checked)     | [cb-trueText/cb-true]  | [cb-trueTask completed/cb-true]         |
 * | Underline (dashed)     | [u-dashedText/u-dashed]| [u-dashedIn progress/u-dashed]          |
 * | Link                   | [a href="url"Text/a]   | [a href="https://site.com"Doc/a]        |
 * | INLINE code            | [codeText/code]        | [codeline of code/code]                 |
 * 
 * GENERATION MARKUP INSTRUCTIONS:
 * - Whenever highlighting or formatting is required, wrap the relevant text fragment with the corresponding tag.
 * - For colored text or backgrounds, specify the color in the tag: [c-greenNote/c-green], [bg-yellowQuestion/bg-yellow], etc.
 *
 * STYLE AND TYPOGRAPHY COMPONENT GUIDELINES:
 * - By default, do NOT add custom styles (style prop or className overrides) to Typography components unless the user explicitly requests a style change (e.g., color, font, spacing, underline, font size).
 * - If the user's instruction includes a requirement for styling, generate and apply the exact corresponding style to the requested Typography element(s) using the style and/or className prop. All other Typography components should use their default appearance.
 * - You may apply standard HTML attributes, including style and className, to all Typography components.
 * 
 * HEADING USAGE INSTRUCTIONS:
 * - For headings (TypographyH1, H2, H3, H4), the user may adjust font size, color, or styles via style for purposes such as conversion optimization or branding. By default, always return the heading with its default className and font size as specified in the component, unless instructed otherwise.
 * 
 * COMPONENT COMPOSITION:
 * - All Typography components can be composed inside TypographyContainer, which accepts the component name and children. Any valid HTML attribute can be passed to each Typography element.
 * 
 * TABLE GENERATION INSTRUCTIONS:
 * - Always use a single property named 'data' of type TableDataCell[][]. Each row is an array of cells, including the header row. Each cell may be any valid ReactNode (text, number, JSX).
 * - Never attempt to generate a table by passing dynamic attributes, macros, or specialized individual props. Always represent the table only as a two-dimensional array of nodes as in the provided example.
 *
 * LIST GENERATION INSTRUCTIONS:
 * - Always pass list items in a single 'items' prop of type React.ReactNode[]. The same applies for both unordered (TypographyList) and ordered (TypographyOrderedList) lists.
 * 
 * EXAMPLES:
 * // Markup
 * [bImportant:/b] submit the [cb-falseReport/cb-false] before the deadline.
 * To fix issues, use the [c-reddata check/c-red].
 * See details in the [a href="https://site.com"document/a].
 * 
 * // Component with added style
 * <TypographyH1 style={{ color: "#d7263d", fontSize: 56 }}>Custom Landing Headline</TypographyH1>
 * 
 * // Table
 * <TypographyTable
 *   data={[
 *     ["King's Treasury", "People's happiness"],
 *     ["Empty", "Overflowing"],
 *     ["Modest", "Satisfied"],
 *     ["Full", "Ecstatic"]
 *   ]}
 * />
 * 
 * // List
 * <TypographyOrderedList
 *   items={[
 *     "Step one",
 *     "Step two",
 *     "Step three"
 *   ]}
 * />
 * =============================================================================
 */
import React from "react"

type TypographyHeadingProps = React.HTMLAttributes<HTMLHeadingElement>
type TypographyParagraphProps = React.HTMLAttributes<HTMLParagraphElement>
type TypographyBlockquoteProps = React.HTMLAttributes<HTMLElement>
type TypographySpanProps = React.HTMLAttributes<HTMLElement>
type TypographyDivProps = React.HTMLAttributes<HTMLDivElement>
type TypographyTableProps = { data: React.ReactNode[][] }
type TypographyListProps = { items: React.ReactNode[] }


export function TypographyH1({ children, ...props }: TypographyHeadingProps) {
  return (
    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance" {...props}>
      {children}
    </h1>
  )
}

export function TypographyH2({ children, ...props }: TypographyHeadingProps) {
  return (
    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0" {...props}>
      {children}
    </h2>
  )
}


export function TypographyH3({ children, ...props }: TypographyHeadingProps) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight" {...props}>
      {children}
    </h3>
  )
}


export function TypographyH4({ children, ...props }: TypographyHeadingProps) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight" {...props}>
      {children}
    </h4>
  )
}

export function TypographyP({ children, ...props }: TypographyParagraphProps) {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props}>
      {children}
    </p>
  )
}

export function TypographyBlockquote({ children, ...props }: TypographyBlockquoteProps) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic" {...props}>
      {children}
    </blockquote>
  )
}

export function TypographyTable({ data }: TypographyTableProps) {
  if (!data || !data.length) return null
  const [header, ...rows] = data
  return (
    <div className="mt-6 overflow-x-auto max-w-full">
      <table className="min-w-full border border-gray-700 rounded-md">
        <thead>
          <tr>
            {header.map((cell, idx) => (
              <th key={idx} className="border px-4 py-2 text-left font-bold">{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="border px-4 py-2 text-left">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


export function TypographyList({ items }: TypographyListProps) {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  )
}


export function TypographyOrderedList({ items }: TypographyListProps) {
  return (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ol>
  )
}



export function TypographyLead({ children, ...props }: TypographyParagraphProps) {
  return <p className="text-muted-foreground text-xl" {...props}>{children}</p>
}


export function TypographyLarge({ children, ...props }: TypographyDivProps) {
  return (
    <div className="text-lg font-semibold" {...props}>
      {children}
    </div>
  )
}


export function TypographySmall({ children, ...props }: TypographySpanProps) {
  return (
    <small className="text-sm leading-none font-medium" {...props}>
      {children}
    </small>
  )
}

export type TypographyMutedProps = React.HTMLAttributes<HTMLParagraphElement>
export function TypographyMuted({ children, ...props }: TypographyMutedProps) {
  return (
    <p className="text-muted-foreground text-sm" {...props}>
      {children}
    </p>
  )
}
