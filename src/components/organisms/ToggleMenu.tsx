import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ToggleMenu = () => {
  const menuButtonRef = useRef<HTMLSpanElement>(null);
  const [targetWidth, setTargetWidth] = useState<number | string>(
    "max-content"
  );
  const navigate = useNavigate();

  const handleClick = () => {
    if (menuButtonRef.current) {
      if (targetWidth === menuButtonRef.current.offsetWidth) {
        setTargetWidth("100%");
      } else {
        setTargetWidth(menuButtonRef.current.offsetWidth);
      }
    }
  };

  const navToPage = (page: string) => {
    navigate(page);
  };

  useEffect(() => {
    if (menuButtonRef.current) {
      setTargetWidth(menuButtonRef.current.offsetWidth);
    }
  }, [menuButtonRef.current]);

  return (
    <div className="relative w-full">
      <motion.div
        className="w-full h-max py-3 flex justify-between origin-left overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: targetWidth }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        whileHover={{ width: "100%" }}
      >
        <span
          className="cursor-default"
          ref={menuButtonRef}
        >
          MENU
        </span>
        <span className="cursor-pointer" onClick={() => navToPage("/gallery")}>
          GALLERY
        </span>
        <span className="cursor-pointer" onClick={() => navToPage("/contact")}>
          CONTACT
        </span>
      </motion.div>
    </div>
  );
};

export default ToggleMenu;
