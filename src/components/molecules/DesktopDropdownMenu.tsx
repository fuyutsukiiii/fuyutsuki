import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DesktopDropdownMenu = () => {
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
    <div className="not-sm:hidden flex h-full flex-col justify-start items-center gap-4 text-primary-blue text-xl font-source-han-serif pointer-events-auto">
      <span className="cursor-pointer" onClick={toggleMenu}>
        menu
      </span>
      <AnimatePresence>
        {menuItemsFiltered.map(
          (menuItem, i) =>
            open && (
              <motion.span
                className="absolute cursor-pointer"
                key={menuItem}
                onClick={() => navigate(`/${menuItem}`)}
                initial={{ opacity: 0, y: (i + 1) * 6 }}
                animate={{
                  opacity: 1,
                  y:
                    (20 + 30) /* line height (20px) + spacing (30px) */ *
                    (i + 1),
                }}
                exit={{
                  opacity: 0,
                  y: (i + 1) * 6, // Slight offset
                  transition: {
                    duration: 0.15,
                    delay: i * 0.03,
                    ease: "easeIn",
                  },
                }}
                transition={{
                  duration: 0.15,
                  delay: (menuItemsFiltered.length - i - 1) * 0.02, // Farthest element appears first
                  ease: "easeOut",
                }}
              >
                {menuItem}
              </motion.span>
            )
        )}
      </AnimatePresence>
    </div>
  );
};

export default DesktopDropdownMenu;
