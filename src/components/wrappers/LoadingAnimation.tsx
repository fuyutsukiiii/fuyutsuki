import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const OnPageLoadWrapper = ({ children }: Props) => {
  const location = useLocation();

  return (
    <motion.div
      className="relative"
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="absolute inset-0 z-100 pointer-events-none backdrop-blur-lg"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      {children}
    </motion.div>
  );
};

export default OnPageLoadWrapper;
