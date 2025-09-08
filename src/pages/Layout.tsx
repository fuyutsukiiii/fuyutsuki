import { Outlet } from "react-router-dom";
import { Menu } from "../components/organisms/Menu";
import CrossfadeWrapper from "../components/wrappers/CrossfadeWrapper";

interface Props {
  children?: React.ReactNode;
}

const Layout = ({children}: Props) => {
  return (
    <>
      <CrossfadeWrapper>
        <Outlet />
        {children}
      </CrossfadeWrapper>
      <Menu />
    </>
  );
};

export default Layout;
