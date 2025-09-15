import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Props {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  readScale?: (cb: number) => void;
  readDistance?: (cb: number) => void;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  onClick?: () => void;
}

const ExpandingDiv = ({
  className,
  children,
  style,
  readScale,
  readDistance,
  scrollContainerRef,
  onClick,
}: Props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.2);

  useEffect(() => {
    const handleScrollOrResize = () => {

      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        const divTop = rect.top;
        const divBottom = rect.bottom;
        // If the div is completely out of view + a margin, skip calculations
        if (divBottom < 0 - window.innerHeight * 0.1 || divTop > window.innerHeight * 1.1) {
          return;
        }

        const divMidline = rect.y + rect.height / 2;
        const windowMidline = window.innerHeight / 2;

        // Calculating the distance and converting it to a ratio
        const signedDistance = divMidline - windowMidline;
        if (readDistance) {
          readDistance(signedDistance);
        }
        const normalizedDistance =
          Math.abs(signedDistance) / window.innerHeight;
        // Check https://www.desmos.com/calculator/mk6vmleeeq for visualization of scale
        const scale = Math.max(
          Math.exp(-20 * normalizedDistance * normalizedDistance),
          0.2 - normalizedDistance / 100
        );

        if (readScale) {
          readScale(scale);
        }
        setScale(scale);
      }
    };
    const scroller = scrollContainerRef?.current || window;
    scroller.addEventListener("scroll", handleScrollOrResize);
    window.addEventListener("resize", handleScrollOrResize);

    handleScrollOrResize(); // Initial call to set scale on mount
    return () => {
      scroller.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [scrollContainerRef]);

  return (
    <motion.div
      className={`${className}`}
      ref={divRef}
      style={{ scale, ...style }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default ExpandingDiv;
