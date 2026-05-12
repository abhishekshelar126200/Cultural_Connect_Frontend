// components/ComplianceForm.jsx
import { useState } from "react";

export default function ComplianceForm({ onSubmit }) {
  const [form, setForm] = useState({
    entityID: "",
    type: "PROGRAM",
    result: "UNDER REVIEW",
    notes: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="form">
      <input
        name="entityID"
        placeholder="Entity ID"
        onChange={handleChange}
      />

      <select name="type" onChange={handleChange}>
        <option>PROGRAM</option>
        <option>GRANT</option>
        <option>EVENT</option>
      </select>

      <select name="result" onChange={handleChange}>
        <option>COMPLIANT</option>
        <option>NON COMPLIANT</option>
        <option>UNDER REVIEW</option>
      </select>

      <textarea
        name="notes"
        placeholder="Notes"
        onChange={handleChange}
      />

      <button onClick={() => onSubmit(form)}>Submit</button>
    </div>
  );
}