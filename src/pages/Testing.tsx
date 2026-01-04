import type { SanityDocument } from "@sanity/client";
import { client } from "../sanity/client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MobileScrollMenu from "../components/molecules/MobileScrollMenu";

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

const Testing = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    console.log(open);
    setOpen((prev) => !prev);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="h-full flex flex-col justify-start items-center gap-4 text-primary-blue">
        <MobileScrollMenu />
      </div>
    </div>
  );
};

function randomString() {
  return Math.random().toString(36).substring(7);
}

export default Testing;