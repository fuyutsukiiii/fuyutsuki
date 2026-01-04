import { AnimatePresence, motion } from "framer-motion";
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
            x: ["0%", "100%", "100%", "0%"],
          }}
          transition={{
            duration: cycleDuration,
            ease: "easeInOut",
            times: [
              0,
              0 + (transitionTime * 0.35) / cycleDuration,
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
