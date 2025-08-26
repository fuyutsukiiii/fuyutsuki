// import type { SanityDocument } from "@sanity/client";
// import { useLoaderData, useNavigate } from "react-router-dom";
// import { client } from "../sanity/client";
// import type { PreviewArtPiece } from "../../Types";
// import { motion } from "framer-motion";
// import ImageCarousel from "../components/molecules/ImageCarousel";
// import useTimer from "../hooks/useTimer";
// import { urlFor } from "../sanity/utils";
// import { useContext, useEffect, useRef, useState } from "react";
// import GalleryButton from "../components/molecules/GalleryButton";
// import HomeMenu from "../components/organisms/HomeMenu";
// import LeftRightExpand from "../components/atoms/LeftRightExpand";
// import { DeviceContext } from "../components/templates/GlobalWrapper";
// import { Menu } from "../components/organisms/Menu";

// const isMobile = window.innerWidth < 768;

// const FEATURED_QUERY = `*[_type == "home${isMobile ? "-mobile" : ""}"]{
//   works[]->{
//     primary->{
//       _id,
//       title,
//       images
//     },
//     background,
//   }
// }`;

// export async function loader() {
//   const result = await client.fetch<{ works: SanityDocument[] }[]>(
//     FEATURED_QUERY
//   );
//   const { works } = result[0];
//   const backgrounds = works.map((work) => work.background);
//   const featuredWorks = works.map((work) => work.primary);

//   return { backgrounds, featuredWorks };
// }

// const OldHome = () => {
//   const device = useContext(DeviceContext);

//   const CYCLE_DURATION = 5;

//   const { backgrounds, featuredWorks } = useLoaderData() as {
//     backgrounds: any[];
//     featuredWorks: PreviewArtPiece[];
//   };

//   const navigate = useNavigate();

//   const galleryRef = useRef<HTMLDivElement>(null);

//   const [time] = useTimer();
//   const currentPiece = Math.floor(time / CYCLE_DURATION) % backgrounds.length; // Backgrounds.length is the same as the length of the other arrays
//   const prevPiece =
//     currentPiece === 0 ? backgrounds.length - 1 : currentPiece - 1;

//   const backgroundUrl = urlFor(backgrounds[currentPiece])
//     .auto("format")
//     .quality(70)
//     .fit("clip")
//     .url();
//   const prevBackgroundUrl = urlFor(backgrounds[prevPiece])
//     .auto("format")
//     .quality(70)
//     .fit("clip")
//     .url();

//   const navToGallery = () => {
//     navigate("/gallery");
//   };

//   return (
//     <div className="relative h-screen w-screen">
//       {device === "desktop" ? (
//         <HomeMenu />
//       ) : (
//         <Menu classNameOverride="text-white/70" />
//       )}
//       <div className="relative grid grid-cols-[2fr_4fr_5fr_2fr_1fr] grid-rows-[4fr_7fr_2fr_4fr] md:grid-cols-[1fr_9fr_1fr_10fr_5fr_2fr_1fr] md:grid-rows-[3fr_8fr_3fr] bg-black/80 h-screen w-screen overflow-scroll text-white">
//         {/* Content */}
//         <div className="row-start-1 row-end-2 col-start-1 col-end-5 md:col-end-8 flex flex-col overflow-visible text-white pl-4">
//           <span className="font-italiana-regular text-3xl md:text-7xl ">
//             ILLUSTRATION PORTFOLIO
//           </span>
//           <span className="font-major-mono-display font-extralight text-md md:text-7xl pl-4 md:pl-24">
//             fuyutsuki
//           </span>
//         </div>
//         <div className="row-start-2 row-end-3 md:row-start-2 md:row-end-3 col-start-2 col-end-4 md:col-end-6 relative overflow-visible grid grid-cols-2 z-1">
//           {/* Layered white shadow */}
//           <div className="absolute col-start-1 col-span-2 md:col-start-2 md:col-span-1 w-full aspect-[2/3] md:aspect-[4/3] bg-white translate-x-[12px] translate-y-[12px]" />
//           <div className="col-start-1 col-span-2 md:col-start-2 md:col-span-1 w-full aspect-[2/3] md:aspect-[4/3] z-1">
//             <ImageCarousel
//               className="h-full w-full"
//               works={featuredWorks}
//               cycleDuration={CYCLE_DURATION}
//             />
//           </div>
//           <div className="font-bold-inter text-[12.5vw] md:text-[15vh] tracking-[2vw]">
//             <LeftRightExpand
//               className="absolute left-[10%] bottom-0 translate-y-1/2 pl-4"
//               ref={galleryRef}
//             >
//               GALLERY
//             </LeftRightExpand>
//             <div
//               onClick={() => {
//                 if (device === "mobile") navToGallery();
//               }}
//             >
//               <LeftRightExpand
//                 className="absolute left-[10%] bottom-0 translate-y-1/2 pl-4 z-1 text-white/100 md:text-white/50 bg-primary-blue md:bg-primary-blue/0 md:mix-blend-screen"
//                 ref={galleryRef}
//               >
//                 GALLERY
//               </LeftRightExpand>
//             </div>
//           </div>
//           {/* <GalleryButton
//             className="absolute left-[10%] bottom-0 translate-y-1/2 font-bold-inter text-[12.5vw] md:text-[15vh] tracking-[2vw] z-2"
//             text="GALLERY"
//             width={galleryRef.current?.clientWidth || 0}
//             height={galleryRef.current?.clientHeight || 0}
//             backgroundColor="#0023E7"
//             onClick={navToGallery}
//           /> */}
//         </div>
//         {/* Background */}
//         <motion.div
//           key={currentPiece}
//           className="absolute h-full w-full -z-100"
//           style={{
//             backgroundImage: `url(${backgroundUrl})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0.2 }}
//           transition={{ ease: "linear" }}
//         />
//         <motion.div
//           key={prevPiece}
//           className="absolute h-full w-full -z-99"
//           style={{
//             backgroundImage: `url(${prevBackgroundUrl})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//           initial={{ opacity: 1 }}
//           animate={{ opacity: 0 }}
//           exit={{ opacity: 0.2 }}
//           transition={{ ease: "linear" }}
//         />
//       </div>
//     </div>
//   );
// };

// export default OldHome;
