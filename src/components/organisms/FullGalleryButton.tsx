import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import GalleryButton from "../molecules/GalleryButton";

// This one has color blend effects
const FullGalleryButton = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <span
        className="font-bold-inter pl-6 cursor-pointer z-1"
        ref={ref}
        style={{ color: inverseOverlayBlendWithWhite("#0023E7") }}
      >
        GALLERY
      </span>
      <span
        className="absolute font-bold-inter pl-6 cursor-pointer text-white/100 mix-blend-overlay text-shadow-xs text-shadow-white z-3"
        onClick={() => navigate("/gallery")}
      >
        GALLERY
      </span>
      <GalleryButton
        className="absolute font-bold-inter md:text-[9rem] tracking-[2.5vw] flex items-center z-3"
        text="GALLERY"
        width={ref.current?.clientWidth || 0}
        height={ref.current?.clientHeight || 0}
        backgroundColor="#0023E7"
        onClick={() => navigate("/gallery")}
      />
    </>
  );
};

export default FullGalleryButton;

function inverseOverlayBlendWithWhite(hex: string): string {
  // Convert hex to RGB
  const rgb = hex
    .replace("#", "")
    .match(/.{2}/g)!
    .map((x) => parseInt(x, 16));

  // Invert overlay blend with white
  const inverse = rgb.map((result) => {
    if (result === 255) return 128; // Any value in [128,255] overlays to 255, pick midpoint
    return Math.round(result / 2);
  });

  return (
    "#" +
    inverse
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}
