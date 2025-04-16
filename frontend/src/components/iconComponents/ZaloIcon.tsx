import React from "react";
import Image from "next/image";

export default function ZaloIcon(props: {
  size?: number;
  className?: string;
  color?: string;
}) {
  // Convert hex color to RGB values
  const getRgbFromHex = (hex: string) => {
    // Remove # if present
    const cleanHex = hex.charAt(0) === "#" ? hex.substring(1) : hex;

    // Parse the hex values
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

    return { r, g, b };
  };

  // Generate unique filter ID for this component instance
  const filterId = `zalo-color-filter-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  // Get RGB values if color is provided
  const rgb = props.color ? getRgbFromHex(props.color) : { r: 1, g: 1, b: 1 };

  return (
    <div
      className={props.className}
      style={{
        position: "relative",
        width: props.size || 26,
        height: props.size || 26,
      }}
    >
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              type="matrix"
              values={`0 0 0 0 ${rgb.r}
                      0 0 0 0 ${rgb.g}
                      0 0 0 0 ${rgb.b}
                      0 0 0 1 0`}
            />
          </filter>
        </defs>
      </svg>

      <Image
        src="/icons/zalo.svg"
        alt="Zalo"
        width={props.size || 26}
        height={props.size || 26}
        style={{
          filter: `url(#${filterId})`,
          position: "relative",
          zIndex: 10,
        }}
      />
    </div>
  );
}
