import type { SanityDocument } from "@sanity/client";
import { client } from "../sanity/client";
import GalleryMenu from "../components/organisms/GalleryMenu";

const GALLERY_QUERY = `*[_type == "gallery"]{
  works[]->{
    _id,
    title,
    date,
    slug,
    "images": images[],
  }
}`;

export async function loader() {
  const result =
    await client.fetch<{ works: SanityDocument[] }[]>(GALLERY_QUERY);
  const { works } = result[0];
  return works;
}

const Testing = () => {
  return (
    <>
      <div className="h-full w-screen flex flex-col items-center overflow-y-scroll snap-proximity snap-y sm:pb-0 no-scrollbar">
        <GalleryMenu />
        <div className="sticky bg-red-500 top-[50vh] -translate-y-1/2 h-max w-screen mt-[40vh] sm:mt-[40vh] grid-rows-[1fr_1px_1fr] grid-cols-none text-primary-blue pointer-events-auto"></div>
        <div className="sticky bg-red-500 top-[100vh] mt-[44vh] left-0 z-999 w-full"></div>
      </div>
    </>
  );
};

export default Testing;
