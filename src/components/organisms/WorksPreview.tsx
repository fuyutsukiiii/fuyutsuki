import type { HomePiece } from "../../../Types";

interface Props {
  works: HomePiece[];
  cycleDuration: number;
  className?: string;
}

const WorksPreview = ({ works, className }: Props) => {
  return (
    <div className={className}>
      {works.map((work) => (
        <div key={work._id} className="work-preview"></div>
      ))}
    </div>
  );
};

export default WorksPreview;
