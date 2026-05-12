import React, { useState, useEffect } from 'react';
import { getNewPrograms, createCompliance } from '../compliance.api';

export default function ComplianceAndAuditDashboard() {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // New state for dropdown selection
  const [complianceResult, setComplianceResult] = useState('COMPLIANT');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await getNewPrograms();
      setPrograms(response.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching programs:", err);
      setError("Failed to load programs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleViewDetails = (program) => {
    setSelectedProgram(program);
    setComplianceResult('COMPLIANT'); // Reset dropdown when opening modal
  };

  const handleCloseModal = () => setSelectedProgram(null);

  const handleCreateCompliance = async () => {
    if (!selectedProgram) return;

    try {
      setIsSubmitting(true);
      const complianceData = {
        entityId: selectedProgram.programId,
        type: 'PROGRAM',
        result: complianceResult, // Uses the state from the dropdown
        notes: `Compliance audit (${complianceResult}) created for ${selectedProgram.name}`,
        date: new Date().toISOString().split('T')[0]
      };

      await createCompliance(complianceData);
      
      alert(`✅ Compliance (${complianceResult}) created for: ${selectedProgram.name}`);
      setSelectedProgram(null);
      fetchPrograms(); // Refresh list to remove the audited program
    } catch (err) {
      console.error("Error creating compliance:", err);
      alert("❌ Failed to create compliance.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container py-4">
      <h1 className="mb-5 text-center text-primary fw-bold">Compliance & Audit Dashboard</h1>

      <div className="row">
        {programs.length > 0 ? (
          programs.map(program => (
            <div key={program.programId} className="col-md-4 mb-4">
              <div className="card shadow-lg h-100 border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{program.name}</h5>
                  <p className="card-text text-muted text-truncate">{program.description}</p>
                  <span className={`badge ${program.status === 'PENDING' ? 'bg-warning text-dark' : 'bg-success'}`}>
                    {program.status}
                  </span>
                </div>
                <div className="card-footer bg-transparent border-0 text-center">
                  <button className="btn btn-outline-primary w-100" onClick={() => handleViewDetails(program)}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted">No new programs found for audit.</div>
        )}
      </div>

      {selectedProgram && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Audit: {selectedProgram.name}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p className="lead">{selectedProgram.description}</p>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <strong>Timeline:</strong> {selectedProgram.startDate} to {selectedProgram.endDate}
                  </div>
                  <div className="col-md-6">
                    <strong>Budget:</strong> ${selectedProgram.budget?.toLocaleString()}
                  </div>
                </div>

                <hr />
                
                {/* --- DROPDOWN SECTION --- */}
                <div className="bg-light p-3 rounded">
                  <label className="form-label fw-bold text-primary">Select Audit Result:</label>
                  <select 
                    className={`form-select fw-bold ${complianceResult === 'COMPLIANT' ? 'text-success' : 'text-danger'}`}
                    value={complianceResult}
                    onChange={(e) => setComplianceResult(e.target.value)}
                  >
                    <option value="COMPLIANT">✅ COMPLIANT</option>
                    <option value="NON-COMPLIANT">❌ NON-COMPLIANT</option>
                  </select>
                  <small className="text-muted mt-2 d-block">
                    This action will finalize the audit for this program.
                  </small>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  className="btn btn-success fw-bold px-4" 
                  onClick={handleCreateCompliance}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Submit Audit'}
                </button>
                <button className="btn btn-secondary" onClick={handleCloseModal} disabled={isSubmitting}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}