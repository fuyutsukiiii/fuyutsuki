import { motion } from "framer-motion";

const LoadingImagePlaceholder = () => {
  return (
    <div className="h-[300px] w-[225px] md:h-[600px] md:w-[400px] bg-gradient-to-r from-accent-gray/80 via-primary-gray to-accent-gray border border-gray-300 flex items-center justify-center">
      <div className="flex gap-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingImagePlaceholder;
