import { useEffect, useRef, useState } from "react";
import AutoScrollText from "../atoms/AutoScrollText";

interface Props {
  title: string;
  date: string;
}

const PieceInfo = ({ title, date }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [parentWidth, setParentWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    setParentWidth(rect.width);
  }, [ref.current]);

  useEffect(() => {
    if (!ref.current) return;
    const updateWidth = () =>
      setParentWidth(ref.current!.getBoundingClientRect().width);

    updateWidth(); // Initial

    const resizeObserver = new window.ResizeObserver(updateWidth);
    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      className="h-full w-full flex flex-col justify-center items-end px-8 gap-2 text-primary-blue font-optima-italic tracking-widest overflow-hidden"
      style={{ fontWeight: 550 }}
    >
      <div className="h-max w-[99%]" ref={ref}>
        {parentWidth > 0 && (
          <AutoScrollText
            className="text-3xl md:text-8xl drop-shadow-lg text-right"
            parentWidth={parentWidth}
          >
            {title}
          </AutoScrollText>
        )}
      </div>
      <span className="text-lg md:text-3xl drop-shadow-lg">{date}</span>
    </div>
  );
};

export default PieceInfo;
