import { motion } from "framer-motion";
import type { PreviewArtPiece } from "../../../Types";
import { urlFor } from "../../sanity/utils";
import { useNavigate } from "react-router-dom";

interface Props {
  pieces: PreviewArtPiece[];
}

const AllPiecesGrid = ({ pieces }: Props) => {

  const navigate = useNavigate();

  return (
    <div className="flex flex-row flex-wrap justify-start sm:gap-x-[8%] sm:gap-y-20">
      {pieces.map((piece, pieceNum) => (
        <div className="flex flex-col items-center gap-2 height-0 grow-0 shrink-0 basis-[10%]">
          <motion.div
            className="h-full w-full shadow-[0px_0px_20px_rgba(0,0,0,0.5)]"
            key={piece._id}
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 0.95 }}
          >
            <motion.img
              className="h-full w-full object-cover cursor-pointer"
              src={urlFor(piece.images[0])
                .auto("format")
                .width(400)
                .height(550)
                .fit("clip")
                .quality(70)
                .url()}
              alt={piece.title}
              loading="eager"
              onClick={() => navigate(`/illustration/${piece.slug.current}`)}
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default AllPiecesGrid;
