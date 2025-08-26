import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  ref?: React.Ref<HTMLDivElement>;
}

const LeftRightExpand = ({
  children,
  className,
  delay = 0,
  duration = 1,
  ref,
}: Props) => {
  const breakpoints = [0, delay / duration, 1];

  return (
    <motion.div
      className={`${className} overflow-hidden`}
      initial={{ maxWidth: 0 }}
      animate={{ maxWidth: ["0vw", "0vw", "100vw"] }}
      transition={{ duration: duration, times: breakpoints, ease: "easeInOut" }}
      ref={ref}
    >
      <div className="flex">
        <span className={`text-nowrap`}>{children}</span>
      </div>
    </motion.div>
  );
};

export default LeftRightExpand;
