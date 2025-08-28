import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Props {
  className?: string;
  children?: string;
  speed?: number;
  parentWidth: number;
}

const AutoScrollText = ({
  className,
  children,
  speed = 90,
  parentWidth,
}: Props) => {
  const textRef = useRef<HTMLDivElement>(null);

  const [shouldScroll, setShouldScroll] = useState(false);
  const [overflow, setOverflow] = useState(0);

  useEffect(() => {
    if (!textRef.current) return;

    const text = textRef.current;
    const textStyle = window.getComputedStyle(text);
    const padding =
      parseFloat(textStyle.paddingLeft) + parseFloat(textStyle.paddingRight);

    setShouldScroll(text.scrollWidth - parentWidth - padding > 0);
    setOverflow(-1 * (text.scrollWidth - parentWidth - padding));
  }, [textRef, parentWidth, children]);

  const duration = (overflow / speed) * -1;

  return (
    <div
      className="overflow-y-visible overflow-clip whitespace-nowrap relative"
      key={children}
    >
      {/* Shadows for scroll */}
      {shouldScroll && (
        <>
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-3 z-10"
            style={{
              background: "linear-gradient(to right, #ebebeb, transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-3 z-10"
            style={{
              background: "linear-gradient(to left, #ebebeb, transparent)",
            }}
          />
        </>
      )}
      <motion.div
        ref={textRef}
        className={`${className} pr-1`}
        initial={{ x: 0 }}
        animate={{ x: shouldScroll ? overflow : 0 }}
        key={parentWidth}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
          repeatDelay: 2,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AutoScrollText;
