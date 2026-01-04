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
        srcSet={
          [
            urlFor(work.images[0]).auto("format").width(384).quality(70).url() + " 384w",
            urlFor(work.images[0]).auto("format").width(460).quality(70).url() + " 460w",
            urlFor(work.images[0]).auto("format").width(614).quality(70).url() + " 614w",
            urlFor(work.images[0]).auto("format").width(768).quality(70).url() + " 768w",
            urlFor(work.images[0]).auto("format").width(921).quality(70).url() + " 921w",
          ].join(", ")
        }
        sizes="
        (max-width: 640px) 384px,
        (max-width: 768px) 460px,
        (max-width: 1024px) 614px,
        (max-width: 1280px) 768px,
        921px
        "
        alt={work.title}
        loading="lazy"
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 0.98 }}
        onClick={() => navigate(`/illustration/${work.slug.current}`)}
      />
    </>
  );
};

export default GalleryImage;
