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
const TRANSITION_TIME = 0.4;

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
  const carouselRef = useRef<HTMLDivElement>(null);

  const [galleryTextWidth, setGalleryTextWidth] = useState(0);
  const [galleryTextHeight, setGalleryTextHeight] = useState(0);

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
  }, [galleryTextRef.current]);

  return (
    <div className="h-screen w-screen flex bg-primary-gray text-primary-blue overscroll-contain">
      <Grid />
      <div className="absolute left-4 top-4 bottom-8 right-8 md:inset-4 grid grid-rows-[4fr_5fr_3fr_3fr_7fr_7fr_2fr_2fr_4fr] grid-cols-[3fr_2fr_1fr_9fr] md:grid-rows-[3fr_1fr_8fr_3fr_2fr] md:grid-cols-[4fr_6fr] z-1 overflow-visible">
        {/* Menu */}
        <div className="col-span-full md:row-start-1 md:row-end-3 md:pl-12 flex items-center justify-center md:justify-start gap-12">
          {["HOME", "GALLERY", "CONTACT"].map((item) => {
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
        </div>
        {/* Fuyutsuki caption */}
        <div className="col-start-3 col-end-5 row-start-2 row-end-3 md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-4 flex flex-col justify-center items-start overflow-visible z-3">
          <div className="flex flex-col items-start md:gap-2">
            <span className="font-bold text-black text-3xl md:text-6xl tracking-wider text-shadow-2xs text-shadow-white/30">
              FUYUTSUKI
            </span>
            <span className="font-light text-xl md:text-4xl italic tracking-widest">
              illust.
            </span>
          </div>
        </div>
        {/* Image Carousel */}
        <div className="relative col-start-2 col-end-5 row-start-4 row-end-10 md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-5 flex items-end md:items-center justify-center">
          <div
            className="max-h-full max-w-full h-[95%] md:h-max md:max-h-[95%] md:w-[95%] aspect-[1/1.4] md:aspect-[4.5/3] z-2"
            ref={carouselRef}
          >
            <ImageCarousel
              className="h-full w-full z-2"
              cycleDuration={CYCLE_DURATION}
              works={featuredWorks}
              transitionTime={TRANSITION_TIME}
            />
          </div>
          {/* White border on a different layer for GALLERY text effect */}
          <div
            className="absolute md:max-h-full md:max-w-full md:bg-white z-1"
            style={{
              width: carouselRef.current
                ? (carouselRef.current.clientWidth * 100) / 90
                : 0,
              height: carouselRef.current
                ? (carouselRef.current.clientHeight * 100) / 90
                : 0,
            }}
          />
          {/* Piece Title (Desktop) */}
          {device === "desktop" && (
            <div
              className="absolute max-h-full max-w-full z-3 flex flex-col items-end justify-start"
              style={{
                width: carouselRef.current
                  ? (carouselRef.current.clientWidth * 100) / 90
                  : 0,
                height: carouselRef.current
                  ? (carouselRef.current.clientHeight * 100) / 90
                  : 0,
              }}
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="overflow-y-hidden pb-12 -mb-12" key={index}>
                  <RotatingText
                    className="md:text-5xl tracking-widest text-shadow-xs text-shadow-white/30"
                    rotationInterval={CYCLE_DURATION * 1000}
                    texts={featuredWorks.map((work) => work.title)}
                    initial={{ y: "70%", opacity: 0 }}
                    exit={{ y: "-50%", opacity: 0.2 }}
                    transition={{
                      ease: "easeInOut",
                      duration: TRANSITION_TIME / 2,
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Piece Title (Mobile) */}
        {device === "mobile" && (
          <div className="row-start-5 row-end-6 col-start-1 col-end-5 flex flex-col items-start justify-start overflow-visible">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                className="relative overflow-y-hidden pb-12 -mb-12 flex justify-center items-center text-xl md:text-5xl tracking-[0.15em] whitespace-nowrap"
                key={index}
              >
                <RotatingText
                  mainClassName="whitespace-nowrap"
                  rotationInterval={CYCLE_DURATION * 1000}
                  texts={featuredWorks.map((work) => work.title)}
                  initial={{ y: "70%", opacity: 0 }}
                  exit={{ y: "-50%", opacity: 0.2 }}
                  transition={{
                    ease: "easeInOut",
                    duration: TRANSITION_TIME / 2,
                  }}
                />
                <RotatingText
                  mainClassName="whitespace-nowrap"
                  className="absolute text-white/100 mix-blend-overlay text-shadow-xs text-shadow-white z-3"
                  rotationInterval={CYCLE_DURATION * 1000}
                  texts={featuredWorks.map((work) => work.title)}
                  initial={{ y: "70%", opacity: 0 }}
                  exit={{ y: "-50%", opacity: 0.2 }}
                  transition={{
                    ease: "easeInOut",
                    duration: TRANSITION_TIME / 2,
                  }}
                />
              </div>
            ))}
          </div>
        )}
        {/* Gallery Button */}
        <div className="row-start-9 row-end-10 col-start-1 col-end-5 md:col-span-full md:row-start-4 md:row-end-6 relative flex items-center md:pl-6 text-5xl md:text-[9rem] tracking-[2.5vw] overflow-visible">
          <span
            className="font-bold-inter pl-6 cursor-pointer z-1"
            ref={galleryTextRef}
            style={{ color: inverseOverlayBlendWithWhite("#0023E7") }}
          >
            GALLERY
          </span>
          <span
            className="absolute font-bold-inter pl-6 cursor-pointer text-white/100 mix-blend-overlay text-shadow-xs text-shadow-white z-3"
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

// function inverseColorDodgeWithWhite(hex: string): string {
//   // Convert hex to RGB
//   const rgb = hex
//     .replace("#", "")
//     .match(/.{2}/g)!
//     .map((x) => parseInt(x, 16));

//   // For color dodge with white, any value in [128,255] will result in white.
//   // Pick midpoint for visual consistency.
//   const inverse = rgb.map((result) => {
//     if (result >= 128) return 128;
//     return result;
//   });

//   return (
//     "#" +
//     inverse
//       .map((x) => x.toString(16).padStart(2, "0"))
//       .join("")
//       .toUpperCase()
//   );
// }
