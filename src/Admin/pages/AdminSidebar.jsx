import React from "react";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-dark text-white p-4 d-flex flex-column vh-100 shadow" style={{ width: "260px", flexShrink: 0 }}>
      {/* Logo Area */}
      <div className="mb-5">
        <h4 className="fw-bold mb-0 text-success">CultureConnect</h4>
        <small className="text-secondary fw-bold" style={{ letterSpacing: "1px", fontSize: "0.75rem" }}>
          ADMIN PORTAL
        </small>
      </div>

      {/* Navigation */}
      <ul className="nav nav-pills flex-column gap-2 mb-auto">
        <li className="nav-item">
          <button
            className={`nav-link w-100 text-start text-white ${activeTab === "users" ? "active shadow-sm" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <span className="me-2">👥</span> Users
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link w-100 text-start text-white ${activeTab === "auditLogs" ? "active shadow-sm" : ""}`}
            onClick={() => setActiveTab("auditLogs")}
          >
            <span className="me-2">📜</span> Audit Logs
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link w-100 text-start text-white ${activeTab === "reports" ? "active shadow-sm" : ""}`}
            onClick={() => setActiveTab("reports")}
          >
            <span className="me-2">📊</span> Reports
          </button>
        </li>
      </ul>

      {/* Footer / Logout */}
      <div className="mt-auto pt-3 border-top border-secondary">
        <button className="btn btn-outline-light btn-sm w-100 fw-bold">Sign Out</button>
      </div>
    </div>
  );
};

export default AdminSidebar;