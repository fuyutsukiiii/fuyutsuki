import { useNavigate } from "react-router-dom";

interface Props {
  classNameOverride?: string;
}

export const Menu = ({classNameOverride}: Props) => {
  const navigate = useNavigate();

  const nav = (page: string) => {
    navigate(`/${page}`);
  };

  return (
    <>
      <div className="fixed h-screen w-[5vw] top-1/2 -translate-y-1/2 left-0 grid grid-cols-1 grid-rows-5 p-4 z-999 font-optima">
        {["Contact", "Gallery", "Home"].map((text, index) => (
          <span
            className={`place-self-center col-start-1 cursor-pointer drop-shadow-md text-primary-blue hover:text-white hover:text-shadow-md duration-200 font-light ${classNameOverride}`}
            key={text}
            style={{
              writingMode: "sideways-lr",
              gridRowStart: 5 - index,
            }}
            onClick={() => nav(text.toLowerCase())}
          >
            {text}
          </span>
        ))}
      </div>
    </>
  );
};

{
  /* <div className="absolute top-0 left-0 w-screen h-[10vh] bg-black/12.5 grid grid-rows-1 grid-cols-[7fr_3fr]">
  <div className="rows-start-1 col-start-2 flex items-center justify-around text-3xl text-black font-inter">
    <motion.div
      initial={{ color: "#000" }}
      whileHover={{ color: "#fff" }}
    >
      <PageNavigate url="/new-gallery" text="Home" />
    </motion.div>
    <motion.div
      initial={{ color: "#000" }}
      whileHover={{ color: "#fff" }}
    >
      <PageNavigate url="/new-gallery" text="Gallery" />
    </motion.div>
    <motion.div
      initial={{ color: "#000" }}
      whileHover={{ color: "#fff" }}
    >
      <PageNavigate url="/new-gallery" text="Contact" />
    </motion.div>
  </div>
</div> */
}
