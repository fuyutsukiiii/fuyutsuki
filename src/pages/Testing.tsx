// import type { SanityDocument } from "@sanity/client";
// import { client } from "../sanity/client";
// import ToggleMenu from "../components/organisms/ToggleMenu";
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
//   const ref = useRef<HTMLSpanElement>(null);
//   const [menuButtonWidth, setMenuButtonWidth] = useState(0);
//   const [menuButtonHeight, setMenuButtonHeight] = useState(0);

//   useEffect(() => {
//     if (ref.current) {
//       setMenuButtonWidth(ref.current.offsetWidth);
//       setMenuButtonHeight(ref.current.offsetHeight);
//     }
//   }, [ref.current]);

//   return (
//     <div className="h-screen w-screen flex items-center justify-center">
//       <div className="h-[50%] w-[50%] outline-1 flex items-center justify-center">
//         <ToggleMenu
//           menuButtonWidth={menuButtonWidth}
//           menuButtonHeight={menuButtonHeight}
//         >
//           <span ref={ref}>Menu</span>
//           <span>Menu</span>
//           <span>Menu</span>
//         </ToggleMenu>
//       </div>
//     </div>
//   );
// };

// export default Testing;
