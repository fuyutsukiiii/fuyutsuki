import { createContext, useContext, useEffect, useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import AllPiecesMenu from "./AllPiecesMenu";
import type { PreviewArtPiece, ProcessedPiece } from "../../../Types";

export const showFullMenu = createContext(false);

const TopOverlay = () => {
  const location = useLocation();

  const [page, setPage] = useState("");
  const [pageSubtext, setPageSubtext] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const galleryWorks = useLoaderData() as PreviewArtPiece[];

  useEffect(() => {
    const page = location.pathname.replace("/", "").toLocaleUpperCase();
    setPage(page);
    if (page === "GALLERY") {
      setPageSubtext("Look - 01");
    }
  }, [location.pathname]);

  return (
    <div className="fixed w-full bg-green-500/50 top-0 flex flex-row justify-between items-start p-4">
      <div className="flex flex-col items-start">
        <span>{page}</span>
        <span>{pageSubtext}</span>
      </div>
      <span className="text-primary-blue">FUYUTSUKI Portfolio</span>
      <div></div>
      {showMenu && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed h-full w-full backdrop-blur-sm "
          >
            <AllPiecesMenu pieces={galleryWorks} />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default TopOverlay;
