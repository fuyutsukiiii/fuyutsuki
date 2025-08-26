// import { motion } from "framer-motion";

// interface Props {
//   className?: string;
//   cycleDuration: number;
//   direction?: "up" | "down";
//   writingMode?: "sideways-rl" | "sideways-lr";
//   childrenInstances?: number;
//   offsetPercent?: number;
//   text: string;
// }

// const InfiniteVerticalMarquee = ({
//   className,
//   cycleDuration,
//   direction = "up",
//   writingMode = "sideways-lr",
//   childrenInstances = 2,
//   offsetPercent = 0,
//   text,
// }: Props) => {
//   const childText = Array.from({ length: childrenInstances }, () => text);
//   const isUp = direction === "up";
//   const animate = { y: isUp ? [`${0 - offsetPercent}%`, `${-100 - offsetPercent}%`] : [`${0 + offsetPercent}%`, `${100 + offsetPercent}%`] };

//   return (
//     <div
//       className={`${className} flex ${
//         isUp ? "flex-col" : "flex-col-reverse"
//       } overflow-hidden`}
//     >
//       {childText.map((text, index) => (
//         <motion.span
//           className="whitespace-pre"
//           key={index}
//           animate={animate}
//           initial={{ y: isUp ? `${offsetPercent}%` : `-${offsetPercent}%` }}
//           transition={{
//             duration: cycleDuration,
//             ease: "linear",
//             repeat: Infinity,
//           }}
//           style={{ display: "block", writingMode: writingMode }}
//         >
//           {text}
//         </motion.span>
//       ))}
//     </div>
//   );
// };

// export default InfiniteVerticalMarquee;