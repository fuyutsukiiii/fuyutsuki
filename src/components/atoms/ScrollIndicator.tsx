import Lottie from "lottie-react";
import animationData from "../../assets/scroll-indicator-animation.json";

const ScrollIndicator = () => {
  return <Lottie animationData={animationData} loop autoplay />;
};

export default ScrollIndicator;
