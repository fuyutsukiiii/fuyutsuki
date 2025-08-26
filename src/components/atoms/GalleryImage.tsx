import type { PreviewArtPiece } from "../../../Types";
import { urlFor } from "../../sanity/utils";
import { motion } from "framer-motion";

interface Props {
  work: PreviewArtPiece;
}

const GalleryImage = ({ work }: Props) => {
  return (
    <>
      <motion.img
        className="max-h-full max-w-full shadow-[20px_20px_40px_rgba(0,0,0,0.5)] ring-[4px] ring-white cursor-pointer"
        src={urlFor(work.images[0]).auto('format').quality(70).url()}
        alt={work.title}
        loading="eager"
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
      />
    </>
  );
};

export default GalleryImage;
