import { useEffect, useRef, useState } from "react";
import TopDownExpand from "../atoms/TopDownExpand";

interface Props {
  progress: number;
  height?: number;
}

const NextImagePreview = ({ progress }: Props) => {
  // Translating progress: [0, 20, 100] to [0, 0, 100]
  let translatedProgress;
  if (progress <= 20) {
    translatedProgress = 0;
  } else {
    translatedProgress = ((progress - 20) / 80) * 100;
  }

  const divRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setHeight(rect.height);
  }, [divRef]);

  return (
    <div className="relative h-[30vmin] w-screen grid grid-rows-1 grid-cols-1 place-items-center">
      <div className="absolute top-[50%] bottom-0 w-full" />
      <div
        className="relative flex flex-col items-center justify-center text-white/60 font-optima select-none z-1"
        ref={divRef}
      >
        <span className="text-md text-primary-blue ">
          Scroll for next piece
        </span>
        <span className="text-2xl text-primary-blue ">↓</span>
      </div>
      <TopDownExpand
        className="absolute top-0 left-1/2 z-2 text-white"
        style={{ transform: `translate(-50%, calc(15vmin - ${height / 2}px))` }}
        maxHeight={height}
        expandPercent={translatedProgress}
      >
        <div
          className="relative flex flex-col items-center justify-center font-optima select-none z-1"
          style={{ WebkitTextStroke: "1px #fff" }}
        >
          <span className="text-md ">Scroll for next piece</span>
          <span className="text-2xl">↓</span>
        </div>
      </TopDownExpand>
    </div>
  );
};

export default NextImagePreview;
