import React, { useState, useEffect } from "react";
import * as adminService from "../adminService";

const AuditLogsTab = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await adminService.getAllAuditLogs();
      if (Array.isArray(res.data)) setAuditLogs(res.data);
    } catch (error) {
      console.error("Failed to fetch logs", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <section className="d-flex flex-column gap-3 fade-in">
      {auditLogs.map((log, i) => (
        <div className="card border border-light shadow-sm bg-white rounded-4" key={i}>
          <div className="card-body py-3 px-4 d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-bold mb-1 text-dark">{log.action}</h6>
              <small className="text-muted">Resource: {log.resource}</small>
            </div>
            <span className="badge bg-light text-secondary border">
              {new Date(log.timestamp).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
      {auditLogs.length === 0 && <p className="text-muted text-center mt-4">No audit logs available.</p>}
    </section>
  );
};

export default AuditLogsTab;