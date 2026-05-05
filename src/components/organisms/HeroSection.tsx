import { motion, useScroll, useTransform } from "motion/react";
import ScrollIndicator from "../atoms/ScrollIndicator";

const FINAL_TEXT_OFFSET = 200;
const FINAL_IMAGE_OFFSET = 400;
const WINDOW_HEIGHTS = 1.7;

interface Props {
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}

const HeroSection = ({ scrollContainerRef }: Props) => {
  const { scrollY } = scrollContainerRef
    ? useScroll({ container: scrollContainerRef })
    : useScroll();

  const textOffset = useTransform(
    scrollY,
    [0, window.innerHeight * WINDOW_HEIGHTS],
    [0, -1 * FINAL_TEXT_OFFSET],
  );
  const imageOffset = useTransform(
    scrollY,
    [0, window.innerHeight * WINDOW_HEIGHTS],
    [0, -1 * FINAL_IMAGE_OFFSET],
  );
  const backgroundColor = useTransform(
    scrollY,
    [0, (window.innerHeight * WINDOW_HEIGHTS) / 2],
    ["rgba(255,255,255,1)", "#ebebeb"],
  );
  const imgLayerIndex = useTransform(scrollY, [2, 30], [2, 10]);
  const illustratorTextOpacity = useTransform(scrollY, [0, 30, 50], [1, 1, 0]);

  // source hans serif, helvetica bold, optima bold
  return (
    <motion.div
      className="relative w-full shrink-0"
      style={{
        height: `${WINDOW_HEIGHTS * 100}vh`,
        backgroundColor: backgroundColor,
      }}
    >
      <div className="sticky top-0 h-screen w-screen">
        <motion.div
          className="relative h-screen w-screen inset-0"
          style={{ y: textOffset }}
        >
          <div className="hidden sm:block absolute bottom-0 right-0 mb-4 mr-8 z-99">
            {/* <span className="absolute rotate-90 top-0 -translate-y-5/3 left-1/2 -translate-x-1/2 font-optima font-extralight text-primary-blue">Scroll</span> */}
            <ScrollIndicator />
          </div>

          <div className="p-6 sm:p-0 sm:mx-auto pt-18 sm:pt-[25vh] h-max w-max flex flex-col items-center gap-2 sm:gap-0">
            <span className="self-start pl-[0.4rem] sm:pl-[7.5vw] text-primary-blue text-4xl font-helvetica-bold">
              Presenting
            </span>

            <span className="sm:hidden self-center text-[35vw] font-bold leading-22">
              FUYU
            </span>
            <span className="sm:hidden self-center text-[28vw] font-bold leading-28">
              TSUKI
            </span>
            <span className="hidden sm:block text-[16vw] font-[650] leading-40">
              FUYUTSUKI
            </span>

            <div className="hidden w-full pt-2 sm:flex flex-row justify-between">
              <div className="pl-[10vw] flex flex-col text-dark-gray">
                <span className="text-3xl font-optima bold">Starring</span>
                <span className="text-[3rem] leading-8 font-source-han-serif">
                  Leise
                </span>
              </div>
              <span className="text-primary-blue text-3xl font-helvetica-bold pr-3">
                Illustrator
              </span>
            </div>
          </div>
          <div className="sm:hidden absolute top-[44vh] left-6 flex flex-col items-center z-2 text-dark-gray">
            <span className="text-2xl font-optima bold">Starring</span>
            <span className="text-[2rem] leading-8 font-source-han-serif">
              Leise
            </span>
          </div>
        </motion.div>
        <motion.span
          className="sm:hidden absolute left-6 top-[63vh] text-primary-blue text-3xl font-helvetica-bold z-9"
          style={{ opacity: illustratorTextOpacity }}
        >
          Illustrator
        </motion.span>

        <motion.img
          className="hidden sm:block absolute top-[44vh] left-[55vw] -translate-x-1/2 -translate-y-1/2 h-[47vh] w-auto object-contain z-0 pointer-events-none"
          src="../fuyu-sign.png"
          alt="Fuyutsuki signature"
          style={{ y: textOffset }}
        />
        <motion.img
          className="absolute bottom-0 left-0 h-screen w-screen object-bottom object-contain z-2 pointer-events-none"
          style={{ y: imageOffset, zIndex: imgLayerIndex }}
          src="../hero1.webp"
          alt="Leise Hero Image"
        />
      </div>
    </motion.div>
  );
};

export default HeroSection;
