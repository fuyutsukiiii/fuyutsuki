import { useEffect, useRef, useState } from "react";

const isMobile = window.innerWidth < 768;

const Grid = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  const [rows, setRows] = useState(1);
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    if (!gridRef.current) return;

    const calculateGridDimensions = () => {
      const rect = gridRef.current?.getBoundingClientRect();
      if (rect) {
        setRows(Math.floor(rect.height / (isMobile ? 35 : 75)));
        setColumns(Math.floor(rect.width / (isMobile ? 35 : 75)));
      }
    };

    calculateGridDimensions();

    window.addEventListener("resize", calculateGridDimensions);

    return () => {
      window.removeEventListener("resize", calculateGridDimensions);
    };
  }, [gridRef]);

  return (
    <div
      className="absolute inset-8 grid"
      style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
      ref={gridRef}
    >
      {Array.from({ length: rows * columns }).map((_, index) => (
        <div
          key={index}
          className="outline-1 outline-white"
          style={{
            gridRowStart: Math.floor(index / columns) + 1,
            gridColumnStart: (index % columns) + 1,
          }}
        />
      ))}
    </div>
  );
};

export default Grid;
