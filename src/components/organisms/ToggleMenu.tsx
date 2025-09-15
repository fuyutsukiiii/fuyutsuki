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
        console.log("hit");
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
        className="w-full h-max flex justify-between origin-left overflow-hidden"
        initial={{ width: "max-content" }}
        animate={{ width: targetWidth }}
        transition={{
          duration: 0.2,
        }}
      >
        <span
          ref={menuButtonRef}
          onClick={handleClick}
          className="cursor-pointer"
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
