import { useNavigate } from "react-router-dom";

interface Props {
  url: string;
  text: string;
  className?: string;
  
}

const PageNavigate = ({ url, text, className }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(url);
  };

  return (
    <span
      onClick={handleClick}
      className={`${className} cursor-pointer`}
    >
      {text}
    </span>
  );
};

export default PageNavigate;
