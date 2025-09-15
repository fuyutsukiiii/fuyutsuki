import { motion } from "framer-motion";
import { useRef } from "react";
import type { PreviewArtPiece } from "../../../Types";
import { urlFor } from "../../sanity/utils";

interface Props {
  works: PreviewArtPiece[];
  className?: string;
  cycleDuration?: number;
  transitionTime?: number;
  width: number;
  height: number;
}

const ImageCarousel = ({
  works,
  className,
  cycleDuration = 4,
  transitionTime = 0.2,
  width,
  height,
}: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const worksList = [...works, ...works];
  const totalDuration = cycleDuration * works.length;

  const translationArray = Array.from({
    length: worksList.length + 1,
  }).map((_, index) => `-${(100 / worksList.length) * Math.floor(index / 2)}%`);

  const breakpoints = Array.from({ length: translationArray.length }).map(
    (_, index) => {
      return index % 2 === 0
        ? (1 / works.length) * (index / 2)
        : (1 / works.length) * ((index + 1) / 2) -
            (transitionTime * 1000) / (totalDuration * 1000);
      // This ternary operator statement normalizes timing to the specified transition time
      // console.log(translationArray, breakpoints);
      // ^Use this console log to see how it works
    }
  );

  return (
    <div className={`${className} overflow-hidden`} ref={parentRef}>
      <motion.div
        className="flex h-full"
        style={{ width: `${worksList.length * 100}%` }}
        initial={{ x: 0 }}
        animate={{ x: translationArray }}
        transition={{
          duration: totalDuration,
          times: breakpoints,
          ease: "easeIn",
          repeat: Infinity,
          delay: transitionTime, // Add a delay here so the carousel doesn't get ahead of the rotating text
        }}
      >
        {worksList.map((work, index) => (
          <img
            className="object-cover"
            style={{ width: width, height: height }}
            src={urlFor(work.images[0])
              .auto("format")
              .quality(100)
              .height(height * 3)
              .width(width * 3)
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
