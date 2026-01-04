import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import type { FullPieceWithSlug } from "../../../Types";
import { client } from "../../sanity/client";
import InitialLoadWrapper from "./InitialLoadWrapper";

export const DeviceContext = createContext<"desktop" | "mobile">("desktop");
export const PiecesContext = createContext<FullPieceWithSlug[]>([]);

const GlobalWrapper = () => {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [pieces, setPieces] = useState<FullPieceWithSlug[]>([]);
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
      const ALL_VISIBLE_PIECES_QUERY = `*[_type == "gallery"]{
        works[]->{
          title,
          date,
          description,
          "images": images[],
          slug,
        }
      }`;

      const result = await client.fetch(ALL_VISIBLE_PIECES_QUERY);
      const allPieces = result[0].works as FullPieceWithSlug[];

      setPieces(allPieces);
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
      <div className="fixed h-screen w-screen bg-primary-gray" />
      <PiecesContext value={pieces}>
        <DeviceContext value={device}>
          <InitialLoadWrapper>
            <Outlet />
          </InitialLoadWrapper>
        </DeviceContext>
      </PiecesContext>
    </>
  );
};

export default GlobalWrapper;
