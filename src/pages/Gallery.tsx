import { useContext, useEffect, useRef, useState, type RefObject } from "react";
import { client } from "../sanity/client";
import type { SanityDocument } from "@sanity/client";
import { useLoaderData } from "react-router-dom";
import type { PreviewArtPiece } from "../../Types";
import ExpandingDiv from "../components/atoms/ExpandingDiv";
import GalleryImage from "../components/atoms/GalleryImage";
import { DeviceContext } from "../components/wrappers/GlobalWrapper";
import { formatDate } from "../utilities/formatDate";
import DesktopDropdownMenu from "../components/molecules/DesktopDropdownMenu";
import MobileScrollMenu from "../components/molecules/MobileScrollMenu";

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
      className="h-screen w-screen bg-primary-gray flex flex-col items-center gap-y-0 py-[35vh] sm:py-[30vh] snap-y snap-mandatory overflow-y-scroll no-scrollbar"
      ref={worksScrollRef}
    >
      <div className="fixed top-0 h-full w-full grid grid-rows-[1fr_1px_1fr] grid-cols-none text-primary-blue pointer-events-none">
        <div className="row-start-1 row-end-2 flex flex-row items-end justify-between px-4">
          <span className="hidden sm:block font-optima text-3xl">
            {currentWork.title} {/* formatDate(currentWork.date) */}
          </span>
          <span className="sm:hidden font-optima-italic text-3xl">
            {currentWorkNum}.
          </span>
          <div className="hidden sm:block font-optima text-2xl">
            {currentWork.date}
            {/* <DesktopDropdownMenu /> */}
          </div>
          <MobileScrollMenu />
        </div>
        <div className="row-start-2 row-end-3 h-[1px] w-full bg-primary-blue" />
        <div className="row-start-3 row-end-4 px-4 flex flex-row items-start justify-between">
          <span className="hidden sm:block font-optima-italic text-3xl">
            {currentWorkNum}.
          </span>
          <div>
            <DesktopDropdownMenu />
          </div>
        </div>
      </div>
      {galleryWorks.map((work, key) => (
        <div
          className="w-full flex justify-center items-center"
          key={work._id}
        >
          <ExpandingDiv
            className="h-[50vh] sm:h-[60vh] w-full max-w-[60vw] flex-shrink-0 flex justify-center items-center origin-center snap-center"
            style={{
              marginTop: device === "desktop" ? "-7vh" : "-10vh",
              marginBottom: device === "desktop" ? "-7vh" : "-10vh",
            }}
            readScale={(scale) => handleRescale(work, scale, key + 1)}
            scrollContainerRef={worksScrollRef as RefObject<HTMLDivElement>}
          >
            <GalleryImage work={work} />
          </ExpandingDiv>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
