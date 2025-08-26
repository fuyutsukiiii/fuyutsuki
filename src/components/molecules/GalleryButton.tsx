import { motion } from "framer-motion";

interface Props {
  width?: number;
  height?: number;
  className: string;
  text: string;
  backgroundColor: string,
  onClick?: () => void;
}

const GalleryButton = ({ width, height, className, text, backgroundColor, onClick }: Props) => {


  return (
    <motion.div
      className={`${className} `}
      style={{
        width: width !== undefined ? width : "100%",
        height: height !== undefined ? height : "100%",
      }}
      initial="animate"
      animate="animate"
      whileHover="hover"
      onClick={onClick}
    >
      <motion.div
        className="h-full cursor-pointer overflow-hidden bg-blend-overlay"
        style={{
          backgroundColor: `${backgroundColor}`,
        }}
        variants={{ animate: { width: 0 }, hover: { width: "100%" } }}
      >
        <div className="flex text-white">
          <span className="pl-6 text-nowrap">{text}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GalleryButton;
