import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { createContext, useEffect, useState } from "react";
import type { PreviewArtPiece } from "../../../Types";
import AllPiecesMenu from "./AllPiecesMenu";
import OverlayMenuButton from "../atoms/OverlayMenuButton";

const ShowMenuContext = createContext<boolean>(false);
const GalleryMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  const [pageSubtext, setPageSubtext] = useState("Look - 01");

  const galleryWorks = useLoaderData() as PreviewArtPiece[];

  useEffect(() => {
    if (showMenu) {
      setPageSubtext("Look - 02");
    } else {
      setPageSubtext("Look - 01");
    }
  }, [showMenu]);

  useEffect(() => {
    const exitMenu = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowMenu(false);
      }
    };

    document.addEventListener("keydown", exitMenu);
    return () => {
      document.removeEventListener("keydown", exitMenu);
    };
  }, []);

  return (
    <>
      <div
        className="fixed top-0 bottom-0 max-h-dvh w-screen flex flex-col sm:gap-12 py-4 px-3 sm:p-4 z-999999 overflow-y-scroll overflow-x-hidden no-scrollbar"
        style={{
          pointerEvents: showMenu ? "auto" : "none",
          backdropFilter: showMenu ? "blur(44px)" : "none",
        }}
      >
        <div className="sticky top-0 w-full flex flex-row items-start justify-between z-999999">
          <div className="row-start-1 row-end-2 flex flex-col items-start">
            {showMenu && (
              <>
                <span
                  className="font-helvetica-bold text-4xl sm:text-5xl pointer-events-auto cursor-pointer"
                  onClick={() => setShowMenu(false)}
                >
                  GALLERY
                </span>
                <span className="font-optima-italic text-2xl sm:text-3xl text-primary-blue leading-tight">
                  {pageSubtext}
                </span>
              </>
            )}
          </div>
          <div className="col-start-3 col-end-4 flex flex-row items-start justify-end z-999999 pointer-events-auto">
            <div className="size-7">
              <OverlayMenuButton
                showMenu={showMenu}
                onClick={() => setShowMenu(!showMenu)}
              />
            </div>
          </div>
          <span
            className="hidden sm:block absolute left-1/2 -translate-x-1/2 font-optima-italic text-lg text-primary-blue cursor-pointer"
            onClick={() => navigate("/gallery")}
          >
            FUYUTSUKI Portfolio
          </span>
        </div>
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AllPiecesMenu pieces={galleryWorks} />
            </motion.div>
          )}
        </AnimatePresence>
        <div />
      </div>
      <ShowMenuContext value={showMenu}>
        <div style={{ overflow: showMenu ? "hidden" : "visible" }}>
          <Outlet />
        </div>
      </ShowMenuContext>
    </>
  );
};

export default GalleryMenu;
