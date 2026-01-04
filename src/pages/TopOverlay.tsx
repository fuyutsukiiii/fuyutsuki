import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import AllPiecesMenu from "../components/organisms/AllPiecesMenu";
import CrossfadeWrapper from "../components/wrappers/CrossfadeWrapper";
import { createContext, useEffect, useState } from "react";
import type { PreviewArtPiece } from "../../Types";
import OverlayMenuButton from "../components/atoms/OverlayMenuButton";

const ShowMenuContext = createContext<boolean>(false);

const TopOverlay = () => {
  const [showMenu, setShowMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState("");
  const [pageSubtext, setPageSubtext] = useState("");

  const galleryWorks = useLoaderData() as PreviewArtPiece[];

  useEffect(() => {
    const page = location.pathname
      .replace("/", "")
      .toLocaleUpperCase()
      .split("/")[0];
    setShowMenu(false);
    setPage(page);
    if (page === "GALLERY") {
      setPageSubtext("Look - 01");
    } else {
      setPageSubtext("");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (showMenu) {
      setPage("GALLERY");
      setPageSubtext("Look - 02");
    } else {
      const page = location.pathname
        .replace("/", "")
        .toLocaleUpperCase()
        .split("/")[0];
      setPage(page);
      if (page === "GALLERY") {
        setPageSubtext("Look - 01");
      } else {
        setPageSubtext("");
      }
    }
  }, [showMenu]);

  useEffect(() => {
    const exitMenu = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowMenu(false);
      }
    };

    document.addEventListener("keydown", exitMenu);
  }, [showMenu]);

  return (
    <>
      <CrossfadeWrapper>
        <div
          className="fixed top-0 bottom-0 right-0 left-0 flex flex-col sm:gap-12 overflow-y-scroll py-4 px-3 sm:p-4 z-10 no-scrollbar"
          style={
            showMenu
              ? { pointerEvents: "auto", backdropFilter: "blur(44px)" }
              : { pointerEvents: "none" }
          }
        >
          <div className="sticky top-0 w-full flex flex-row items-start justify-between z-1">
            <div className="row-start-1 row-end-2 flex flex-col items-start">
              <span className="font-helvetica-bold text-4xl sm:text-5xl pointer-events-auto cursor-pointer" onClick={() => navigate("/home")}>{page}</span>
              <span className="font-optima-italic text-2xl sm:text-3xl text-primary-blue leading-tight">
                {pageSubtext}
              </span>
            </div>
            <div className="col-start-3 col-end-4 flex flex-row items-start justify-end z-9999 pointer-events-auto">
              <div className="size-7">
                <OverlayMenuButton
                  showMenu={showMenu}
                  onClick={() => setShowMenu(!showMenu)}
                />
              </div>
            </div>
            <span className="hidden sm:block absolute left-1/2 -translate-x-1/2 font-optima-italic text-lg text-primary-blue">
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
          <Outlet />
        </ShowMenuContext>
      </CrossfadeWrapper>
    </>
  );
};

export default TopOverlay;
