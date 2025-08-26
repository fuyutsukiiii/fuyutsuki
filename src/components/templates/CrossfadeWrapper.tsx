import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const CrossfadeWrapper = ({ children }: Props) => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default CrossfadeWrapper;
