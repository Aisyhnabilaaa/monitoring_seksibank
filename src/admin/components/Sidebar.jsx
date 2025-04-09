import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isMonitoringOpen, setMonitoringOpen] = useState(false);

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/admin">
              <i className="bi bi-house sidebar-icon"></i>
              <span className="sidebar-text">Home</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link className="sidebar-link" to="/admin/dashboard">
              <i className="bi bi-speedometer sidebar-icon"></i>
              <span className="sidebar-text">Dashboard</span>
            </Link>
          </li>

          {/* Monitoring dengan Submenu */}
          <li className="sidebar-item">
            <button
              className="sidebar-link dropdown-btn"
              onClick={() => setMonitoringOpen(!isMonitoringOpen)}
            >
              <i className="bi bi-table sidebar-icon"></i>
              <span className="sidebar-text">Monitoring</span>
              <i className={`bi bi-chevron-${isMonitoringOpen ? "up" : "down"} ms-auto`}></i>
            </button>

            {/* Submenu untuk Monitoring */}
            {isMonitoringOpen && (
              <div className="submenu-cotainer">
                <ul className="sidebar-submenu">
                  <li>
                    <Link to="/admin/monitoring/a" className="sidebar-submenu-link">
                      Monitoring A
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/monitoring/b" className="sidebar-submenu-link">
                      Monitoring B
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/monitoring/c" className="sidebar-submenu-link">
                      Monitoring C
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/monitoring/d" className="sidebar-submenu-link">
                      Monitoring D
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/monitoring/e" className="sidebar-submenu-link">
                      Monitoring E
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/monitoring/f" className="sidebar-submenu-link">
                      Monitoring F
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/monitoring/g" className="sidebar-submenu-link">
                      Monitoring G
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/monitoring/h" className="sidebar-submenu-link">
                      Monitoring H
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/monitoring/i" className="sidebar-submenu-link">
                      Monitoring I
                    </Link>
                  </li>

                </ul>
              </div>
            )}
          </li>

          <li className="sidebar-item">
            <Link className="sidebar-link" to="/admin/favorites">
              <i className="bi bi-heart sidebar-icon"></i>
              <span className="sidebar-text">Favorites</span>
            </Link>
          </li>
        </ul>

        {/* Footer */}
        <div className="sidebar-footer">
          <hr className="text-secondary" />
          <div className="sidebar-user">
            <i className="bi bi-person fs-5"></i>
            <span>Dirimu</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
