import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MobileGalleryNavigation = () => {
  const location = useLocation()
    .pathname.replace("/", "")
    .toLocaleUpperCase()
    .split("/")[0];
  const navigate = useNavigate();

  const menuItems = ["home", "gallery", "contact"];
  const menuItemsFiltered =
    location === "GALLERY"
      ? menuItems.filter((item) => item !== "gallery")
      : menuItems;
  if (location === "GALLERY") {
    menuItems.filter((item) => item !== "gallery");
  }

  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="sm:hidden relative bottom-12 left-0 right-0 px-8 flex justify-between items-center gap-x-4 overflow-x-scroll text-xl text-primary-blue font-source-han-serif pointer-events-none z-999999">
      <span className="overflow-hidden pointer-events-auto" onClick={toggleMenu}>
        menu
      </span>
      <AnimatePresence>
        {menuItemsFiltered.map(
          (menuItem, index) =>
            open && (
              <motion.span
                key={menuItem}
                className="whitespace-nowrap pointer-events-auto"
                onClick={() => navigate(`/${menuItem}`)}
                initial={{ x: -(index + 1) * 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{
                  x: -(index + 1) * 20,
                  opacity: 0,
                  transition: {
                    ease: "easeIn",
                    delay: (menuItemsFiltered.length - index) * 0.02,
                  },
                }}
                transition={{ ease: "easeOut", delay: 0.02 * index }}
              >
                {menuItem}
              </motion.span>
            )
        )}
        {open && (
          <motion.svg
            className="size-4 mr-8 pointer-events-auto"
            viewBox="0 0 30 50"
            onClick={toggleMenu}
            xmlns="http://www.w3.org/2000/svg"
            initial={{ x: -1 * menuItemsFiltered.length * 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{
              x: -1 * menuItemsFiltered.length * 20,
              opacity: 0,
              transition: { ease: "easeIn", delay: 0 },
            }}
            transition={{
              ease: "easeOut",
              delay: 0.02 * menuItemsFiltered.length,
            }}
          >
            <path
              className="stroke-primary-blue stroke-5 fill-none"
              d="M30 0 L0 25 L30 50"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileGalleryNavigation;
