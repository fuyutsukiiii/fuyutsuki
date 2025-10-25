import {
  animate,
  motion,
  useAnimation,
  useMotionValue,
  type AnimationPlaybackControlsWithThen,
} from "framer-motion";
import type { PreviewArtPiece } from "../../../Types";
import { urlFor } from "../../sanity/utils";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  pieces: PreviewArtPiece[];
  currentPieceReader?: (piece: PreviewArtPiece, focused: boolean) => void;
  speed?: number;
}

/**
 * Component for a marquee that automatically scrolls through all given pieces, and automatically pauses and updates the current piece
 * when hovered.
 *
 * @param pieces - Array of art pieces to display.
 * @param currentPieceReader - Optional function to update the title and date of the currently focused piece.
 * @param speed - Seconds per piece.
 */
const AllPiecesMarquee = ({ pieces, currentPieceReader }: Props) => {
  const navigate = useNavigate();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [finishingAnimation, setFinishingAnimation] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [speed, setSpeed] = useState(5);

  const animationControls = useAnimation();
  const y = useMotionValue(0);
  let controls: AnimationPlaybackControlsWithThen;

  useEffect(() => {
    const totalHeight = scrollRef.current!.scrollHeight;
    const endpoint = -0.5 * totalHeight - 8;
    console.log(y.get());
    if (finishingAnimation) {
      controls = animate(y, [y.get(), endpoint], {
        duration: speed * pieces.length * (1 - y.get() / endpoint),
        ease: "linear",
        onComplete: () => {
          console.log(y.get());
          setFinishingAnimation(false);
          setRerender((prev) => !prev);
        },
      });
    } else {
      controls = animate(y, [0, endpoint], {
        duration: speed * pieces.length,
        ease: "linear",
        repeat: Infinity,
      });
    }

    return () => controls?.stop();
  }, [y, rerender, speed]);

  return (
    <div className="relative size-full">
      <motion.div
        className="h-full w-full flex flex-col justify-around items-center gap-4"
        ref={scrollRef}
        animate={animationControls}
        style={{ y }}
        onHoverStart={() => {
          setFinishingAnimation(true);
          console.log(y.get());
          setSpeed(25);
        }}
        onHoverEnd={() => {
          setFinishingAnimation(true);
          setSpeed(5);
        }}
      >
        {[...pieces, ...pieces].map((piece, index) => (
          <img
            key={piece._id + index}
            className="max-h-[30%] max-w-[80%] object-contain cursor-pointer"
            src={urlFor(piece.images[0]).auto("format").quality(70).url()}
            alt={piece.title}
            onMouseEnter={() => currentPieceReader?.(piece, true)}
            onMouseLeave={() => currentPieceReader?.(piece, false)}
            onClick={() => navigate(`/illustration/${piece.slug.current}`)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default AllPiecesMarquee;
