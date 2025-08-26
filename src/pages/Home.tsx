import { client } from "../sanity/client";
import type { SanityDocument } from "@sanity/client";
import { useContext, useEffect, useRef, useState } from "react";
import Grid from "../components/organisms/Grid";
import { useLoaderData, useNavigate } from "react-router-dom";
import GalleryButton from "../components/molecules/GalleryButton";
import ImageCarousel from "../components/molecules/ImageCarousel";
import type { PreviewArtPiece } from "../../Types";
import RotatingText from "../components/atoms/RotatingText";
import { DeviceContext } from "../components/templates/GlobalWrapper";

const isMobile = window.innerWidth < 768;

const FEATURED_QUERY = `*[_type == "home${isMobile ? "-mobile" : ""}"]{
  works[]->{
    primary->{
      _id,
      title,
      images
    },
    background,
  }
}`;

const CYCLE_DURATION = 5;

export async function loader() {
  const result = await client.fetch<{ works: SanityDocument[] }[]>(
    FEATURED_QUERY
  );
  const { works } = result[0];
  const backgrounds = works.map((work) => work.background);
  const featuredWorks = works.map((work) => work.primary);

  return { backgrounds, featuredWorks };
}

const Home = () => {
  const device = useContext(DeviceContext);

  const navigate = useNavigate();

  const { featuredWorks } = useLoaderData() as {
    featuredWorks: PreviewArtPiece[];
  };

  const galleryTextRef = useRef<HTMLSpanElement>(null);

  const [galleryTextWidth, setGalleryTextWidth] = useState(0);
  const [galleryTextHeight, setGalleryTextHeight] = useState(0);

  console.log(featuredWorks);

  useEffect(() => {
    function measure() {
      if (galleryTextRef.current) {
        setGalleryTextWidth(galleryTextRef.current.clientWidth);
        setGalleryTextHeight(galleryTextRef.current.clientHeight);
      }
    }
    measure();

    window.addEventListener("resize", measure);

    // Listen for font loading
    if (document.fonts) {
      document.fonts.addEventListener("loadingdone", measure);
    }

    return () => {
      window.removeEventListener("resize", measure);
      if (document.fonts) {
        document.fonts.removeEventListener("loadingdone", measure);
      }
    };
  }, [galleryTextRef]);

  return (
    <div className="h-screen w-screen flex bg-primary-gray text-primary-blue overscroll-contain">
      <Grid />
      {/* Menu */}
      <div className="absolute inset-8 grid grid-rows-[4fr_5fr_3fr_3fr_7fr_10fr_5fr] grid-cols-[3fr_2fr_9fr] md:grid-rows-[3fr_1fr_8fr_3fr_2fr] md:grid-cols-[4fr_6fr] z-1 overflow-visible">
        {/* <div className="md:col-span-full md:row-start-1 md:row-end-3 pl-12 flex items-center gap-12">
          {["MENU", "GALLERY", "CONTACT", "STORE"].map((item) => {
            return (
              <span
                key={item}
                className="font-optima font-bold md:text-3xl cursor-pointer"
                onClick={() => navigate(`/${item.toLowerCase()}`)}
              >
                {item}
              </span>
            );
          })}
        </div> */}
        {/* Fuyutsuki caption */}
        <div className="col-start-3 col-end-4 row-start-2 row-end-3 md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-4 flex flex-col justify-center items-start overflow-visible bg-yellow-400/0">
          <div className="flex flex-col items-start md:gap-2">
            <span className="font-helvetica font-bold text-black text-3xl md:text-6xl tracking-wider">
              FUYUTSUKI
            </span>
            <span className="font-helvetica font-light text-xl md:text-4xl italic tracking-widest">
              illust.
            </span>
          </div>
        </div>
        {/* Image Carousel */}
        <div className="relative col-start-2 col-end-4 row-start-4 row-end-8 md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-5 flex justify-end items-start md:items-center md:justify-center">
          <div className="w-[100%] md:w-max md:h-[90%] aspect-[1/1.3] md:aspect-[4.5/3] z-2 outline-12 outline-white md:outline-0 ">
            <ImageCarousel
              className="h-full w-full z-2"
              cycleDuration={CYCLE_DURATION}
              works={featuredWorks}
            />
          </div>
          {/* White border on a different layer for GALLERY text effect */}
          <div className="absolute h-0 md:h-[95%] md:aspect-[4.5/3] bg-white z-1" />
          {/* Piece Title */}
          {device === "desktop" && (
            <div className="absolute h-[95%] md:aspect-[4.5/3] z-3  flex flex-col items-end justify-start">
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="overflow-y-hidden pb-12 -mb-12">
                  <RotatingText
                    key={index}
                    className="md:text-5xl tracking-widest text-shadow-xs text-shadow-white/30"
                    rotationInterval={CYCLE_DURATION * 1000}
                    texts={featuredWorks.map((work) => work.title)}
                    initial={{ y: "70%", opacity: 0 }}
                    exit={{ y: "-50%", opacity: 0.2 }}
                    transition={{ ease: "easeInOut" }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Piece Title */}
        {device === "mobile" && (
          <div className="row-start-5 row-end-6 col-start-1 col-end-4 flex flex-col items-start justify-start overflow-visible z-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div className="overflow-y-hidden pb-12 -mb-12">
                <RotatingText
                  key={index}
                  className="text-xl md:text-5xl tracking-[0.15em] text-shadow-sm text-shadow-white/30 whitespace-nowrap"
                  rotationInterval={CYCLE_DURATION * 1000}
                  texts={featuredWorks.map((work) => work.title)}
                  initial={{ y: "70%", opacity: 0 }}
                  exit={{ y: "-50%", opacity: 0.2 }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>
            ))}
          </div>
        )}
        {/* Gallery Button */}
        <div className="row-start-7 col-start-1 col-end-4 md:col-span-full md:row-start-4 md:row-end-6 relative flex items-center md:pl-6 text-5xl md:text-[9rem] tracking-[2.5vw] overflow-visible">
          <span
            className="font-bold-inter pl-6 cursor-pointer z-1"
            ref={galleryTextRef}
            style={{ color: inverseOverlayBlendWithWhite("#0023E7") }}
          >
            GALLERY
          </span>
          <span
            className="absolute font-bold-inter pl-6 cursor-pointer text-white/100 mix-blend-overlay z-3"
            onClick={() => navigate("/gallery")}
          >
            GALLERY
          </span>
          <GalleryButton
            className="absolute font-bold-inter md:text-[9rem] tracking-[2.5vw] flex items-center z-3"
            text="GALLERY"
            width={galleryTextWidth}
            height={galleryTextHeight}
            backgroundColor="#0023E7"
            onClick={() => navigate("/gallery")}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

function inverseOverlayBlendWithWhite(hex: string): string {
  // Convert hex to RGB
  const rgb = hex
    .replace("#", "")
    .match(/.{2}/g)!
    .map((x) => parseInt(x, 16));

  // Invert overlay blend with white
  const inverse = rgb.map((result) => {
    if (result === 255) return 128; // Any value in [128,255] overlays to 255, pick midpoint
    return Math.round(result / 2);
  });

  return (
    "#" +
    inverse
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}
