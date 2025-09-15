import { motion } from "framer-motion";

interface Props {
  bounce: boolean;
}

const BouncingArrow = ({ bounce }: Props) => (
  <motion.span
    initial={{ y: 0 }}
    animate={bounce ? { y: [0, 20, 0] } : undefined}
    transition={
      bounce
        ? {
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
            repeatDelay: 0.5,
            delay: 0.8,
          }
        : undefined
    }
    className="text-4xl"
  >
    ↓
  </motion.span>
);

export default BouncingArrow;
