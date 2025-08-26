import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export const DeviceContext = createContext<"desktop" | "mobile">("desktop");

const GlobalWrapper = () => {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDevice("mobile");
      } else {
        setDevice("desktop");
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <DeviceContext value={device}>
        <Outlet />
      </DeviceContext>
    </>
  );
};

export default GlobalWrapper;
