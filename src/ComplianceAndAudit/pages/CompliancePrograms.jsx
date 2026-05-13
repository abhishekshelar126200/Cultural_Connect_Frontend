import React, { useState, useEffect } from 'react';
import { getAllCompliance } from '../compliance.api';

export default function CompliancePrograms() {
  const [complianceList, setComplianceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplianceData = async () => {
      try {
        setLoading(true);
        const response = await getAllCompliance();
        // Axios returns data in response.data
        setComplianceList(response.data || []);
      } catch (err) {
        console.error("Error fetching compliance history:", err);
        setError("Failed to load compliance records.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplianceData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">Compliance Audit History</h2>
        <span className="badge bg-secondary">{complianceList.length} Total Records</span>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle bg-white mb-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Entity ID</th>
              <th>Type</th>
              <th>Result</th>
              <th>Date</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {complianceList.length > 0 ? (
              complianceList.map((record) => (
                <tr key={record.complianceId}>
                  <td className="fw-bold">#{record.complianceId}</td>
                  <td>{record.entityId}</td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {record.type}
                    </span>
                  </td>
                  <td>
                    <span className={`fw-bold ${
                      record.result === 'COMPLIANT' || record.result === 'PASSED' 
                      ? 'text-success' 
                      : 'text-danger'
                    }`}>
                      {record.result}
                    </span>
                  </td>
                  <td className="text-muted">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td>
                    <small className="text-muted">
                      {record.notes || 'No additional notes'}
                    </small>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  No compliance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}