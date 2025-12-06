import { useNavigate } from "react-router-dom";
import type { PreviewArtPiece } from "../../../Types";
import { urlFor } from "../../sanity/utils";
import { motion } from "framer-motion";

interface Props {
  work: PreviewArtPiece;
}

const GalleryImage = ({ work }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <motion.img
        className="max-h-full max-w-full cursor-pointer"
        src={urlFor(work.images[0]).auto("format").quality(70).url()}
        alt={work.title}
        loading="eager"
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 0.98 }}
        onClick={() => navigate(`/illustration/${work.slug.current}`)}
      />
    </>
  );
};

export default GalleryImage;
