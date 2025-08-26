import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useTimer from "../../hooks/useTimer";
import type { PreviewArtPiece } from "../../../Types";
import { urlFor } from "../../sanity/utils";

interface Props {
  works: PreviewArtPiece[];
  className?: string;
  cycleDuration?: number;
}

const ImageCarousel = ({ works, className, cycleDuration = 4 }: Props) => {
  const [time] = useTimer();
  const currentIndex = Math.floor(time / cycleDuration);
  const [worksList, setWorksList] = useState([...works, ...works]);

  const parentRef = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState<number>(0);
  const [parentHeight, setParentHeight] = useState<number>(0);

  useEffect(() => {
    if (parentRef.current) {
      setParentWidth(parentRef.current.clientWidth);
      setParentHeight(parentRef.current.clientHeight);
    }
  }, [parentRef]);

  useEffect(() => {
    if (currentIndex >= 1) {
      setWorksList((prev) => [...prev.slice(1), prev[0]]);
    }
  }, [currentIndex]);

  return (
    <div
      className={`${className} overflow-hidden`}
      ref={parentRef}
    >
      <motion.div
        className="flex flex-row"
        initial={{ x: `-${works.length * 100 - 100}%` }}
        animate={{ x: `-${works.length * 100}%` }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        key={currentIndex}
      >
        {worksList.map((work, index) => (
          <img
            className="object-cover"
            src={urlFor(work.images[0])
              .auto("format")
              .fit("fill")
              .quality(100)
              .width(parentWidth * 2)
              .height(parentHeight * 2)
              .url()}
            alt={work.title}
            key={index}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ImageCarousel;
