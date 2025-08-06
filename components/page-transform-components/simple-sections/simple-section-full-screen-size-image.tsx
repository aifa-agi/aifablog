

import React from "react";
import Image, { ImageProps } from "next/image";

/**
 * Props for the full screen image simple section.
 * — 'alt', 'width', and 'height' are optional; default values will be used if not provided.
 */
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

/**
 * Full screen size image section with default styles (backdrop, rounded corners, video aspect, default alt/width/height).
 * Custom styles and parameters apply only if user explicitly requests.
 * Returns a fallback placeholder if any rendering error occurs.
 */
export const SimpleSectionFullScreenSizeImage: React.FC<SimpleSectionFullScreenSizeImageProps> = ({
  src,
  alt = "Aifa.dev image",        
  width = 800,                    
  height = 600,                   
  hasBackdrop = true,
  hasBorder = false,
  hasRounded = true,
  borderRadius = "1.5rem",
  aspectRatio = "video",
  objectFit = "cover",
  objectPosition = "center",
  className,
  style,
  ...rest
}) => {
  try {
    // Aspect ratio Tailwind/utility class
    let aspectClass = "";
    if (aspectRatio === "video") aspectClass = "aspect-video";
    else if (aspectRatio === "square") aspectClass = "aspect-square";
    else if (typeof aspectRatio === "string") aspectClass = aspectRatio;

    const outerClass = [
      hasBackdrop ? "md:bg-muted/30 md:ring-1 md:ring-inset md:ring-border md:p-3.5" : "",
      hasBackdrop || hasBorder || hasRounded ? "rounded-xl" : "",
      className || ""
    ].join(" ").trim();

    const imgWrapperClass = [
      aspectClass,
      "relative overflow-hidden w-full",
      hasRounded ? "rounded-xl md:rounded-lg" : "",
      hasBorder ? "border" : "",
    ].join(" ").trim();

    const imgStyle: React.CSSProperties = {
      ...style,
      ...(hasRounded || borderRadius ? { borderRadius: borderRadius } : {}),
      ...(hasBorder ? { border: "2px solid #E5E7EB" } : {}),
      width: "100%",
      height: "100%",
      objectFit,
      objectPosition,
      display: "block",
    };

    return (
      <div className="pb-6 sm:pb-16">
        <div className="container max-w-6xl">
          <div className={outerClass}>
            <div className={imgWrapperClass}>
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                style={imgStyle}
                className="size-full duration-500 ease-in-out object-cover object-center"
                {...rest}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div style={{ color: "red", padding: "1rem", border: "1px solid red", textAlign: "center" }}>
        Component SimpleSectionFullScreenSizeImage was generated with error.
      </div>
    );
  }
};

export default SimpleSectionFullScreenSizeImage;
