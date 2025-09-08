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

interface Props {
  urls: string[];
  scrollRef: RefObject<HTMLElement | null>;
}

const ImageStack = ({ urls, scrollRef }: Props) => {
  const device = useContext(DeviceContext);

  const [initialScroll, setInitialScroll] = useState(0);

  const [canZoom, setCanZoom] = useState(false);
  const [inView, setInView] = useState(false);
  const [zoomedUrl, setZoomedUrl] = useState<string | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInView(urls.length === 1);
    setCanZoom(urls.length === 1);

    if (!ref.current) return;
    if (!scrollRef.current) return;

    setInitialScroll(scrollRef.current.scrollTop);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (inView) return; // Don't observe if already in view
        // Logs the percentage of the element visible in the viewport (0 to 1)
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

  const handleZoom = (url: string | null) => {
    if (canZoom) {
      setZoomedUrl(url);
    }
  };

  useEffect(() => {
    if (!zoomedUrl) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setZoomedUrl(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [zoomedUrl]);

  return (
    <motion.div
      className="relative w-screen overflow-visible flex flex-col items-center justify-start no-scrollbar gap-4"
      // Only animate if there are multiple pieces, otherwise the image stack doesn't really make sense.
    >
      {urls.map((url, index) => {
        const randomTilt = useMemo(() => Math.random() * 20 - 10, []);

        return (
          <>
            <motion.div
              key={url}
              className="h-[100vmin] w-[85vw] md:w-[90vw] flex-shrink-0 flex justify-center items-center"
              initial={{ y: `-${100 * index}%` }}
              animate={inView ? { y: 0 } : { y: `-${100 * index}%` }}
              transition={{ duration: 0.6 }}
              ref={index === 0 ? ref : undefined}
            >
              <motion.img
                className="max-h-full max-w-full object-contain"
                initial={
                  urls.length === 1
                    ? { scale: 1, rotate: "0deg" }
                    : { scale: 0.6, rotate: `${randomTilt}deg` }
                }
                animate={
                  inView
                    ? { scale: 1, rotate: "0deg" }
                    : { scale: 0.6, rotate: `${randomTilt}deg` }
                }
                transition={{ duration: 0.6 }}
                src={url}
                style={{ cursor: canZoom ? "zoom-in" : "default" }}
                onClick={() => handleZoom(url)}
              />
            </motion.div>
            {zoomedUrl == url && (
              <div
                key={url + "-zoomed"}
                className="fixed inset-0 bg-black/90 overflow-auto z-9999"
                style={{ cursor: "zoom-out" }}
                onClick={() => setZoomedUrl(null)}
              >
                <img
                  className="m-0 block object-contain"
                  style={{ width: "200vw", height: "200vh" }}
                  src={url}
                  alt=""
                  draggable={false}
                />
              </div>
            )}
          </>
        );
      })}
    </motion.div>
  );
};

export default ImageStack;
