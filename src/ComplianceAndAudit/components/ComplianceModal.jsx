// components/ComplianceModal.jsx
export default function ComplianceModal({ data, onClose, onEdit }) {
  if (!data) return null;

  return (
    <div className="modal">
      <div className="modal-box">

        <h2>{data.type}</h2>
        <p><b>ID:</b> {data.complianceID}</p>
        <p><b>Entity ID:</b> {data.entityID}</p>
        <p><b>Status:</b> {data.result}</p>
        <p><b>Date:</b> {data.date}</p>
        <p><b>Notes:</b> {data.notes}</p>

        <button onClick={onEdit}>Edit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
