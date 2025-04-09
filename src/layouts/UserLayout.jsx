import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent"

const UserLayout = () => {
  return (
    <div>
      <NavbarComponent />
      <Outlet />
      <FooterComponent />
    </div>
  );
};

export default UserLayout;
