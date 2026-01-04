import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ImageStack from "../components/organisms/ImageStack";
import NextImagePreview from "../components/organisms/NextImagePreview";
import { PortableText } from "@portabletext/react";
import { PiecesContext } from "../components/wrappers/GlobalWrapper";
import DesktopDropdownMenu from "../components/molecules/DesktopDropdownMenu";
import MobileScrollMenu from "../components/molecules/MobileScrollMenu";
import PieceBackButton from "../components/molecules/PieceBackButton";

// Wrapping the piece page with a component with a key to force re-rendering
const Piece = () => {
  const { pieceSlug } = useParams();

  return <PieceContent key={pieceSlug} />;
};

const PieceContent = () => {
  const navigate = useNavigate();
  const { pieceSlug } = useParams();

  const pageScrollRef = useRef<HTMLDivElement>(null);
  const scrollBufferRef = useRef<HTMLDivElement>(null);
  const [percentToNextPiece, setPercentToNextPiece] = useState(0);

  const pieces = useContext(PiecesContext);

  const currentPiece = pieces.find(
    (piece) => piece.slug.current === pieceSlug
  )!;
  const currentPieceIndex = pieces.findIndex(
    (piece) => piece.slug.current === pieceSlug
  );
  const nextPiece =
    pieces[currentPieceIndex == pieces.length - 1 ? 0 : currentPieceIndex + 1];

  const navigateToNext = useCallback(() => {
    if (!nextPiece) return;
    navigate(`/illustration/${nextPiece.slug.current}`);
  }, [nextPiece]);

  useEffect(() => {
    if (!scrollBufferRef.current) return;

    const observer = new window.IntersectionObserver(
      ([element]) => {
        const intersectionRatio = element.intersectionRatio;
        setPercentToNextPiece(intersectionRatio);
        if (intersectionRatio >= 0.95) {
          navigateToNext();
        }
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      }
    );
    observer.observe(scrollBufferRef.current);
    return () => {
      observer.disconnect();
    };
  }, [scrollBufferRef, nextPiece]);

  return (
    <>
      <div
        className="relative h-screen w-screen bg-primary-gray overflow-y-scroll no-scrollbar snap-y snap-mandatory md:overscroll-contain"
        ref={pageScrollRef}
      >
        <div className="fixed top-0 h-full w-full grid grid-rows-[1fr_1px_1fr] grid-cols-none text-primary-blue">
          <div className="row-start-3 row-end-4 flex flex-row items-start justify-end px-4">
            <div className="font-source-han-serif text-md sm:text-xl pointer-events-auto">
              {/* <DesktopDropdownMenu /> */}
            </div>
          </div>
          {/* <div className="hidden sm:block row-start-2 row-end-3 h-[1px] w-full bg-primary-blue" /> */}
        </div>
        {currentPiece && (
          <div className="snap-end">
            <div className="w-screen px-8 md:px-16 py-16 pt-24 flex flex-col items-start justify-around gap-4 font-optima text-primary-blue drop-shadow-lg">
              <span className="text-3xl md:text-8xl font-optima-italic">
                {currentPiece.title}
              </span>
              <div className="w-full flex flex-row justify-between items-center text-lg md:text-3xl">
                <span className="text-3xl">{currentPiece.date}</span>
                <PortableText value={currentPiece.description} />
              </div>
            </div>
            <ImageStack piece={currentPiece} scrollRef={pageScrollRef} />
            <NextImagePreview progress={percentToNextPiece * 100} />
          </div>
        )}
        <div className="h-[12.5vh] w-screen" ref={scrollBufferRef} />
        <PieceBackButton />
      </div>
    </>
  );
};

export default Piece;
