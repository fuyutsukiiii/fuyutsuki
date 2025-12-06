import { useContext, useEffect, useRef, useState, type RefObject } from "react";
import { client } from "../sanity/client";
import type { SanityDocument } from "@sanity/client";
import { AnimatePresence, motion } from "framer-motion";
import { useLoaderData, useNavigate } from "react-router-dom";
import type { PreviewArtPiece } from "../../Types";
import ExpandingDiv from "../components/atoms/ExpandingDiv";
import GalleryImage from "../components/atoms/GalleryImage";
import { DeviceContext } from "../components/wrappers/GlobalWrapper";
import { formatDate } from "../utilities/formatDate";
import AllPiecesMenu from "../components/organisms/AllPiecesMenu";

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

const Gallery = () => {
  const device = useContext(DeviceContext);

  const galleryWorks = useLoaderData() as PreviewArtPiece[];

  const [currentWork, setcurrentWork] = useState(galleryWorks[0]);
  const [currentWorkNum, setCurrentWorkNum] = useState(1);
  const [showFullMenu, setShowFullMenu] = useState(false);

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

  const handleRescale = (
    work: PreviewArtPiece,
    scale: number,
    workNum: number
  ) => {
    // If scale > 0.3, this piece is bigger than all the others.
    if (scale > 0.3) {
      setcurrentWork(work);
      setCurrentWorkNum(workNum);
    }
  };

  return (
    <div
      className="h-screen w-screen bg-primary-gray flex flex-col items-center gap-y-4 py-[30vh] snap-y snap-mandatory overflow-y-scroll no-scrollbar"
      ref={worksScrollRef}
    >
      <div className="fixed top-0 h-full w-full grid grid-rows-[1fr_1px_1fr] grid-cols-none text-primary-blue">
        <div className="row-start-1 row-end-2 flex flex-row items-end justify-between px-4">
          <span className="font-optima text-3xl">
            {currentWork.title} {formatDate(currentWork.date)}
          </span>
          <span
            className="cursor-pointer font-source-han-serif text-2xl font-light"
            onClick={() => setShowFullMenu(true)}
          >
            menu
          </span>
        </div>
        <div className="row-start-2 row-end-3 h-[1px] w-full bg-primary-blue" />
        <div className="row-start-3 row-end-4 px-4">
          <span className="font-optima-italic text-3xl">{currentWorkNum}.</span>
        </div>
      </div>
      {galleryWorks.map((work, key) => (
        <ExpandingDiv
          key={work._id}
          className="h-[60vh] md:h-[60vh] w-full max-w-[60%] col-start-2 flex-shrink-0 flex justify-center items-center origin-center snap-center"
          style={{
            marginTop: device === "desktop" ? "-7vh" : "-7vh",
            marginBottom: device === "desktop" ? "-7vh" : "-7vh",
          }}
          readScale={(scale) => handleRescale(work, scale, key + 1)}
          scrollContainerRef={worksScrollRef as RefObject<HTMLDivElement>}
        >
          <GalleryImage work={work} />
        </ExpandingDiv>
      ))}
    </div>
  );
};

export default Gallery;
