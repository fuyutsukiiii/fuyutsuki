import type { HomePiece } from "../../../Types";
import useTimer from "../../hooks/useTimer";

interface Props {
  works: HomePiece[];
  cycleDuration: number;
  className?: string;
}

const WorksPreview = ({ works, cycleDuration, className }: Props) => {
  const [time] = useTimer();

  return (
    <div className={className}>
      {works.map((work) => (
        <div key={work._id} className="work-preview"></div>
      ))}
    </div>
  );
};

export default WorksPreview;
