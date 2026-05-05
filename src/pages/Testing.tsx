import type { SanityDocument } from "@sanity/client";
import { client } from "../sanity/client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import Gallery from "./Gallery";
import HeroSection from "../components/organisms/HeroSection";
import AllPiecesMenu from "../components/organisms/AllPiecesMenu";
import type { PreviewArtPiece } from "../../Types";
import { useLoaderData } from "react-router-dom";
import TopLevelOverlay from "./TopLevelOverlay";
import GalleryMenu from "../components/organisms/GalleryMenu";

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
  const result =
    await client.fetch<{ works: SanityDocument[] }[]>(GALLERY_QUERY);
  const { works } = result[0];
  return works;
}

const Testing = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgba(34,197,94,0.2)", "rgba(59,130,246,0.2)"],
  );

  const galleryWorks = useLoaderData() as PreviewArtPiece[];

  // return (
  //   <div className="h-[400vh] w-full bg-yellow-500/20">
  //     <motion.div
  //       className="fixed h-[90%] w-[90%] bg-green-500/20"
  //       style={{ backgroundColor }}
  //     ></motion.div>
  //   </div>
  // );

  return (
    <>
      <div className="h-full w-screen flex flex-col items-center overflow-y-scroll snap-proximity snap-y sm:pb-0 no-scrollbar">
        <GalleryMenu />
        <div className="sticky bg-red-500 top-[50vh] -translate-y-1/2 h-max w-screen mt-[40vh] sm:mt-[40vh] grid-rows-[1fr_1px_1fr] grid-cols-none text-primary-blue pointer-events-auto"></div>
        <div className="sticky bg-red-500 top-[100vh] mt-[44vh] left-0 z-999 w-full"></div>
      </div>
    </>
  );
};

function randomString() {
  return Math.random().toString(36).substring(7);
}

export default Testing;
