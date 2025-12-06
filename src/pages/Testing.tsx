import type { SanityDocument } from "@sanity/client";
import { client } from "../sanity/client";
import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import type { PreviewArtPiece } from "../../Types";
import AllPiecesMenu from "../components/organisms/AllPiecesMenu";
import OverlayMenuButton from "../components/atoms/OverlayMenuButton";

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
  const ref = useRef<HTMLSpanElement>(null);
  const [menuButtonWidth, setMenuButtonWidth] = useState(0);
  const [menuButtonHeight, setMenuButtonHeight] = useState(0);

  const pieces = useLoaderData() as PreviewArtPiece[];

  useEffect(() => {
    if (ref.current) {
      setMenuButtonWidth(ref.current.offsetWidth);
      setMenuButtonHeight(ref.current.offsetHeight);
    }
  }, [ref.current]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="h-80 w-80">
        <OverlayMenuButton onClick={() => {}} />
      </div>
    </div>
  );
};

export default Testing;
