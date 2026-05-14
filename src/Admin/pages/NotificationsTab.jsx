import React, { useState, useEffect } from "react";
import * as adminService from "../adminService";

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form & UI States
  const [sendMode, setSendMode] = useState("TARGETED"); 
  const [isSending, setIsSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: "", type: "" });

  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    category: "GENERAL",
    message: ""
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await adminService.getAllNotifications();
      let fetchedNotes = res.data?.data || [];
      
      // ✅ FIX: Sort by ID descending so the NEWEST notifications are always at the TOP!
      fetchedNotes.sort((a, b) => b.notificationId - a.notificationId);
      
      setNotifications(fetchedNotes);
    } catch (error) {
      console.error("Error fetching notifications", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDispatch = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMsg({ text: "", type: "" });

    try {
      // ✅ FIX: Clean the payload to ensure Spring Boot doesn't crash on empty strings
      const payload = {
        email: formData.email,
        category: formData.category,
        message: formData.message,
        userId: formData.userId ? Number(formData.userId) : 0, 
        entityId: 0
      };

      if (sendMode === "TARGETED") {
        await adminService.sendTargetedNotification(payload);
      } else {
        await adminService.sendUniversalNotification(payload);
      }
      
      setStatusMsg({ text: "Notification Dispatched Successfully!", type: "success" });
      
      // ✅ FIX: Await the fetch so the UI updates immediately with the new data
      await fetchNotifications(); 
      
      setFormData({ userId: "", email: "", category: "GENERAL", message: "" }); 
    } catch (error) {
      console.error(error);
      setStatusMsg({ text: "Failed to send notification. Check ID/Email.", type: "danger" });
    } finally {
      setIsSending(false);
      setTimeout(() => setStatusMsg({ text: "", type: "" }), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this notification record?")) return;
    try {
      await adminService.deleteNotification(id);
      setNotifications(notifications.filter(n => n.notificationId !== id));
    } catch (error) {
      alert("Failed to delete notification.");
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <section className="fade-in w-100 row g-4">
      
      {/* LEFT COLUMN: SEND NOTIFICATION */}
      <div className="col-12 col-lg-5">
        <div className="card border-0 shadow-sm rounded-4 bg-light overflow-hidden">
          
          <div className="card-header bg-white border-bottom-0 pt-4 pb-0 px-4">
            <h5 className="fw-bold mb-3">📧 Dispatch Center</h5>
            <ul className="nav nav-pills nav-fill bg-light p-1 rounded-pill border">
              <li className="nav-item">
                <button 
                  className={`nav-link rounded-pill fw-bold ${sendMode === 'TARGETED' ? 'active shadow-sm' : 'text-secondary'}`}
                  onClick={() => setSendMode('TARGETED')}
                >
                  Targeted (User ID)
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link rounded-pill fw-bold ${sendMode === 'UNIVERSAL' ? 'active shadow-sm' : 'text-secondary'}`}
                  onClick={() => setSendMode('UNIVERSAL')}
                >
                  Universal (Email)
                </button>
              </li>
            </ul>
          </div>

          <div className="card-body p-4 mt-2">
            {statusMsg.text && (
              <div className={`alert alert-${statusMsg.type} py-2 small fw-bold text-center`}>
                {statusMsg.text}
              </div>
            )}

            <form onSubmit={handleDispatch}>
              
              {sendMode === "TARGETED" ? (
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">Target User ID</label>
                  <input 
                    type="number" 
                    className="form-control border-0 shadow-sm" 
                    placeholder="e.g. 1042"
                    required 
                    value={formData.userId} 
                    onChange={(e) => setFormData({...formData, userId: e.target.value})} 
                  />
                </div>
              ) : (
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">Target Email Address</label>
                  <input 
                    type="email" 
                    className="form-control border-0 shadow-sm" 
                    placeholder="user@example.com"
                    required 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Notification Category</label>
                <select 
                  className="form-select border-0 shadow-sm" 
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="GENERAL">GENERAL</option>
                  <option value="PROGRAM">PROGRAM</option>
                  <option value="GRANT">GRANT</option>
                  <option value="COMPLIANCE">COMPLIANCE</option>
                  <option value="PROJECT">PROJECT</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-muted">Custom Message</label>
                <textarea 
                  className="form-control border-0 shadow-sm" 
                  rows="4" 
                  placeholder={sendMode === "TARGETED" ? "Type to override the default template..." : "Type your message here..."}
                  required={sendMode === "UNIVERSAL"} 
                  value={formData.message} 
                  onChange={(e) => setFormData({...formData, message: e.target.value})} 
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-bold shadow-sm rounded-pill" disabled={isSending}>
                {isSending ? "Dispatching..." : "Dispatch Notification"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: NOTIFICATION LOGS */}
      <div className="col-12 col-lg-7">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0 text-dark">System Notification Logs</h5>
          <button className="btn btn-sm btn-outline-secondary fw-bold rounded-pill px-3 shadow-sm bg-white" onClick={fetchNotifications}>
            ↻ Refresh
          </button>
        </div>

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-light p-2">
          <div className="list-group list-group-flush rounded-4 overflow-hidden" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {notifications.map((note) => (
              <div key={note.notificationId} className="list-group-item p-4 bg-white border-bottom mb-2 rounded-4 shadow-sm mx-1">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <span className="badge bg-dark text-white rounded-pill px-3 py-1 me-2 shadow-sm">
                      {note.category}
                    </span>
                    <small className="text-muted fw-bold">
                      {new Date(note.createdDate).toLocaleString()}
                    </small>
                  </div>
                  <button 
                    className="btn btn-sm text-danger border-0 bg-danger bg-opacity-10 rounded-circle" 
                    style={{ width: '30px', height: '30px', padding: '0', lineHeight: '1' }}
                    onClick={() => handleDelete(note.notificationId)}
                    title="Delete Log"
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-3">
                  <small className="fw-bold text-primary mb-1 d-block">Target ID: {note.userId || "Universal"}</small>
                  <p className="mb-2 text-dark fw-medium">{note.message}</p>
                </div>
                <span className={`badge ${note.status === 'READ' ? 'bg-success' : 'bg-warning text-dark'} bg-opacity-10 border-0`}>
                  {note.status}
                </span>
              </div>
            ))}
            {notifications.length === 0 && (
              <div className="text-center p-5 text-muted fw-bold bg-white rounded-4">No notifications found.</div>
            )}
          </div>
        </div>
      </div>

    </section>
  );
};

export default NotificationsTab;