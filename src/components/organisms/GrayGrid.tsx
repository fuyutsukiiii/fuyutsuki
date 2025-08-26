interface Props {
  horizontal?: boolean;
}

const GrayGrid = ({horizontal = false}: Props) => {
  const numCols = Math.floor(
    Math.min(window.innerWidth, window.innerHeight) / 40
  );
  //   const numRows = Math.floor(window.innerHeight / 40);
  const numRows = numCols;

  return (
    <div
      className={`fixed h-[200vmax] w-[200vmax] -translate-x-1/2 -translate-y-1/2 grid pointer-events-none ${horizontal ? "" : "rotate-45"} -z-0 `}
      style={{
        gridTemplateColumns: `repeat(${numCols}, 1fr)`,
        gridTemplateRows: `repeat(${numRows}, 1fr)`,
      }}
    >
      {Array.from({ length: numCols * numRows }).map((_, index) => (
        <div
          key={index}
          className="w-full h-full outline-[0.5px] outline-accent-gray"
        />
      ))}
    </div>
  );
};

export default GrayGrid;
