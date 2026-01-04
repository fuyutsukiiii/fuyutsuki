import { motion } from "framer-motion";
import {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { DeviceContext } from "../wrappers/GlobalWrapper";
import type { FullPieceWithSlug } from "../../../Types";
import { urlFor } from "../../sanity/utils";

interface Props {
  piece: FullPieceWithSlug;
  scrollRef: RefObject<HTMLElement | null>;
}

const ImageStack = ({ piece, scrollRef }: Props) => {
  const device = useContext(DeviceContext);

  const [initialScroll, setInitialScroll] = useState(0);

  const [canZoom, setCanZoom] = useState(false);
  const [inView, setInView] = useState(false);
  const [zoomedPieceIndex, setZoomedPieceIndex] = useState(-1); // url of the zoomed image
  const [loadedImages, setLoadedImages] = useState(new Set<number>());

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInView(piece.images.length === 1);
    setCanZoom(piece.images.length === 1);

    if (!ref.current) return;
    if (!scrollRef.current) return;

    setInitialScroll(scrollRef.current.scrollTop);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (inView) return; // Don't observe if already in view
        if (entry.intersectionRatio >= 0.9) {
          setCanZoom(true);
          setInView(true);
        }
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0, 0.01, ..., 1
      }
    );

    const checkMobileScroll = () => {
      const scrolled =
        scrollRef.current!.scrollTop > initialScroll + window.innerHeight * 0.1;
      if (scrolled) {
        setCanZoom(true);
        setInView(true);
      }
    };

    if (device === "mobile") {
      scrollRef.current.addEventListener("scroll", checkMobileScroll);
      checkMobileScroll(); // Initial check

      return () => {
        window.removeEventListener("scroll", checkMobileScroll);
      };
    } else {
      observer.observe(ref.current);

      return () => observer.disconnect();
    }
  }, [device, scrollRef, ref]);

  const handleZoom = (index: number) => {
    if (canZoom) {
      setZoomedPieceIndex(index);
    }
  };

  useEffect(() => {
    if (zoomedPieceIndex === -1) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setZoomedPieceIndex(-1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [zoomedPieceIndex]);

  return (
    <motion.div
      className="relative m-auto w-max overflow-visible flex flex-col items-center justify-start no-scrollbar gap-4"
      // Only animate if there are multiple pieces, otherwise the image stack doesn't really make sense.
    >
      {piece.images.map((image, index) => {
        const randomTilt = useMemo(() => Math.random() * 20 - 10, []);

        return (
          <div key={image._key}>
            <motion.div
              className="h-[100vmin] w-[85vw] flex-shrink-0 flex justify-center items-center"
              initial={{
                y: `-${100 * index}%`,
                scale: piece.images.length === 1 ? 1 : 0.6,
                rotate: piece.images.length === 1 ? "0deg" : `${randomTilt}deg`,
              }}
              animate={
                inView
                  ? { y: 0, scale: 1, rotate: "0deg" }
                  : {
                      y: `-${100 * index}%`,
                      scale: 0.6,
                      rotate: `${randomTilt}deg`,
                    }
              }
              transition={{ duration: 0.3, ease: "easeInOut" }}
              ref={index === 0 ? ref : undefined}
            >
              {/* Placeholder */}
              {!loadedImages.has(index) && (
                <img
                  className="absolute h-full w-full object-contain"
                  src={urlFor(image)
                    .auto("format")
                    .fit("clip")
                    .width(50)
                    .quality(1)
                    .blur(99)
                    .url()}
                />
              )}
              {/* Default Image */}
              <img
                className="max-h-full max-w-full object-contain z-1"
                srcSet={[
                  urlFor(piece.images[0])
                    .auto("format")
                    .width(640)
                    .fit("clip")
                    .quality(100)
                    .url() + " 640w",
                  urlFor(piece.images[0])
                    .auto("format")
                    .width(768)
                    .fit("clip")
                    .quality(100)
                    .url() + " 768w",
                  urlFor(piece.images[0])
                    .auto("format")
                    .width(1024)
                    .fit("clip")
                    .quality(100)
                    .url() + " 1024w",
                  urlFor(piece.images[0])
                    .auto("format")
                    .width(1280)
                    .fit("clip")
                    .quality(100)
                    .url() + " 1280w",
                  urlFor(piece.images[0])
                    .auto("format")
                    .width(1536)
                    .fit("clip")
                    .quality(100)
                    .url() + " 1536w",
                ].join(", ")}
                sizes="
        (max-width: 640px) 640px,
        (max-width: 768px) 768px,
        (max-width: 1024px) 1024px,
        (max-width: 1280px) 1280px,
        1536px
        "
                alt={piece.title}
                style={{ cursor: canZoom ? "zoom-in" : "default" }}
                onClick={() => handleZoom(index)}
                onLoad={() =>
                  setLoadedImages((prev) => new Set(prev).add(index))
                }
              />
            </motion.div>
            {/* Zoomed Image */}
            {zoomedPieceIndex === index && (
              <div
                key={image._key + "-zoomed"}
                className="fixed inset-0 bg-black/90 overflow-auto z-999"
                style={{ cursor: "zoom-out" }}
                onClick={() => setZoomedPieceIndex(-1)}
              >
                <img
                  className="m-0 block object-contain"
                  style={{ width: "200vw", height: "200vh" }}
                  srcSet={[
                    urlFor(piece.images[0])
                      .auto("format")
                      .width(960)
                      .fit("clip")
                      .quality(100)
                      .url() + " 960w",
                    urlFor(piece.images[0])
                      .auto("format")
                      .width(1152)
                      .fit("clip")
                      .quality(100)
                      .url() + " 1152w",
                    urlFor(piece.images[0])
                      .auto("format")
                      .width(1536)
                      .fit("clip")
                      .quality(100)
                      .url() + " 1536w",
                    urlFor(piece.images[0])
                      .auto("format")
                      .width(1920)
                      .fit("clip")
                      .quality(100)
                      .url() + " 1920w",
                    urlFor(piece.images[0])
                      .auto("format")
                      .width(2304)
                      .fit("clip")
                      .quality(100)
                      .url() + " 2304w",
                  ].join(", ")}
                  sizes="
        (max-width: 640px) 640px,
        (max-width: 768px) 768px,
        (max-width: 1024px) 1024px,
        (max-width: 1280px) 1280px,
        1536px
        "
                  alt={piece.title + " (zoomed)"}
                />
              </div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

export default ImageStack;
