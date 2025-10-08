import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useEffect } from "react";
import type { HomePiece } from "../../../Types";
import { urlFor } from "../../sanity/utils";

interface Props {
  currentPiece: HomePiece;
  className?: string;
  cycleDuration?: number;
  transitionTime?: number;
}

const ImageCarousel = ({
  currentPiece,
  className,
  cycleDuration = 4,
  transitionTime = 0.2,
}: Props) => {
  return (
    <AnimatePresence>
      <div className={`relative ${className} overflow-hidden`}>
        <img
          className="object-cover w-full h-full"
          src={urlFor(currentPiece.images[0]).auto("format").quality(100).url()}
          alt={currentPiece.title}
        />
        <motion.div
          className="absolute inset-0 h-full w-full bg-primary-blue"
          animate={{
            x: ["0%", "100%", "100%", "-100%", "-100%", "0%"],
            y: ["0%", "0%", "500%", "500%", "0%", "0%"], // Making the y super high to hide the div crossing back
          }}
          transition={{
            duration: cycleDuration,
            ease: "easeInOut",
            times: [
              0,
              0 + (transitionTime * 0.35) / cycleDuration,
              0.4,
              0.7,
              1 - (transitionTime * 0.65) / cycleDuration,
              1,
            ],
            repeat: Infinity,
          }}
        />
      </div>
    </AnimatePresence>
  );
};

export default ImageCarousel;
