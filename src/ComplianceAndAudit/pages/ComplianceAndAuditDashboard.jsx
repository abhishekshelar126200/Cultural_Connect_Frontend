import React, { useState, useEffect, useCallback } from 'react';
import { 
  getNewPrograms, 
  createCompliance, 
  getAllCompliance, 
  deleteCompliance, 
  updateCompliance 
} from '../compliance.api';

export default function ComplianceAndAuditDashboard() {
  const [programs, setPrograms] = useState([]);
  const [complianceRecords, setComplianceRecords] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form State
  const [complianceResult, setComplianceResult] = useState('COMPLIANT');
  const [complianceNotes, setComplianceNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('new'); 
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRecordId, setCurrentRecordId] = useState(null);

  // Wrapped in useCallback to prevent unnecessary re-renders
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [progRes, compRes] = await Promise.all([
        getNewPrograms(),
        getAllCompliance()
      ]);
      setPrograms(progRes.data || []);
      setComplianceRecords(compRes.data || []);
    } catch (err) {
      setError("Failed to sync with server. Please check connection.");
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Modal Handlers
  const openCreateModal = (program) => {
    setIsEditMode(false);
    setSelectedProgram(program);
    setComplianceResult('COMPLIANT');
    setComplianceNotes('');
  };

  const openEditModal = (record) => {
    setIsEditMode(true);
    setCurrentRecordId(record.complianceId);
    setComplianceNotes(record.notes || '');
    setComplianceResult(record.result);
    // Setting selectedProgram so the modal UI has context
    setSelectedProgram({ 
        programId: record.entityId, 
        name: record.entityName || `Record #${record.complianceId}` 
    });
  };

  const closeModal = () => {
    setSelectedProgram(null);
    setIsEditMode(false);
    setCurrentRecordId(null);
    setComplianceNotes('');
  };

  // API Actions
  const handleSubmit = async () => {
    // Validation
    if (complianceResult === 'NON-COMPLIANT' && !complianceNotes.trim()) {
      alert("❌ Reason is required for Non-Compliance.");
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        entityId: selectedProgram.programId,
        type: 'PROGRAM',
        result: complianceResult,
        notes: complianceNotes,
        date: new Date().toISOString().split('T')[0]
      };

      if (isEditMode) {
        await updateCompliance(currentRecordId, payload);
      } else {
        await createCompliance(payload);
      }

      alert(isEditMode ? "✅ Record updated!" : "✅ Report submitted!");
      closeModal();
      fetchData(); // Refresh lists
    } catch (err) {
      alert("❌ Operation failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently delete this record?")) {
      try {
        await deleteCompliance(id);
        setComplianceRecords(prev => prev.filter(r => r.complianceId !== id));
      } catch (err) {
        alert("❌ Delete failed.");
      }
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
      <div className="spinner-grow text-primary" role="status"></div>
    </div>
  );

  return (
    <div className="container py-4">
      {error && <div className="alert alert-danger">{error}</div>}
      
      <header className="mb-4 text-center">
        <h1 className="display-5 fw-bold text-primary">Compliance & Audit Control</h1>
        <p className="text-muted">Review internal programs and manage audit history</p>
      </header>

      {/* Tabs */}
      <ul className="nav nav-pills mb-4 justify-content-center">
        <li className="nav-item">
          <button 
            className={`nav-link px-4 ${activeTab === 'new' ? 'active' : ''}`} 
            onClick={() => setActiveTab('new')}
          >
            New Pending ({programs.length})
          </button>
        </li>
        <li className="nav-item ms-2">
          <button 
            className={`nav-link px-4 ${activeTab === 'history' ? 'active' : ''}`} 
            onClick={() => setActiveTab('history')}
          >
            Audit History ({complianceRecords.length})
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="card shadow-sm border-0 p-4">
        {activeTab === 'new' ? (
          <div className="row">
            {programs.length > 0 ? programs.map(p => (
              <div key={p.programId} className="col-md-4 mb-3">
                <div className="card h-100 border-start border-primary border-4 shadow-sm">
                  <div className="card-body">
                    <h6 className="fw-bold">{p.name}</h6>
                    <small className="text-muted d-block mb-3">ID: #{p.programId}</small>
                    <button className="btn btn-sm btn-primary w-100" onClick={() => openCreateModal(p)}>
                      Start Audit
                    </button>
                  </div>
                </div>
              </div>
            )) : <div className="text-center py-4">No new programs pending.</div>}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th>Entity</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Remarks</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {complianceRecords.length > 0 ? complianceRecords.map(r => (
                  <tr key={r.complianceId}>
                    <td>
                        <strong>#{r.entityId}</strong> 
                        <span className="badge bg-secondary ms-2">{r.type}</span>
                    </td>
                    <td>
                      <span className={`badge ${r.result === 'COMPLIANT' ? 'bg-success' : 'bg-danger'}`}>
                        {r.result}
                      </span>
                    </td>
                    <td>{r.date}</td>
<td style={{ maxWidth: '200px' }}>
  <div className="text-truncate" title={r.notes}>
    {r.notes}
  </div>
</td>                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-warning me-2" onClick={() => openEditModal(r)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(r.complianceId)}>Delete</button>
                    </td>
                  </tr>
                )) : <tr><td colSpan="5" className="text-center">No history found.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Shared Modal */}
      {selectedProgram && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0">
                <div className={`modal-header ${isEditMode ? 'bg-warning text-dark' : 'bg-primary text-white'}`}>
                  <h5 className="modal-title">{isEditMode ? 'Edit Audit Record' : 'Submit New Audit'}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="text-muted small d-block">Target Entity</label>
                    <span className="fw-bold">{selectedProgram.name}</span>
                  </div>
                  
                  <label className="form-label fw-bold">Compliance Status</label>
                  <select 
                    className="form-select mb-3" 
                    value={complianceResult} 
                    onChange={(e) => setComplianceResult(e.target.value)}
                  >
                    <option value="COMPLIANT">✅ COMPLIANT</option>
                    <option value="NON-COMPLIANT">❌ NON-COMPLIANT</option>
                  </select>

                  <label className="form-label fw-bold">Officer Remarks</label>
                  <textarea 
                    className="form-control" 
                    rows="4" 
                    value={complianceNotes}
                    placeholder="Describe findings..."
                    onChange={(e) => setComplianceNotes(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-light" onClick={closeModal}>Cancel</button>
                  <button 
                     className={`btn ${complianceResult === 'COMPLIANT' ? 'btn-success' : 'btn-danger'}`} 
                     onClick={handleSubmit}
                     disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : (isEditMode ? 'Update Record' : 'Submit to Auditor')}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Backdrop for accessibility */}
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}