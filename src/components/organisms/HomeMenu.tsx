// import { AnimatePresence, motion } from "framer-motion";
// import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import GrayGrid from "./GrayGrid";
// import { DeviceContext } from "../templates/GlobalWrapper";
// import PoppingGradientBackground from "../molecules/PoppingGradientBackground";

// const HomeMenu = () => {
//   const device = useContext(DeviceContext);

//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   const nav = (page: string) => {
//     setOpen(false);
//     navigate(`/${page}`);
//   };

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         setOpen(false);
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   });

//   return (
//     <div className="absolute top-0 right-0 pt-8 pr-[20vw] md:pr-[10vw] z-999 text-white">
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             className="fixed inset-0 grid grid-cols-[1fr_4fr_5fr_2fr_1fr] grid-rows-[2fr_2fr_7fr_2fr_4fr] md:grid-cols-[1fr_9fr_1fr_10fr_5fr_2fr_1fr] md:grid-rows-[3fr_8fr_3fr] bg-primary-gray"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.45 }}
//           >
//             <GrayGrid />
//             <div className="row-start-1 row-end-2 col-start-1 col-end-5 md:col-end-8 flex flex-col overflow-visible text-primary-blue pl-4">
//               <span className="font-italiana-regular text-3xl md:text-7xl ">
//                 ILLUSTRATION PORTFOLIO
//               </span>
//               <span className="font-major-mono-display font-extralight text-md md:text-7xl pl-4 md:pl-24">
//                 fuyutsuki
//               </span>
//             </div>
//             {/* <MarqueeBackground /> */}
//             <div className="row-start-2 row-end-6 md:row-end-4 col-start-1 col-end-8 flex flex-col justify-around py-8 gap-0">
//               {["Home", "Gallery", "Contact"].map((page, index) => (
//                 <motion.div
//                   key={page}
//                   className={`relative flex-1 flex items-center w-screen text-6xl tracking-[0.2em] font-inter cursor-pointer pl-8 md:pl-20 text-shadow-sm`}
//                   style={
//                     device === "desktop"
//                       ? { marginLeft: `${index * 3}rem` }
//                       : undefined
//                   }
//                   onClick={() => nav(page.toLowerCase())}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{
//                     opacity: 1,
//                     x: 0,
//                     color: "#fff",
//                   }}
//                   transition={{
//                     opacity: { delay: index * 0.1 },
//                     x: { delay: index * 0.1 },
//                     color: { delay: 0 },
//                   }}
//                   whileHover={{ color: "#0023E7" }}
//                   exit={{ opacity: 0, x: -20 }}
//                 >
//                   {page}
//                   <PoppingGradientBackground />
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//       <motion.span
//         className="absolute text-lg font-inter cursor-pointer text-shadow-sm"
//         onClick={() => setOpen((prev) => !prev)}
//         whileHover={{ color: open ? "#0023E7" : "#fff" }}
//       >
//         MENU
//       </motion.span>
//     </div>
//   );
// };

// export default HomeMenu;
