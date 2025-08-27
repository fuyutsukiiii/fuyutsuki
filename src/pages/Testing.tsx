import type { SanityDocument } from "@sanity/client";
import { client } from "../sanity/client";
import { useLoaderData } from "react-router-dom";
import type { PreviewArtPiece } from "../../Types";
import { urlFor } from "../sanity/utils";
import ImageCarousel from "../components/molecules/ImageCarousel";
import RotatingText from "../components/atoms/RotatingText";
import { useEffect, useRef, useState } from "react";

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
  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center bg-red-500/50">
        <div className="h-120 w-200 flex flex-col items-start justify-start outline-1">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="relative pb-12 -mb-12 flex justify-center items-center" key={index}>
              <div className="overflow-y-hidden outline-1">
                <span className="text-xl md:text-5xl tracking-[0.15em] whitespace-nowrap text-white/0">
                  test
                </span>
              </div>
              <div className="absolute overflow-y-hidden outline-1">
                <span className="text-xl md:text-5xl tracking-[0.15em] whitespace-nowrap text-white/0">
                  test
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Testing;
