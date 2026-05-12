import React from "react";
import { Link } from "react-router-dom";

export default function ResourceList({ resources, programId, eventId, onDelete }) {
  return (
    <div className="row g-4">
      {resources.map((res) => (
        <div className="col-md-6 col-lg-4" key={res.resourceId}>
          <div className="card shadow-sm h-100 border-start border-success border-4">
            <div className="card-body d-flex flex-column">
              <h5 className="fw-bold">{res.name}</h5>
              <p className="text-muted small">Qty: {res.quantity} | {res.type}</p>
              
              <div className="mt-auto d-flex gap-2 pt-3">
                <Link 
                  to={`/programmanager/editResource/${programId}/${eventId}/${res.resourceId}`} 
                  className="btn btn-sm btn-outline-warning flex-fill"
                >
                  ✏️ Edit
                </Link>
                <button 
                  onClick={() => onDelete(res.resourceId)} 
                  className="btn btn-sm btn-outline-danger flex-fill"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}