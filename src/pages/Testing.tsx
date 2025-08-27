import type { SanityDocument } from "@sanity/client";
import { client } from "../sanity/client";
import { motion } from "framer-motion";

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

export async function loader() {
  const result = await client.fetch<{ works: SanityDocument[] }[]>(
    FEATURED_QUERY
  );
  const { works } = result[0];
  const backgrounds = works.map((work) => work.background);
  const featuredWorks = works.map((work) => work.primary);

  return { backgrounds, featuredWorks };
}

const Testing = () => {
  const dummyArray = [0, 1, 2];

  const CYCLE_DURATION = 4;
  const totalDuration = CYCLE_DURATION * dummyArray.length;
  const TRANSITION_TIME = 200;

  const translationArray = Array.from({
    length: dummyArray.length * 2 + 1,
  }).map(
    (_, index) => `-${(100 / dummyArray.length / 2) * Math.floor(index / 2)}%`
  );
  const breakpoints = Array.from({ length: dummyArray.length * 2 + 1 }).map(
    (_, index) => {
      return index % 2 === 0
        ? (1 / dummyArray.length) * (index / 2)
        : (1 / dummyArray.length) * ((index + 1) / 2) - TRANSITION_TIME / (totalDuration * 1000);
    }
  );

  console.log(translationArray, breakpoints);

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center bg-red-500/50">
        <div className="h-120 w-200 grid place-items-center outline-1">
          <div className="h-40 w-40 outline-1 overflow-hidden">
            <motion.div
              className="flex w-max"
              initial={{ x: 0 }}
              animate={{ x: translationArray }}
              transition={{
                duration: totalDuration,
                ease: "linear",
                times: breakpoints,
                repeat: Infinity,
              }}
            >
              {[...dummyArray, ...dummyArray].map((num, index) => (
                <div
                  key={index}
                  className="h-40 w-40 outline-1 outline-white flex-shrink-0 bg-blue-500/80"
                >
                  {num}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testing;
