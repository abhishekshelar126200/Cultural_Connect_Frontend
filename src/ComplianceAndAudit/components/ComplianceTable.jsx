// components/ComplianceTable.jsx
export default function ComplianceTable({ data, onView, onDelete }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Entity</th>
          <th>Status</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {data.map(item => (
          <tr key={item.complianceID}>
            <td>{item.complianceID}</td>
            <td>{item.type}</td>
            <td>{item.entityID}</td>
            <td>
              <span className={`badge ${item.result.replace(" ", "")}`}>
                {item.result}
              </span>
            </td>
            <td>{item.date}</td>
            <td>
              <button onClick={() => onView(item.complianceID)}>View</button>
              <button onClick={() => onDelete(item.complianceID)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}