// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAllCompliance, getProgramDetails, getGrantsByIds } from "../compliance.api";
// import GrantModal from "../components/GrantModal";

// export default function AuditorDashboard() {
//   const [complianceList, setComplianceList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [modalData, setModalData] = useState([]);

//   const navigate = useNavigate(); // ✅ ADDED

//   useEffect(() => {
//     const fetchComplianceData = async () => {
//       try {
//         setLoading(true);
//         const response = await getAllCompliance();
//         setComplianceList(response.data || []);
//       } catch (err) {
//         console.error("Error fetching compliance history:", err);
//         setError("Failed to load compliance records.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchComplianceData();
//   }, []);

//   // ✅ HANDLE ROW CLICK
//   const handleRowClick = (complianceId, entityId) => {
//     console.log("Navigating to program details for entityId:", entityId);
//     navigate(`/audit/programDetails/${complianceId}/${entityId}`);
//   };

//   // Open grants modal for a specific program (entityId)
//   const handleOpenGrants = async (entityId) => {
//     try {
//       // fetch program to get grantIds
//       const progRes = await getProgramDetails(entityId);
//       const grantIds = progRes.data?.grantIds || [];

//       if (!grantIds || grantIds.length === 0) {
//         setModalData([]);
//         // show empty modal
//         new (await import("bootstrap")).Modal(document.getElementById("grantsModal")).show();
//         return;
//       }

//       const grantsRes = await getGrantsByIds(grantIds);
//       setModalData(grantsRes.data || []);
//       new (await import("bootstrap")).Modal(document.getElementById("grantsModal")).show();
//     } catch (err) {
//       console.error("Failed to load grants:", err);
//       setModalData([]);
//       alert("Unable to load grants right now.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center py-5">
//         <div className="spinner-border text-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="fw-bold text-dark">Compliance Audit History</h2>
//         <span className="badge bg-secondary">
//           {complianceList.length} Total Records
//         </span>
//       </div>

//       {error && <div className="alert alert-danger">{error}</div>}

//       <div className="table-responsive shadow-sm rounded">
//         <table className="table table-hover align-middle bg-white mb-0">
//           <thead className="table-light">
//             <tr>
//               <th>ID</th>
//               <th>Entity ID</th>
//               <th>Type</th>
//               <th>Result</th>
//               <th>Date</th>
//               <th>Notes</th>
//             </tr>
//           </thead>

//           <tbody>
//             {complianceList.length > 0 ? (
//               complianceList
//                 // 1. Filter the list to only include NON-COMPLIANT records
//                 .filter((record) => record.result === "NON-COMPLIANT")
//                 // 2. Map the filtered results
//                 .map((record) => (
//                   <tr
//                     key={record.complianceId}
//                     style={{ cursor: "pointer" }}
//                     onClick={() => handleRowClick(record.complianceId, record.entityId)}
//                   >
//                     <td className="fw-bold">#{record.complianceId}</td>
//                     <td>{record.entityId}</td>
//                     <td>
//                       <span className="badge bg-info text-dark">{record.type}</span>
//                     </td>
//                     <td>
//                       {/* Since we filtered, this will always be text-danger */}
//                       <span className="fw-bold text-danger">
//                         {record.result}
//                       </span>
//                     </td>
//                     <td className="text-muted">
//                       {new Date(record.date).toLocaleDateString()}
//                     </td>
//                     <td>
//                       <small className="text-muted">
//                         {record.notes || "No additional notes"}
//                       </small>
//                     </td>
//                     <td>
//                       <div className="d-flex gap-2 justify-content-end">
                        
//                         <button
//                           className="btn btn-sm btn-outline-primary"
//                           onClick={(e) => { e.stopPropagation(); handleRowClick(record.complianceId, record.entityId); }}
//                         >
//                           Details
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center py-4 text-muted">
//                   No compliance records found.
//                 </td>
//               </tr>
//             )}

//             {/* Optional: Message if complianceList has data but none are NON-COMPLIANT */}
//             {complianceList.length > 0 && complianceList.filter(r => r.result === "NON-COMPLIANT").length === 0 && (
//               <tr>
//                 <td colSpan="6" className="text-center py-4 text-success">
//                   🎉 All records are compliant! No issues found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       {/* Grant modal instance - reused component */}
//       <GrantModal data={modalData} />
//     </div>
//   );
// }
//=============================== REFACTORED CODE BELOW ==============================
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAllCompliance } from "../compliance.api"; // Removed unused imports

// export default function AuditorDashboard() {
//   const [complianceList, setComplianceList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   // 1. Fetch compliance history
//   useEffect(() => {
//     const fetchComplianceData = async () => {
//       try {
//         setLoading(true);
//         const response = await getAllCompliance();
//         setComplianceList(response.data || []);
//       } catch (err) {
//         console.error("Error fetching compliance history:", err);
//         setError("Failed to load compliance records.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchComplianceData();
//   }, []);

//   // 2. Navigate to detailed program audit view
//   const handleRowClick = (complianceId, entityId) => {
//     navigate(`/audit/programDetails/${complianceId}/${entityId}`);
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <div className="spinner-border text-primary" role="status"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-4">
//       {/* Header Section */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="fw-bold text-dark m-0">Compliance Audit History</h2>
//         <div className="d-flex align-items-center gap-2">
//           <span className="badge bg-danger">
//             {complianceList.filter(r => r.result === "NON-COMPLIANT").length} Non-Compliant
//           </span>
//           <span className="badge bg-secondary">
//             {complianceList.length} Total
//           </span>
//         </div>
//       </div>

//       {error && <div className="alert alert-danger shadow-sm">{error}</div>}

//       {/* Table Section */}
//       <div className="table-responsive shadow rounded-3 border-0">
//         <table className="table table-hover align-middle bg-white mb-0">
//           <thead className="table-dark">
//             <tr>
//               <th>ID</th>
//               <th>Entity ID</th>
//               <th>Type</th>
//               <th>Result</th>
//               <th>Date</th>
//               <th className="text-end">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {complianceList.length > 0 ? (
//               complianceList
//                 .filter((record) => record.result === "NON-COMPLIANT")
//                 .map((record) => (
//                   <tr 
//                     key={record.complianceId} 
//                     style={{ cursor: "pointer" }}
//                     onClick={() => handleRowClick(record.complianceId, record.entityId)}
//                   >
//                     <td className="fw-bold text-primary">#{record.complianceId}</td>
//                     <td>{record.entityId}</td>
//                     <td>
//                       <span className="badge bg-light text-dark border">{record.type}</span>
//                     </td>
//                     <td>
//                       <span className="fw-bold text-danger">{record.result}</span>
//                     </td>
//                     <td className="text-muted">
//                       {new Date(record.date).toLocaleDateString()}
//                     </td>
//                     <td className="text-end">
//                       <div className="d-flex gap-2 justify-content-end">
//                         {/* VIEW GRANTS BUTTON REMOVED FROM HERE */}
//                         <button
//                           className="btn btn-sm btn-primary"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleRowClick(record.complianceId, record.entityId);
//                           }}
//                         >
//                           Details
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center py-5 text-muted">
//                   No compliance issues found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
      
//       {/* GRANT MODAL INSTANCE REMOVED FROM HERE */}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAllCompliance } from "../compliance.api";

// export default function AuditorDashboard() {
//   const [complianceList, setComplianceList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchComplianceData = async () => {
//       try {
//         setLoading(true);
//         const response = await getAllCompliance();
//         setComplianceList(response.data || []);
//       } catch (err) {
//         console.error("Error fetching compliance history:", err);
//         setError("Failed to load compliance records.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchComplianceData();
//   }, []);

//   // ✅ UPDATED: Now passes the whole record object via state
//   const handleRowClick = (record) => {
//     navigate(`/audit/programDetails/${record.complianceId}/${record.entityId}`, {
//       state: { auditNotes: record.notes }
//     });
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <div className="spinner-border text-primary" role="status"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="fw-bold text-dark m-0">Compliance Audit History</h2>
//         <div className="d-flex align-items-center gap-2">
//           <span className="badge bg-danger">
//             {complianceList.filter(r => r.result === "NON-COMPLIANT").length} Non-Compliant
//           </span>
//           <span className="badge bg-secondary">
//             {complianceList.length} Total
//           </span>
//         </div>
//       </div>

//       {error && <div className="alert alert-danger shadow-sm">{error}</div>}

//       <div className="table-responsive shadow rounded-3 border-0">
//         <table className="table table-hover align-middle bg-white mb-0">
//           <thead className="table-dark">
//             <tr>
//               <th>ID</th>
//               <th>Entity ID</th>
//               <th>Type</th>
//               <th>Result</th>
//               <th>Date</th>
//               <th className="text-end">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {complianceList.length > 0 ? (
//               complianceList
//                 .filter((record) => record.result === "NON-COMPLIANT")
//                 .map((record) => (
//                   <tr 
//                     key={record.complianceId} 
//                     style={{ cursor: "pointer" }}
//                     onClick={() => handleRowClick(record)} // ✅ Pass record
//                   >
//                     <td className="fw-bold text-primary">#{record.complianceId}</td>
//                     <td>{record.entityId}</td>
//                     <td>
//                       <span className="badge bg-light text-dark border">{record.type}</span>
//                     </td>
//                     <td>
//                       <span className="fw-bold text-danger">{record.result}</span>
//                     </td>
//                     <td className="text-muted">
//                       {new Date(record.date).toLocaleDateString()}
//                     </td>
//                     <td className="text-end">
//                       <div className="d-flex gap-2 justify-content-end">
//                         <button
//                           className="btn btn-sm btn-primary"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleRowClick(record);
//                           }}
//                         >
//                           Details
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center py-5 text-muted">
//                   No compliance issues found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCompliance, updateCompliance } from "../compliance.api";

export default function AuditorDashboard() {
  const [complianceList, setComplianceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Remarks input state
  const [remarks, setRemarks] = useState({}); 

  const navigate = useNavigate();

  useEffect(() => {
    fetchComplianceData();
  }, []);

  const fetchComplianceData = async () => {
    try {
      setLoading(true);
      const response = await getAllCompliance();
      setComplianceList(response.data || []);
    } catch (err) {
      setError("Failed to load compliance records.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemarkChange = (id, value) => {
    setRemarks(prev => ({ ...prev, [id]: value }));
  };

  const handleRowClick = (record) => {
    // Navigation-er somoy Database er notes pathano hoche
    navigate(`/audit/programDetails/${record.complianceId}/${record.entityId}`, {
      state: { auditNotes: record.notes }
    });
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border"></div></div>;

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Compliance Audit History</h2>
      
      <div className="table-responsive shadow rounded border-0">
        <table className="table table-hover align-middle bg-white mb-0">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Entity ID</th>
              <th>Status</th>
              <th>Auditor Remarks (Add/Edit)</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complianceList.filter(r => r.result === "NON-COMPLIANT").map((record) => (
              <tr key={record.complianceId}>
                <td className="fw-bold">#{record.complianceId}</td>
                <td>{record.entityId}</td>
                <td><span className="badge bg-danger">{record.result}</span></td>
                <td>
                  {/* Remark Input Field */}
                  <textarea 
                    className="form-control form-control-sm"
                    placeholder="Update reason for non-compliance..."
                    defaultValue={record.notes}
                    onChange={(e) => handleRemarkChange(record.complianceId, e.target.value)}
                  />
                </td>
                <td className="text-end">
                  <button 
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleRowClick(record)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}