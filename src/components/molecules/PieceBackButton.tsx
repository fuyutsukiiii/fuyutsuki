import { useNavigate } from "react-router-dom";

const PieceBackButton = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/gallery");
      }}
      className="fixed bottom-8 left-8 flex flex-row items-center gap-2 cursor-pointer pointer-events-auto z-999999"
    >
      <svg
        className="size-4"
        viewBox="0 0 30 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="stroke-primary-blue stroke-5 fill-none"
          d="M30 0 L0 25 L30 50"
        />
      </svg>
      <span className="text-primary-blue font-optima text-lg">Back</span>
    </div>
  );
};

export default PieceBackButton;
