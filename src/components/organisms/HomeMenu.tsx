import { useNavigate } from "react-router-dom";

const HomeMenu = () => {
  const navigate = useNavigate();

  return (
    <>
      {["HOME", "GALLERY", "CONTACT"].map((item) => {
        return (
          <span
            key={item}
            className="font-optima font-bold md:text-3xl cursor-pointer"
            onClick={() => navigate(`/${item.toLowerCase()}`)}
          >
            {item}
          </span>
        );
      })}
    </>
  );
};

export default HomeMenu;
