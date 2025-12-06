const GalleryScrollBar = () => {
  return (
    <div className="relative h-full w-full flex flex-col justify-center items-center overflow-hidden">
      <div className="flex-1 w-[1px] bg-primary-blue" />
      <svg
        className="block"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="40"
        viewBox="0 0 30 40"
        aria-hidden="true"
      >
        <polyline
          points="15 0 30 20 15 40"
          className="stroke-primary-blue"
          fill="none"
        />
      </svg>
      <div className="flex-1 w-[1px] bg-primary-blue" />
    </div>
  );
};

export default GalleryScrollBar;
