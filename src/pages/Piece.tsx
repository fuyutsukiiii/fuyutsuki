import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import ImageStack from "../components/organisms/ImageStack";
import NextImagePreview from "../components/organisms/NextImagePreview";
import { PortableText } from "@portabletext/react";
import GrayGrid from "../components/organisms/GrayGrid";
import { PiecesContext } from "../components/templates/GlobalWrapper";

// export async function loader({ params }: { params: { pieceSlug?: string } }) {
//   const pieceSlug = params.pieceSlug;
//   if (!pieceSlug) {
//     window.location.href = "/home";
//   }
//   const PIECE_QUERY = `*[_type == "art" && slug.current == "${pieceSlug}"][0]{
//     title,
//     date,
//     description,
//     "images": images[],
//   }`;
//   const piece = (await client.fetch(PIECE_QUERY)) as FullPiece;
//   if (!piece) {
//     window.location.href = "/home";
//   }

//   const urls = piece.images.map((image) => {
//     return urlFor(image)
//       .auto("format")
//       .quality(70)
//       .fit("clip")
//       .maxWidth(window.innerWidth)
//       .maxHeight(window.innerHeight)
//       .url();
//   });

//   try {
//     const nextPiece = await getNextPiece(piece);
//     return {
//       title: piece.title,
//       date: piece.date,
//       description: piece.description,
//       pieceUrls: urls,
//       nextPieceUrl: nextPiece.slug.current,
//     };
//   } catch {
//     throw new Response("Next piece not found", { status: 404 });
//   }
// }

// async function getNextPiece(currentPiece: FullPiece): Promise<PreviewArtPiece> {
//   const GALLERY_QUERY = `*[_type == "gallery"]{
//     works[]->{
//         _id,
//         title,
//         date,
//         slug,
//         "images": images[],
//         }
//     }`;

//   const result = await client.fetch<{ works: SanityDocument[] }[]>(
//     GALLERY_QUERY
//   );
//   const { works } = result[0] as any;
//   const galleryWorks = works as PreviewArtPiece[];

//   const currentPieceIndex = galleryWorks.findIndex(
//     (work) => work.title === currentPiece.title
//   );
//   if (currentPieceIndex === -1) {
//     // Should never happen unless the url is invalid
//     throw new Error("Piece not found.");
//   }

//   return galleryWorks[(currentPieceIndex + 1) % galleryWorks.length];
// }

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
  // This should NEVER run, alternative is requerying though
  if (!pieces) {
    window.location.href = "/gallery";
    return null;
  }

  const currentPieceIndex = pieces?.findIndex(
    (piece) => piece.slug.current === pieceSlug
  );
  if (currentPieceIndex === -1) {
    window.location.href = "/gallery";
    return null;
  }

  const currentPiece = pieces[currentPieceIndex];
  const nextPiece = pieces[(currentPieceIndex + 1) % pieces.length];
  const title = currentPiece.title;
  const date = currentPiece.date;
  const description = currentPiece.description;
  const pieceUrls = currentPiece.urls;
  const nextPieceUrl = nextPiece.slug.current;

  const navigateToNext = () => {
    navigate(`/illustration/${nextPieceUrl}`);
  };

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
  }, [scrollBufferRef]);

  return (
    <>
      <div
        className="relative h-screen w-screen bg-primary-gray overflow-y-scroll snap-y snap-mandatory overscroll-contain"
        ref={pageScrollRef}
      >
        <GrayGrid horizontal={true} />
        <div className="snap-end">
          <div className="w-screen px-8 md:px-16 py-16 flex flex-col items-start justify-around gap-4 font-optima text-primary-blue drop-shadow-lg">
            <span className="text-3xl md:text-8xl font-optima-italic">
              {title}
            </span>
            <div className="w-full flex flex-row justify-between items-center text-lg md:text-3xl">
              <span className="text-3xl">{date}</span>
              <PortableText value={description} />
            </div>
          </div>
          <ImageStack urls={pieceUrls} scrollRef={pageScrollRef} />
          <NextImagePreview progress={percentToNextPiece * 100} />
        </div>
        <div className="h-[12.5vmax] w-screen" ref={scrollBufferRef} />
      </div>
    </>
  );
};

export default Piece;
