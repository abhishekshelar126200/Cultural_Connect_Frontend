import React, { useState, useEffect } from "react";
import * as adminService from "../adminService";

const ReportsTab = () => {
  const [reports, setReports] = useState([]);
  const [dashboardSummary, setDashboardSummary] = useState(null);
  
  const [reportScope, setReportScope] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  
  // Search & Filter States
  const [searchReportId, setSearchReportId] = useState("");
  const [filterScope, setFilterScope] = useState("ALL"); // ✅ NEW: State for filtering
  
  const [loading, setLoading] = useState(true);

  const [alertPopup, setAlertPopup] = useState({ show: false, message: "", type: "success" });
  const [confirmPopup, setConfirmPopup] = useState({ show: false, reportId: null });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const summaryRes = await adminService.getDashboardSummary();
      setDashboardSummary(summaryRes.data?.data || { totalPrograms: 0, totalGrants: 0, totalEvents: 0, complianceRate: 0 });
    } catch (err) {
      setDashboardSummary({ totalPrograms: "Err", totalGrants: "Err", totalEvents: "Err", complianceRate: 0 });
    }

    try {
      const reportRes = await adminService.getAllReports();
      setReports(reportRes.data?.data || []);
    } catch (err) {
      setReports([]);
    }
    setLoading(false);
  };

  const handleSearchById = async () => {
    if (!searchReportId.trim()) {
      fetchData(); 
      return;
    }
    try {
      const res = await adminService.getReportById(searchReportId);
      if (res.data?.data) {
        setReports([res.data.data]); 
        setFilterScope("ALL"); // Reset filter if searching by exact ID
      } else {
        setReports([]); 
      }
    } catch (error) {
      console.error("Report not found", error);
      setReports([]);
    }
  };

  const handleGenerateReport = async () => {
    try {
      setIsGenerating(true);
      
      // ✅ Capture the response to get the newly generated ID
      const res = await adminService.generateReport(reportScope);
      const newReportId = res.data?.data?.id || res.data?.data?.reportId || ""; 
      
      await fetchData(); 
      
      // ✅ Show the exact ID in the popup
      setAlertPopup({ 
        show: true, 
        message: `${reportScope} Report Generated Successfully! ${newReportId ? `(ID #${newReportId})` : ""}`, 
        type: "success" 
      });
    } catch (error) {
      console.error("Failed to generate report", error);
      setAlertPopup({ show: true, message: "Error generating report. Please try again.", type: "error" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteClick = (id) => {
    setConfirmPopup({ show: true, reportId: id });
  };

  const executeDelete = async () => {
    const id = confirmPopup.reportId;
    setConfirmPopup({ show: false, reportId: null });

    try {
      await adminService.deleteReport(id);
      setReports(reports.filter(r => (r.reportId || r.id) !== id)); 
      setAlertPopup({ show: true, message: `Report ID #${id} deleted successfully!`, type: "success" });
    } catch (error) {
      console.error("Error deleting report", error);
      setAlertPopup({ show: true, message: "Failed to delete report.", type: "error" });
    }
  };

  const handleDownloadCSV = (report) => {
    try {
      const metricsObj = JSON.parse(report.metrics);
      const items = metricsObj.items || [];

      if (items.length === 0) {
        setAlertPopup({ show: true, message: "No tabular data found to download.", type: "error" });
        return;
      }

      const headers = Object.keys(items[0]);
      const csvRows = [headers.join(",")]; 

      items.forEach(item => {
        const row = headers.map(header => {
          let val = item[header] !== null ? String(item[header]) : "";
          return val.includes(",") ? `"${val}"` : val;
        });
        csvRows.push(row.join(","));
      });

      const csvString = csvRows.join("\n");
      const blob = new Blob([csvString], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      
      const reportId = report.reportId || report.id;
      link.href = url;
      link.download = `CultureConnect_Report_${reportId}_${report.scope}.csv`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error formatting data for download", error);
      setAlertPopup({ show: true, message: "Failed to download data. Invalid format.", type: "error" });
    }
  };

  // ✅ NEW: Compute which reports to display based on the active filter
  const displayedReports = reports.filter(r => filterScope === "ALL" ? true : r.scope === filterScope);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <section className="fade-in w-100">
      
      {/* Top Generator Controls */}
      <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 pb-3 border-bottom">
        <div className="mb-3 mb-md-0">
          <h3 className="fw-bold mb-1 text-dark">Analytical Reports</h3>
          <p className="text-muted small mb-0">Performance summaries and metric disbursements.</p>
        </div>
       <div className="d-flex gap-2">
          <select 
            className={`form-select border-0 shadow-sm fw-bold rounded-3 ${!reportScope ? 'text-muted bg-white border' : 'bg-light text-dark'}`} 
            value={reportScope} 
            onChange={(e) => setReportScope(e.target.value)}
            disabled={isGenerating}
          >
            <option value="">Select a Scope.</option> 
            <option value="PROGRAM">Program </option>
            <option value="GRANT">Grant </option>
            <option value="EVENT">Event </option>
          </select>
          
          <button 
            className="btn btn-primary fw-bold shadow-sm d-flex align-items-center gap-2 rounded-3 px-4" 
            onClick={handleGenerateReport}
            disabled={isGenerating || !reportScope} 
          >
            {isGenerating ? <><span className="spinner-border spinner-border-sm"></span> Generating...</> : "Generate"}
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      {dashboardSummary && (
        <div className="row g-3 mb-5">
          {[
            { label: "Programs", value: dashboardSummary.totalPrograms, color: "primary" },
            { label: "Grants", value: dashboardSummary.totalGrants, color: "success" },
            { label: "Events", value: dashboardSummary.totalEvents, color: "warning" },
            { label: "Compliance Rate", value: `${dashboardSummary.complianceRate?.toFixed(1) || 0}%`, color: "info" },
          ].map((stat, i) => (
            <div className="col-6 col-md-3" key={i}>
              <div className={`card border-0 shadow-sm bg-${stat.color} bg-opacity-10 text-center p-4 h-100 rounded-4`}>
                <small className={`text-${stat.color} text-uppercase fw-bolder tracking-wide`}>{stat.label}</small>
                <h2 className={`text-${stat.color} fw-black mb-0 mt-2 display-6`}>{stat.value || 0}</h2>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ UPDATED: Filter & Search Controls */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <h5 className="fw-bold text-dark mb-0">Generated Reports</h5>
        
        <div className="d-flex flex-wrap gap-2">
          
          {/* Scope Filter Dropdown */}
          <select 
            className="form-select border shadow-sm fw-bold text-secondary rounded-3 bg-white" 
            style={{ width: '150px' }}
            value={filterScope} 
            onChange={(e) => setFilterScope(e.target.value)}
          >
            <option value="ALL">All Scopes</option>
            <option value="PROGRAM">Program</option>
            <option value="GRANT">Grant</option>
            <option value="EVENT">Event</option>
          </select>

          {/* View All / Reset Button */}
          <button 
            className="btn btn-outline-secondary fw-bold px-3 shadow-sm bg-white" 
            onClick={async () => {
              setSearchReportId("");
              setFilterScope("ALL");
              fetchData();
            }}
            title="Reset Filters and View All"
          >
            ↻ View All
          </button>
          
          {/* Search Bar */}
          <div className="input-group shadow-sm rounded-3 overflow-hidden" style={{ width: '250px' }}>
            <input 
              type="number" 
              className="form-control border-0 bg-light px-3" 
              placeholder="Search ID..." 
              value={searchReportId}
              onChange={(e) => setSearchReportId(e.target.value)}
            />
            <button className="btn btn-dark fw-bold px-3" onClick={handleSearchById}>Search</button>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="row g-4">
        {displayedReports.map((report, index) => {
          const reportId = report.reportId || report.id; 
          const reportDate = report.generatedDate || report.createdAt ? new Date(report.generatedDate || report.createdAt).toISOString().split('T')[0] : "Just Now";
          
          return (
            <div className="col-12 col-md-6 col-lg-4" key={reportId || `report-${index}`}>
              <div className="card border p-4 h-100 shadow-sm report-card rounded-4 bg-white position-relative overflow-hidden d-flex flex-column">
                
                <button 
                  className="btn btn-sm btn-light text-danger position-absolute top-0 end-0 m-3 shadow-sm rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '32px', height: '32px', transition: 'all 0.2s' }}
                  onClick={() => handleDeleteClick(reportId)}
                  title="Delete Report"
                >
                  <span className="fw-bold">✕</span> 
                </button>

                <div className="mb-3 mt-1">
                  <span className="badge bg-dark text-white px-3 py-2 rounded-pill fw-bold shadow-sm">ID #{reportId}</span>
                </div>
                <h4 className="fw-black text-dark tracking-tight"> {report.scope}</h4>
                <div className="d-flex align-items-center gap-2 mb-4 mt-2">
                  <span className="badge bg-light text-secondary border">Generated: {reportDate}</span>
                </div>
                
                <div className="d-flex gap-2 mt-auto">
                  <button 
                    className="btn btn-outline-primary flex-grow-1 rounded-pill fw-bold border-2"
                    onClick={() => setSelectedReport(report)}
                  >
                    View Metrics
                  </button>
                  <button 
                    className="btn btn-primary rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                    style={{ width: '40px', height: '40px' }}
                    onClick={() => handleDownloadCSV(report)}
                    title="Download CSV"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                    </svg>
                  </button>
                </div>

              </div>
            </div>
          );
        })}
        {displayedReports.length === 0 && (
          <div className="col-12 text-center py-5 bg-light rounded-4 border">
            <h5 className="text-muted fw-bold">No reports found matching criteria.</h5>
          </div>
        )}
      </div>

      {/* ==============================================
          MODALS SECTION 
          ============================================== */}

      {/* 1. Modal for Viewing Metrics */}
      {selectedReport && (
        <>
          <div className="modal show d-block" tabIndex="-1" style={{ zIndex: 1055 }}>
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <div className="modal-content rounded-4 border-0 shadow-lg">
                <div className="modal-header bg-dark text-white border-0 rounded-top-4 p-4">
                  <h5 className="modal-title fw-bold">
                    Report Details <span className="text-secondary">#{selectedReport.reportId || selectedReport.id}</span>
                  </h5>
                  <div className="d-flex align-items-center gap-3">
                    <button className="btn btn-sm btn-outline-light d-flex align-items-center gap-2 rounded-pill px-3" onClick={() => handleDownloadCSV(selectedReport)}>
                      Download CSV
                    </button>
                    <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedReport(null)}></button>
                  </div>
                </div>
                <div className="modal-body p-0 bg-light">
                  
                  {(() => {
                    try {
                      const parsed = JSON.parse(selectedReport.metrics);
                      const items = parsed.items || [];
                      
                      if (items.length > 0) {
                        const headers = Object.keys(items[0]);
                        return (
                          <div className="table-responsive bg-white m-4 rounded-4 border shadow-sm">
                            <table className="table table-hover table-striped mb-0 text-dark">
                              <thead className="table-light">
                                <tr>
                                  {headers.map(h => <th key={h} className="text-uppercase small text-muted py-3 px-4">{h}</th>)}
                                </tr>
                              </thead>
                              <tbody>
                                {items.map((row, idx) => (
                                  <tr key={idx}>
                                    {headers.map(h => <td key={h} className="py-3 px-4 fw-bold text-secondary">{row[h]}</td>)}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      } else {
                        return (
                          <div className="p-4">
                            <p className="text-muted">No tabular data found for this report.</p>
                            <pre className="bg-dark text-success p-3 rounded-3">{JSON.stringify(parsed, null, 2)}</pre>
                          </div>
                        );
                      }
                    } catch (err) {
                      return <div className="p-4 text-danger fw-bold">Error parsing metrics data.</div>;
                    }
                  })()}

                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" style={{ zIndex: 1050 }}></div>
        </>
      )}

      {/* 2. Confirm Delete Modal */}
      {confirmPopup.show && (
        <>
          <div className="modal show d-block" tabIndex="-1" style={{ zIndex: 1055 }}>
            <div className="modal-dialog modal-dialog-centered modal-sm">
              <div className="modal-content rounded-4 border-0 shadow-lg text-center p-4">
                <div className="mb-3">
                  <div className="rounded-circle bg-danger bg-opacity-10 d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <span className="text-danger fs-3">⚠️</span>
                  </div>
                </div>
                <h5 className="fw-bold mb-2">Confirm Delete</h5>
                <p className="text-muted small mb-4">Are you sure you want to delete report ID #{confirmPopup.reportId}? This cannot be undone.</p>
                <div className="d-flex gap-2 justify-content-center">
                  <button className="btn btn-light fw-bold w-50" onClick={() => setConfirmPopup({ show: false, reportId: null })}>Cancel</button>
                  <button className="btn btn-danger fw-bold w-50" onClick={executeDelete}>Delete</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" style={{ zIndex: 1050 }}></div>
        </>
      )}

      {/* 3. Alert Modal (Success/Error) */}
      {alertPopup.show && (
        <>
          <div className="modal show d-block" tabIndex="-1" style={{ zIndex: 1060 }}>
            <div className="modal-dialog modal-dialog-centered modal-sm">
              <div className="modal-content rounded-4 border-0 shadow-lg text-center p-4">
                <div className="mb-3">
                  <div className={`rounded-circle bg-${alertPopup.type} bg-opacity-10 d-inline-flex align-items-center justify-content-center`} style={{ width: '60px', height: '60px' }}>
                    <span className={`text-${alertPopup.type} fs-3`}>
                      {alertPopup.type === "success" ? "✔️" : "❌"}
                    </span>
                  </div>
                </div>
                <h5 className="fw-bold mb-2">{alertPopup.type === "success" ? "Success!" : "Error"}</h5>
                <p className="text-muted small mb-4">{alertPopup.message}</p>
                <button className={`btn btn-${alertPopup.type} fw-bold w-100`} onClick={() => setAlertPopup({ show: false, message: "", type: "success" })}>
                  OK
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" style={{ zIndex: 1055 }}></div>
        </>
      )}

    </section>
  );
};

export default ReportsTab;