// import { motion } from "framer-motion";

// interface Props {
//   className?: string;
//   cycleDuration: number;
//   direction?: "left" | "right";
//   childrenInstances?: number;
//   text: string;
// }

// const InfiniteMarquee = ({
//   className,
//   cycleDuration,
//   direction,
//   childrenInstances = 2,
//   text,
// }: Props) => {
//   const childText = Array.from({ length: childrenInstances }, () => text);
//   const isRight = direction === "right";
//   const animate = { x: isRight ? ["0%", "-100%"] : ["0%", "100%"] };

//   return (
//     <div
//       className={`${className} flex ${
//         isRight ? "" : "flex-row-reverse"
//       } whitespace-nowrap overflow-hidden`}
//     >
//       {childText.map((text, index) => (
//         <motion.span
//         className="whitespace-pre"
//           key={index}
//           animate={animate}
//           transition={{
//             duration: cycleDuration,
//             ease: "linear",
//             repeat: Infinity,
//           }}
//         >
//           {text}
//         </motion.span>
//       ))}
//     </div>
//   );
// };

// export default InfiniteMarquee;
