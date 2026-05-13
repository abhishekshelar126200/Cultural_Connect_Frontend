import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import UsersTab from "./UsersTab";
import AuditLogsTab from "./AuditLogsTab";
import ReportsTab from "./ReportsTab";
import "./AdminDashboard.css"; // Keep your existing hover effects here

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("reports"); 

  return (
    <div className="d-flex vh-100 overflow-hidden bg-light position-relative">
      
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow-1 p-4 p-md-3 overflow-auto bg-white" style={{ borderTopLeftRadius: '30px', boxShadow: '-10px 0 30px rgba(0,0,0,0.03)' }}>
        
        {/* Universal Header */}
        <header className="d-flex justify-content-between align-items-center mb-5 pb-2 border-bottom">
          <h2 className="fw-black text-dark mb-0 tracking-tight">
            {activeTab === "users" && "Users Management"}
            {activeTab === "auditLogs" && "System Audit Logs"}
            {activeTab === "reports" && "Reports Dashboard"}
          </h2>
          <div className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill d-flex align-items-center gap-2 shadow-sm">
            <span className="bg-success rounded-circle animate-pulse" style={{ width: "8px", height: "8px" }}></span>
            System Live
          </div>
        </header>

        {/* Dynamic Tab Content */}
        <div className="tab-content-wrapper">
          {activeTab === "users" && <UsersTab />}
          {activeTab === "auditLogs" && <AuditLogsTab />}
          {activeTab === "reports" && <ReportsTab />}
        </div>
        
      </main>
    </div>
  );
};

export default AdminDashboard;