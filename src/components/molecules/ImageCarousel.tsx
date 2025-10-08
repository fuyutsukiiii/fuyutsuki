import { AnimatePresence, useAnimate } from "framer-motion";
import { useEffect } from "react";
import type { HomePiece } from "../../../Types";
import { urlFor } from "../../sanity/utils";
import useTimer from "../../hooks/useTimer";

interface Props {
  works: HomePiece[];
  className?: string;
  cycleDuration?: number;
  transitionTime?: number;
}

const ImageCarousel = ({
  works,
  className,
  cycleDuration = 4,
  transitionTime = 0.2,
}: Props) => {
  const [time] = useTimer();

  const index = Math.floor(time / cycleDuration) % works.length;
  const currentWork = works[index];

  const [sliderDiv, animateSliderDiv] = useAnimate();

  useEffect(() => {
    animateSliderDiv(
      sliderDiv.current,
      {
        x: ["0%", "100%", "100%", "-100%", "-100%", "0%"],
        y: ["0%", "0%", "500%", "500%", "0%", "0%"], // Making the y super high to hide the div crossing back
      },
      {
        duration: cycleDuration,
        ease: "easeInOut",
        times: [
          0,
          0 + (transitionTime * 0.8) / cycleDuration,
          0.4,
          0.7,
          1 - (transitionTime * 1.3) / cycleDuration,
          1,
        ],
      }
    );
  }, [currentWork]);

  return (
    <AnimatePresence>
      <div className={`relative ${className} overflow-hidden`}>
        <img
          className="object-cover w-full h-full"
          src={urlFor(currentWork.images[0])
            .auto("format")
            .quality(100)
            .url()}
          alt={currentWork.title}
        />
        <div
          className="absolute inset-0 h-full w-full bg-primary-blue"
          ref={sliderDiv}
        />
      </div>
    </AnimatePresence>
  );
};

export default ImageCarousel;
