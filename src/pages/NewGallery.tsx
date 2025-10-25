import type { SanityDocument } from "@sanity/client";
import { client } from "../sanity/client";
import type { PreviewArtPiece } from "../../Types";
import { useContext, useEffect, useRef, useState, type RefObject } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { DeviceContext } from "../components/wrappers/GlobalWrapper";
import PieceInfoNew from "../components/organisms/PieceInfoNew";
import ExpandingDiv from "../components/atoms/ExpandingDiv";
import GalleryImage from "../components/atoms/GalleryImage";
import AllPiecesMarquee from "../components/organisms/AllPiecesMarquee";

const GALLERY_QUERY = `*[_type == "gallery"]{
  works[]->{
    _id,
    title,
    date,
    slug,
    "images": images[],
  }
}`;

export async function loader() {
  const result = await client.fetch<{ works: SanityDocument[] }[]>(
    GALLERY_QUERY
  );
  const { works } = result[0];
  return works;
}

const NewGallery = () => {
  const navigate = useNavigate();

  const device = useContext(DeviceContext);

  const galleryWorks = useLoaderData() as PreviewArtPiece[];

  const [currentWork, setcurrentWork] = useState(galleryWorks[0]);

  const worksScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!worksScrollRef.current) return;

    // Jank fix for the scaling bug
    const timeoutRef = setTimeout(() => {
      worksScrollRef.current!.scrollBy(0, 1);
    }, 10);
    const secondTimeoutRef = setTimeout(() => {
      worksScrollRef.current!.scrollBy(0, -1);
    }, 12);

    return () => {
      clearTimeout(timeoutRef);
      clearTimeout(secondTimeoutRef);
    };
  }, []);

  const handleRescale = (work: PreviewArtPiece, scale: number) => {
    // If scale > 0.3, this piece is bigger than all the others.
    if (scale > 0.3) {
      setcurrentWork(work);
    }
  };

  const handleMarqueeFocus = (piece: PreviewArtPiece, focused: boolean) => {
    if (focused) {
      setcurrentWork(piece);
    }
  };

  return (
    <div
      className="relative h-screen w-screen py-[30vh] flex flex-col overflow-y-scroll no-scrollbar snap-y snap-mandatory bg-primary-gray text-white font-optima overscroll-contain"
      ref={worksScrollRef}
    >
      {/* Fixed layout elements */}
      <div className="fixed inset-0 h-screen w-screen grid md:grid-cols-[3fr_5fr_3fr]">
        <PieceInfoNew
          title={currentWork.title}
          date={currentWork.date}
          focus="highlights"
        />
        <div className="md:col-start-3 md:col-end-4 h-[50%] flex justify-center items-center">
          <AllPiecesMarquee
            pieces={galleryWorks.slice(0, 3)}
            currentPieceReader={handleMarqueeFocus}
            speed={2}
          />
        </div>
      </div>
      {/* Scrollable elements */}
      <div>
        {galleryWorks.map((work) => (
          <div
            className="w-full grid md:grid-cols-[3fr_5fr_3fr] grid-rows-none z-1"
            key={work._id}
          >
            {/* <div className="relative col-start-1 col-end-2 -translate-y-1/2">
              <div className="absolute top-100 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[3vmin] aspect-[1/1] bg-white rounded-full" />
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/4 bg-white h-[300%] w-[0.5vmin]" />
            </div> */}
            <ExpandingDiv
              className="h-[60vh] md:h-[80vh] md:col-start-2 md:col-end-3 flex-shrink-0 pr-4 md:pr-0 flex justify-start items-center origin-left snap-center"
              style={{
                marginTop: device === "desktop" ? "-15vh" : "-7vh",
                marginBottom: device === "desktop" ? "-15vh" : "-7vh",
              }}
              readScale={(scale) => handleRescale(work, scale)}
              scrollContainerRef={worksScrollRef as RefObject<HTMLDivElement>}
              onClick={() => navigate(`/illustration/${work.slug.current}`)}
            >
              <GalleryImage work={work} />
            </ExpandingDiv>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewGallery;
