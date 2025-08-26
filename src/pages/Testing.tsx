// import type { SanityDocument } from "@sanity/client";
// import { client } from "../sanity/client";
// import { useLoaderData } from "react-router-dom";
// import type { PreviewArtPiece } from "../../Types";
// import { urlFor } from "../sanity/utils";
// import ImageCarousel from "../components/molecules/ImageCarousel";
// import RotatingText from "../components/atoms/RotatingText";
// import { useEffect, useRef, useState } from "react";

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

// const Testing = () => {
//   const { backgrounds, featuredWorks } = useLoaderData() as {
//     backgrounds: any[];
//     featuredWorks: PreviewArtPiece[];
//   };

//   const ref = useRef<HTMLDivElement>(null);
//   const [scroll, setScroll] = useState(0);

//   useEffect(() => {
//     const container = ref.current;
//     if (!container) return;

//     let lastScrollTop = container.scrollTop;
//     let frameId: number;

//     const tick = () => {
//       if (container.scrollTop === lastScrollTop) {
//         container.scrollTop += 1;
//         container.scrollTop -= 1;
//       }
//       lastScrollTop = container.scrollTop;
//       frameId = requestAnimationFrame(tick);
//     };

//     frameId = requestAnimationFrame(tick);

//     return () => cancelAnimationFrame(frameId);
//   }, []);

//   return (
//     <>
//       <div className="h-screen w-screen flex items-center justify-center bg-red-500/50">
//         <div
//           className="h-80 w-80 flex flex-col items-center justify-around py-8 gap-20 overflow-y-scroll snap-y snap-mandatory no-scrollbar outline-1"
//           ref={ref}
//         >
//           {Array.from({ length: 100 }).map((_, index) => (
//             <div
//               key={index}
//               className="w-20 h-20 bg-green-500 flex-shrink-0 snap-start"
//             >
//               {index}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Testing;
