import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
