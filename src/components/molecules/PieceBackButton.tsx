import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const PieceBackButton = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => {
        navigate("/");
      }}
      className="fixed bottom-4 sm:bottom-8 left-8 flex flex-row items-center gap-1 cursor-pointer pointer-events-auto z-999"
      whileHover="active"
      initial="inactive"
      animate="inactive"
    >
      <motion.svg
        className="size-4"
        viewBox="0 0 30 50"
        xmlns="http://www.w3.org/2000/svg"
        variants={{
          active: { x: -5 },
          inactive: { x: 0 },
        }}
      >
        <path
          className="stroke-primary-blue stroke-5 fill-none"
          d="M30 0 L0 25 L30 50"
        />
      </motion.svg>
      <span className="text-primary-blue font-optima text-lg">Back</span>
    </motion.div>
  );
};

export default PieceBackButton;
