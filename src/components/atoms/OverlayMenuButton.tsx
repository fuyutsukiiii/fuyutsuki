import { motion, transform, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
interface Props {
  onClick: () => void;
}

const OverlayMenuButton = ({ onClick }: Props) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
    onClick();
  };

  return (
    <div
      className="relative h-full w-full aspect-square cursor-pointer"
      onClick={handleClick}
    >
      {Array.from({ length: 3 }).map((_, index) => {
        const open = {
          rotate: -90,
          x: `${(index - 1) * 40}%`,
        };

        const closed = {
          rotate: 0,
        };

        return (
          <motion.div
            key={"menu component (" + (index - 1) + ")"}
            className="absolute top-[40%] h-[22%] w-full flex flex-row justify-between"
            variants={{ closed, open }}
            transition={{ ease: "easeInOut", duration: 0.1 }}
            animate={active ? "open" : "closed"}
          >
            {Array.from({ length: 3 }).map((_, gridIndex) => {
              return (
                <div
                  key={`menu block: ${gridIndex}, ${index}`}
                  className="bg-primary-blue h-full aspect-square"
                />
              );
            })}
          </motion.div>
        );
      })}
    </div>
  );
};

export default OverlayMenuButton;
