import { useContext, useEffect, useRef, useState, type RefObject } from "react";
import { client } from "../sanity/client";
import type { SanityDocument } from "@sanity/client";
import { useLoaderData, useNavigate } from "react-router-dom";
import type { PreviewArtPiece } from "../../Types";
import ExpandingDiv from "../components/atoms/ExpandingDiv";
import GalleryImage from "../components/atoms/GalleryImage";
import PieceInfo from "../components/molecules/PieceInfo";
import GrayGrid from "../components/organisms/GrayGrid";
import { motion } from "framer-motion";
import { DeviceContext } from "../components/templates/GlobalWrapper";

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
  const navigate = useNavigate();

  const device = useContext(DeviceContext);

  const galleryWorks = useLoaderData() as PreviewArtPiece[];

  const [currentWork, setcurrentWork] = useState(galleryWorks[0]);
  const workBackup = useRef<PreviewArtPiece>(galleryWorks[0]);

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
      workBackup.current = currentWork;
      setcurrentWork(work);
    }
  };

  return (
    <div
      className="relative h-screen w-screen py-[30vh] bg-primary-gray flex flex-col overflow-y-scroll no-scrollbar snap-y snap-mandatory text-white font-optima overscroll-contain"
      ref={worksScrollRef}
    >
      <GrayGrid />
      {/* ACTUAL CONTENT STARTS HERE */}
      <div className="fixed top-0 h-screen w-screen overflow-hidden grid grid-rows-9 grid-cols-[10fr_8fr_3fr_9fr] md:grid-cols-[3fr_8fr_3fr_9fr] pointer-events-none">
        <motion.div
          className="col-start-2 col-end-5 row-start-1 row-end-3 md:col-start-4 md:col-end-5 md:row-start-3 md:row-end-8 grid place-items-center justify-items-end overflow-hidden z-999"
          // initial={{ opacity: 0, x: "20%" }}
          // animate={{ opacity: 1, x: 0 }}
          // transition={{ duration: 0.2, ease: "easeIn" }}
        >
          <PieceInfo title={currentWork.title} date={currentWork.date} />
        </motion.div>
      </div>
      <motion.div
      // initial={{ opacity: 0, x: "-20%" }}
      // animate={{ opacity: 1, x: 0 }}
      // transition={{ duration: 0.2, ease: "easeIn" }}
      >
        {galleryWorks.map((work) => (
          <div
            className="w-screen grid grid-cols-[6fr_8fr_3fr_9fr] md:grid-cols-[3fr_8fr_3fr_9fr] grid-rows-none z-1"
            key={work._id}
          >
            <motion.div
              // initial={{ opacity: 0, x: "20%" }}
              // animate={{ opacity: 1, x: 0 }}
              // transition={{ duration: 0.2, ease: "easeIn" }}
              className="relative col-start-1 col-end-2 bg-green-500/0 -translate-y-1/2"
            >
              <div className="absolute top-100 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[3vmin] aspect-[1/1] bg-white rounded-full" />
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/4 bg-white h-[300%] w-[0.5vmin]" />
            </motion.div>
            <ExpandingDiv
              className="h-[60vh] md:h-[80vh] col-start-2 col-end-5 md:col-end-4 flex-shrink-0 pr-4 md:pr-0 flex justify-start items-center origin-left snap-center"
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
      </motion.div>
    </div>
  );
};

export default Gallery;
