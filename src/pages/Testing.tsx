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
//   return (
//     <>
//       <div className="h-screen w-screen flex items-center justify-center bg-red-500/50">
//         <div className="h-120 w-200 outline-1">
//             <div className="max-h-full max-w-full bg-blue-500/50 aspect-[1/2]" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Testing;
