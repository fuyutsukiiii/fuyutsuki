import React from "react";

interface Props {
  className?: string;
  children?: React.ReactNode;
  expandPercent: number;
  maxHeight: number;
  style?: React.CSSProperties;
}

const TopDownExpand = ({
  className,
  children,
  expandPercent,
  maxHeight,
  style
}: Props) => {
  return (
    <div
      className={`${className} overflow-hidden`}
      style={{ maxHeight: maxHeight * (expandPercent / 100), ...style }}
    >
      <div className="flex">{children}</div>
    </div>
  );
};

export default TopDownExpand;
