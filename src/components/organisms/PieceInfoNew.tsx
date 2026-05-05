import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { formatDate } from "../../utilities/formatDate";

interface Props {
  title: string;
  date: string;
  focus: "highlights" | "all";
}

const PieceInfoNew = ({ title, date, focus }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [top, setTop] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const { clientY } = e;
      const rect = ref.current.getBoundingClientRect();
      const halfHeight = rect.height / 2;

      // Clamping so the text doesn't go offscreen
      const clampedTop = Math.max(
        0,
        Math.min(window.innerHeight - rect.height, clientY - halfHeight)
      );
      setTop(clampedTop);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed h-max w-full flex flex-col items-start justify-start text-primary-blue"
      ref={ref}
      style={{ top: top }}
    >
      <div className="flex flex-row justify-start items-center overflow-ellipsis pl-2 gap-x-2 font-optima text-lg md:text-3xl">
        <span>{title}</span>
        <span>{formatDate(date)}</span>
      </div>
      <div className="h-[1px] w-full bg-primary-blue" />
      <div className="flex flex-row justify-start items-center pl-2 gap-x-2 font-optima text-lg md:text-xl">
        <motion.span
          style={
            focus === "highlights"
              ? { color: "#fff", textShadow: "0 0 5px rgba(0, 35, 231, 0.5)" }
              : { color: "#0023E7" }
          }
        >
          highlights.
        </motion.span>
        <motion.span
          style={
            focus === "all"
              ? { color: "#fff", textShadow: "0 0 5px rgba(0, 35, 231, 0.5)" }
              : { color: "#0023E7" }
          }
        >
          all.
        </motion.span>
      </div>
    </div>
  );
};

export default PieceInfoNew;
