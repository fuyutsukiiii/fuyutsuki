import { client } from "../sanity/client";
import type { SanityDocument } from "@sanity/client";
import { useContext, useEffect, useRef, useState } from "react";
import Grid from "../components/organisms/Grid";
import { useLoaderData, useNavigate } from "react-router-dom";
import GalleryButton from "../components/molecules/GalleryButton";
import ImageCarousel from "../components/molecules/ImageCarousel";
import type { HomePiece } from "../../Types";
import RotatingText from "../components/atoms/RotatingText";
import { DeviceContext } from "../components/wrappers/GlobalWrapper";
import BouncingArrow from "../components/atoms/BouncingArrow";
import ToggleMenu from "../components/organisms/ToggleMenu";

const isMobile = window.innerWidth < 768;

const FEATURED_QUERY = `*[_type == "home${isMobile ? "-mobile" : ""}"]{
  works[]->{
    _id,
    title,
    images
  }
}`;

const CYCLE_DURATION = 0.9;
const TRANSITION_TIME = 0.4;

export async function loader() {
  const result = await client.fetch<{ works: SanityDocument[] }[]>(
    FEATURED_QUERY
  );
  const { works } = result[0];

  console.log(works);

  return { works };
}

const Home = () => {
  const device = useContext(DeviceContext);

  const navigate = useNavigate();

  const { works } = useLoaderData() as { works: HomePiece[] };

  const galleryTextRef = useRef<HTMLSpanElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollBufferRef = useRef<HTMLDivElement>(null);

  // Legacy state that needs to be here for some reason (to load the image carousel)
  const [_galleryTextWidth, setGalleryTextWidth] = useState(0);
  const [_galleryTextHeight, setGalleryTextHeight] = useState(0);

  const [navigatePercentScroll, setNavigatePercentScroll] = useState(0);

  useEffect(() => {
    if (!scrollBufferRef.current || device === "desktop") return;

    const observer = new window.IntersectionObserver(
      ([element]) => {
        const intersectionRatio = element.intersectionRatio;
        setNavigatePercentScroll(intersectionRatio);
        if (intersectionRatio >= 0.95) {
          navigate("/gallery");
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
  }, [scrollBufferRef.current]);

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
    <div className="relative h-screen w-screen bg-primary-gray overflow-y-scroll no-scrollbar snap-y snap-proximity md:overscroll-contain">
      <div className="relative flex-shrink-0 h-screen w-screen flex flex-col bg-primary-gray text-primary-blue overscroll-contain snap-end">
        <Grid />
        <div className="absolute left-4 top-4 bottom-8 right-4 md:inset-4 grid grid-rows-[3fr_7fr_3fr_3fr_7fr_7fr_2fr_2fr_4fr] grid-cols-[3fr_2fr_1fr_9fr] md:grid-rows-[3fr_1fr_8fr_3fr_2fr] md:grid-cols-[4fr_6fr] z-1 overflow-visible">
          <div className="col-span-full md:row-start-1 md:row-end-3 md:pl-12 flex items-end justify-center md:items-center md:justify-start gap-12">
            <div className="w-[80%] md:w-[40%] font-optima font-bold text-lg md:text-3xl">
              <ToggleMenu />
            </div>
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
          <div className="relative col-start-2 col-end-5 row-start-3 row-end-8 md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-5 flex items-end md:items-center justify-center md:mr-12">
            <div className="absolute h-full w-full" />
            <div
              className="h-full w-full mx-8 md:m-0 md:h-max md:max-h-[95%] md:w-[95%] aspect-[1/1.4] z-2"
              ref={carouselRef}
            >
              <ImageCarousel
                className="h-full w-full z-2 outline-6 md:outline-0 outline-white"
                cycleDuration={CYCLE_DURATION}
                works={works}
                transitionTime={TRANSITION_TIME}
                width={carouselRef.current?.clientWidth || 0}
                height={carouselRef.current?.clientHeight || 0}
              />
            </div>
            {/* White border on a different layer for GALLERY text effect */}
            <div
              className="absolute max-h-full max-w-full bg-white z-1"
              style={{
                width: carouselRef.current
                  ? (carouselRef.current.clientWidth * 100) / 90
                  : 0,
                height: carouselRef.current
                  ? (carouselRef.current.clientHeight * 100) / 90
                  : 0,
              }}
            />
          </div>
          {/* Piece Title */}
          <div className="relative row-start-6 row-end-7 col-start-1 col-end-5 md:col-start-2 md:col-end-4 md:row-start-2 md:row-end-5 flex flex-col items-start justify-start md:items-end gap-[1.1em] overflow-visible">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                className="relative overflow-y-hidden pb-12 -mb-12 flex justify-center items-center text-xl md:text-5xl tracking-[0.15em] whitespace-nowrap"
                key={index}
              >
                <RotatingText
                  mainClassName="whitespace-nowrap z-3 font-optima font-bold"
                  rotationInterval={CYCLE_DURATION * 1000}
                  texts={works.map((work) => work.title)}
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
          {/* Gallery Button (Desktop) */}
          {device === "desktop" && (
            <div className="row-start-9 row-end-10 col-start-1 col-end-5 md:col-span-full md:row-start-4 md:row-end-6 relative flex items-center md:pl-6 text-5xl md:text-[9rem] tracking-[2.7vw] overflow-visible">
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
                className="absolute font-bold-inter md:text-[9rem] tracking-[2.7vw] flex items-center z-3"
                text="GALLERY"
                width={galleryTextRef.current?.clientWidth || 0}
                height={galleryTextRef.current?.clientHeight || 0}
                backgroundColor="#0023E7"
                onClick={() => navigate("/gallery")}
              />
            </div>
          )}
          {/* Gallery Scroll (Mobile) */}
          {device === "mobile" && (
            <div className="col-start-1 col-end-5 row-start-8 row-end-10 flex flex-col items-center justify-end pb-4 gap-1">
              <div className="font-bold-inter text-3xl tracking-[1rem] text-center p-0 m-0">
                GALLERY
              </div>
              <BouncingArrow bounce={navigatePercentScroll < 0.5} />
            </div>
          )}
        </div>
      </div>
      <div className="w-screen h-[7.5vh] md:w-0 md:h-0" ref={scrollBufferRef} />
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
