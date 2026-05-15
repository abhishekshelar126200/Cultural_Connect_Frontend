import React from "react";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <div className="bg-dark text-white p-4 d-flex flex-column vh-100 shadow-lg" style={{ width: "260px", flexShrink: 0, zIndex: 10 }}>
      
      {/* ✅ FIXED: Logo Area (Now acts as a safe 'Home' button for Admin) */}
      <div 
        className="mb-5 user-select-none" 
        style={{ cursor: "pointer", transition: "0.2s" }} 
        onClick={() => setActiveTab("users")}
        title="Go to Dashboard Home"
      >
        <h4 className="fw-bold mb-0 text-success tracking-tight">CultureConnect</h4>
        <small className="text-secondary fw-bold" style={{ letterSpacing: "2px", fontSize: "0.70rem" }}>
          ADMIN PORTAL
        </small>
      </div>

      {/* Navigation */}
      <ul className="nav nav-pills flex-column gap-2 mb-auto">
        <li className="nav-item">
          <button
            className={`nav-link w-100 text-start fw-bold ${activeTab === "users" ? "active bg-primary text-white shadow" : "text-light opacity-75 hover-opacity-100"}`}
            onClick={() => setActiveTab("users")}
          >
            <span className="me-3 fs-5">👥</span> Users
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link w-100 text-start fw-bold ${activeTab === "auditLogs" ? "active bg-primary text-white shadow" : "text-light opacity-75"}`}
            onClick={() => setActiveTab("auditLogs")}
          >
            <span className="me-3 fs-5">📜</span> Audit Logs
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link w-100 text-start fw-bold ${activeTab === "reports" ? "active bg-primary text-white shadow" : "text-light opacity-75"}`}
            onClick={() => setActiveTab("reports")}
          >
            <span className="me-3 fs-5">📊</span> Reports
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link w-100 text-start fw-bold ${activeTab === "notifications" ? "active bg-primary text-white shadow" : "text-light opacity-75"}`}
            onClick={() => setActiveTab("notifications")}
          >
            <span className="me-3 fs-5">🔔</span> Notifications
          </button>
        </li>
      </ul>

      {/* Footer / Logout */}
      <div className="mt-auto pt-3 border-top border-secondary">
        <button 
          className="btn btn-outline-danger border-0 text-start w-100 fw-bold d-flex align-items-center gap-2 p-2" 
          onClick={handleLogout}
        >
          <span className="fs-5">⏻</span> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;