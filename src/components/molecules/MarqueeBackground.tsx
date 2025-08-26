// import { useMemo } from "react";
// import InfiniteVerticalMarquee from "../atoms/InfiniteVerticalMarquee";

// const MarqueeBackground = () => {
//   const offsets = useMemo(
//     () => Array.from({ length: 40 }, () => Math.random() * 100),
//     []
//   );

//   return (
//     <div className="absolute h-screen w-screen px-4 flex flex-row gap-6 overflow-hidden -z-1">
//       {Array.from({ length: 40 }).map((_, index) => (
//         <InfiniteVerticalMarquee
//           className="flex-shrink-0 relative h-screen font-optima text-5xl text-accent-gray"
//           childrenInstances={15}
//           cycleDuration={150}
//           direction={index % 2 === 0 ? "up" : "down"}
//           offsetPercent={offsets[index]}
//           text="fuyutsuki "
//         />
//       ))}
//     </div>
//   );
// };

// export default MarqueeBackground;
