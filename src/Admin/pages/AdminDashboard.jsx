import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar"; 
import UsersTab from "./UsersTab";
import AuditLogsTab from "./AuditLogsTab";
import ReportsTab from "./ReportsTab";
import NotificationsTab from "./NotificationsTab";
import "./AdminDashboard.css"; 

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <div className="d-flex vh-100 w-100 overflow-hidden bg-light position-relative">
      
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Area */}
      <main className="flex-grow-1 p-4 p-md-4 overflow-auto bg-white position-relative" style={{ borderTopLeftRadius: '30px', boxShadow: '-10px 0 30px rgba(0,0,0,0.03)' }}>
        
        {/* ✅ IMPROVEMENT 1: Sticky Header with solid background so content slides underneath it */}
        <header className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom position-sticky top-0 bg-white" style={{ zIndex: 10, paddingTop: '0.5rem' }}>
          
          <div>
            <h2 className="fw-black text-dark mb-0 tracking-tight">
              {activeTab === "users" && "Users Management"}
              {activeTab === "auditLogs" && "System Audit Logs"}
              {activeTab === "reports" && "Reports Dashboard"}
              {activeTab === "notifications" && "Notification Center"}
            </h2>
            {/* ✅ IMPROVEMENT 1.5: Dynamic Subtitles for a premium feel */}
            <p className="text-muted small mb-0 mt-1 fw-medium">
              {activeTab === "users" && "Manage system access, roles, and user statuses."}
              {activeTab === "auditLogs" && "Monitor system activities and security events."}
              {activeTab === "reports" && "Generate and review analytical performance reports."}
              {activeTab === "notifications" && "Dispatch and track universal or targeted alerts."}
            </p>
          </div>
          
          <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
            <div className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill d-flex align-items-center gap-2 shadow-sm">
              <span className="bg-success rounded-circle animate-pulse" style={{ width: "8px", height: "8px" }}></span>
              System Live
            </div>

            <div className="dropdown">
              {/* ✅ IMPROVEMENT 2: Clean, modern white profile pill button */}
              <button 
                className="btn btn-white border shadow-sm dropdown-toggle rounded-pill px-4 fw-bold text-dark d-flex align-items-center gap-2 bg-white" 
                data-bs-toggle="dropdown"
              >
                <span className="fs-5 lh-1">👤</span> {localStorage.getItem("userName") || "System Admin"}
              </button>
              
              <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2 rounded-4 p-2">
                <li>
                  <button className="dropdown-item fw-bold text-secondary rounded-3 py-2" onClick={() => setShowProfile(true)}>
                    View Profile
                  </button>
                </li>
                <li><hr className="dropdown-divider my-1" /></li>
                <li>
                  <button className="dropdown-item fw-bold text-danger rounded-3 py-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>

        <div className="tab-content-wrapper mt-2">
          {activeTab === "users" && <UsersTab />}
          {activeTab === "auditLogs" && <AuditLogsTab />}
          {activeTab === "reports" && <ReportsTab />}
          {activeTab === "notifications" && <NotificationsTab />}
        </div>
      </main>

      {/* Admin Profile Modal */}
      {showProfile && (
        <>
          <div className="modal show d-block" tabIndex="-1" style={{ zIndex: 1060 }}>
            <div className="modal-dialog modal-dialog-centered modal-sm">
              {/* ✅ IMPROVEMENT 3: Added 'fade-in' class to the modal content */}
              <div className="modal-content rounded-4 border-0 shadow-lg text-center p-4 fade-in">
                <div className="mb-3">
                  <div className="rounded-circle bg-dark text-white d-inline-flex align-items-center justify-content-center mx-auto shadow-sm" style={{ width: '80px', height: '80px' }}>
                    <span className="fs-1">👤</span>
                  </div>
                </div>
                <h4 className="fw-bold mb-1 text-dark">{localStorage.getItem("userName") || "System Admin"}</h4>
                <p className="text-muted small mb-3">Administrator Account</p>
                <div className="d-flex justify-content-center gap-2 mb-4">
                  <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-bold">ROLE: ADMIN</span>
                  <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill fw-bold">ACTIVE</span>
                </div>
                <button className="btn btn-light fw-bold w-100 rounded-pill" onClick={() => setShowProfile(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" style={{ zIndex: 1055 }}></div>
        </>
      )}

    </div>
  );
};

export default AdminDashboard;