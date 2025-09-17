import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

const InitialLoadWrapper = ({ children }: Props) => {

  return (
    <div
      className="relative h-screen w-screen"
    >
      <motion.div
        className="absolute inset-0 z-100 pointer-events-none backdrop-blur-lg"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      {children}
    </div>
  );
};

export default InitialLoadWrapper;
