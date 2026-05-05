import { Link } from "react-router-dom";
import type { PreviewArtPiece } from "../../../Types";
import AllPiecesGrid from "../molecules/AllPiecesGrid";

interface Props {
  pieces: PreviewArtPiece[];
}

const AllPiecesMenu = ({ pieces }: Props) => {
  const twitterLink = "https://www.twitter.com/fuyutsuki11/";
  const instagramLink = "https://www.instagram.com/fuyutsuki_/";
  const pixivLink = "https://www.pixiv.net/en/users/6427643";

  return (
    <div className="h-max w-dvw flex flex-col pt-12 sm:pt-12 gap-30 px-8 sm:px-12 overflow-y-scroll no-scrollbar z-99999">
      <div>
        <AllPiecesGrid pieces={pieces} />
      </div>
      <div className="flex flex-col gap-2 sm:gap-6 sm:flex-row justify-center sm:justify-between items-start font-helvetica text-md font-light">
        <span>
          Reproduction, reposting or modification of the content of this site is
          prohibited.
        </span>
        <span>
          当サイトのコンテンツを無断で複製、転載、改変することを固く禁じます
        </span>
      </div>
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center font-helvetica text-md font-light mb-20">
        <span>Fuyutsuki. All Rights Reserved.</span>
        <span>2023-2026</span>
        <div className="flex flex-row justify-center items-center gap-1">
          <Link to={twitterLink} className="hover:underline">
            Twitter
          </Link>
          <Link to={instagramLink} className="hover:underline">
            Instagram
          </Link>
          <Link to={pixivLink} className="hover:underline">
            Pixiv
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllPiecesMenu;
