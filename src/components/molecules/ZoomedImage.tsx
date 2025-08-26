interface Props {
  src: string;
  unzoomHandler: () => void;
}

const ZoomedImage = ({ src, unzoomHandler }: Props) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 overflow-auto"
      style={{ cursor: "zoom-out" }}
      onClick={unzoomHandler}
    >
      <img
        className="m-0 block object-contain"
        style={{ width: "200vw", height: "200vh" }}
        src={src}
        alt=""
        draggable={false}
      />
    </div>
  );
};

export default ZoomedImage;
