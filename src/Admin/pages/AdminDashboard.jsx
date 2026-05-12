import React, { useState, useEffect } from "react";
import * as adminService from "../adminService"; // Corrected path
import "./AdminDashboard.css";                  // Same folder, so use ./


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [searchUserId, setSearchUserId] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    loadInitialData();
  }, []);

 const loadInitialData = async () => {
  try {
    // Axios returns an object where the backend JSON is inside the 'data' property
    const userResponse = await adminService.getAllUsers();
    const logResponse = await adminService.getAllAuditLogs();

    // ✅ Access .data explicitly
    const userData = userResponse.data; 
    const logData = logResponse.data;

    // Ensure userData is actually an array before setting state
    if (Array.isArray(userData)) {
      setUsers(userData);
      setFilteredUsers(userData);
    } else {
      console.error("User data is not an array:", userData);
      setFilteredUsers([]); // Fallback to empty array
    }

    if (Array.isArray(logData)) {
      setAuditLogs(logData);
    } else {
      setAuditLogs([]);
    }

  } catch (error) {
    console.error("Dashboard error:", error);
    setFilteredUsers([]); // Prevent .map() crash on error
    setAuditLogs([]);
  }
};

  const handleSearch = () => {
    if (!searchUserId.trim()) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((u) => 
        u.userId?.toString() === searchUserId.trim()
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <div className="admin-wrapper">
      <aside className="cc-sidebar">
        <div className="cc-logo-area">
          <h1 className="cc-title">CultureConnect</h1>
          <span className="cc-subtitle">ADMIN PORTAL</span>
        </div>

        <nav className="cc-nav">
          <button 
            className={`cc-nav-item ${activeTab === "users" ? "active" : ""}`} 
            onClick={() => setActiveTab("users")}
          >
            <span className="cc-icon">👥</span> Users
          </button>
          <button 
            className={`cc-nav-item ${activeTab === "auditLogs" ? "active" : ""}`} 
            onClick={() => setActiveTab("auditLogs")}
          >
            <span className="cc-icon">📜</span> Audit Logs
          </button>
        </nav>

        <div className="cc-footer">
          <button className="cc-signout">Sign Out</button>
        </div>
      </aside>

      <main className="cc-main">
        <header className="cc-header">
          <h2>{activeTab === "users" ? "Users Management" : "System Audit Logs"}</h2>
          <div className="cc-system-status">
            <span className="status-dot"></span> System Live
          </div>
        </header>

        <div className="cc-card">
          {activeTab === "users" ? (
            <section>
              <div className="cc-search-box">
                <input 
                  type="text" 
                  placeholder="Search by User ID..." 
                  value={searchUserId}
                  onChange={(e) => setSearchUserId(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
              </div>

              <table className="cc-table">
                <thead>
                  <tr>
                    <th>USER DETAILS</th>
                    <th>ROLE</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.userId}>
                      <td>
                        <div className="cc-user-cell">
                          <span className="cc-user-name">{user.name}</span>
                          <span className="cc-user-sub">ID: {user.userId} | {user.email}</span>
                        </div>
                      </td>
                      <td>{user.role}</td>
                      <td>
                        <select className="cc-status-dropdown">
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="INACTIVE">INACTIVE</option>
                        </select>
                      </td>
                      <td>—</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ) : (
            <section>
              {auditLogs.map((log, i) => (
                <div className="cc-log-card" key={i}>
                  <div className="cc-log-info">
                    <p className="cc-log-action">{log.action}</p>
                    <p className="cc-log-meta">Resource: {log.resource} | Timestamp: {new Date(log.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;