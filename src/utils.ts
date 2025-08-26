export function isColorWhite(hex: string, threshold: number = 250): boolean {
  // Remove '#' if present
  hex = hex.replace(/^#/, "");
  // Parse r, g, b
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Check if all channels are above the threshold (default: 250)
  return r >= threshold && g >= threshold && b >= threshold;
}

/**
 * Given a color (hex), returns a color such that blending the output with white using screen blend mode and opacity alpha gives the original color.
 * @param hex - The target color in #RRGGBB format.
 * @param alpha - The blend amount with white (0 = no overlay, 1 = full white).
 * @returns The resulting hex color string.
 */
export function inverseScreenBlendWithWhite(
  hex: string,
  alpha = 1
): string {
  // Remove '#' if present
  hex = hex.replace(/^#/, "");
  // Parse r, g, b
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Inverse screen blend with white
  const invBlend = (result: number) => {
    if (alpha === 1) return 0; // fully white overlay, base is black
    const base = (result - 255 * alpha) / (1 - alpha);
    return Math.round(Math.max(0, Math.min(255, base)));
  };

  const newR = invBlend(r);
  const newG = invBlend(g);
  const newB = invBlend(b);

  // Convert back to hex
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}
