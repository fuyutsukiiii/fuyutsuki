import { createContext, Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import type { FullPieceWithSlug, ProcessedPiece } from "../../../Types";
import { client } from "../../sanity/client";
import { urlFor } from "../../sanity/utils";

export const DeviceContext = createContext<"desktop" | "mobile">("desktop");
export const PiecesContext = createContext<ProcessedPiece[]>([]);

const GlobalWrapper = () => {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [pieces, setPieces] = useState<ProcessedPiece[]>([]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDevice("mobile");
      } else {
        setDevice("desktop");
      }
    };

    const getAllPieces = async () => {
      const ALL_PIECES_QUERY = `*[_type == "art"]{
        title,
        date,
        description,
        "images": images[],
        slug
      }`;

      const allPieces = (await client.fetch(
        ALL_PIECES_QUERY
      )) as FullPieceWithSlug[];

      const allProcessedPieces = allPieces.map((piece) => ({
        ...piece,
        images: undefined,
        urls: piece.images.map((image) => {
          return urlFor(image)
            .auto("format")
            .quality(70)
            .fit("clip")
            .maxWidth(window.innerWidth)
            .maxHeight(window.innerHeight)
            .url();
        }),
      }));

      setPieces(allProcessedPieces);
    };

    getAllPieces();

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <PiecesContext value={pieces}>
        <DeviceContext value={device}>
          <Outlet />
        </DeviceContext>
      </PiecesContext>
    </>
  );
};

export default GlobalWrapper;
