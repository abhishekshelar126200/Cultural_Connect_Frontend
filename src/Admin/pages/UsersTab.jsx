import React, { useState, useEffect } from "react";
import * as adminService from "../adminService";

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchUserId, setSearchUserId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await adminService.getAllUsers();
      if (Array.isArray(res.data)) {
        setUsers(res.data);
        setFilteredUsers(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchUserId.trim()) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((u) => u.userId?.toString() === searchUserId.trim());
      setFilteredUsers(filtered);
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <section className="fade-in">
      <div className="input-group mb-4 w-50 shadow-sm rounded-3 overflow-hidden border">
        <input 
          type="text" 
          className="form-control border-0 bg-light px-3 py-2" 
          placeholder="Search by User ID..." 
          value={searchUserId}
          onChange={(e) => setSearchUserId(e.target.value)}
        />
        <button className="btn btn-primary px-4 fw-bold" onClick={handleSearch}>Search</button>
      </div>

      <div className="table-responsive rounded-4 shadow-sm border border-light overflow-hidden">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light text-muted small text-uppercase">
            <tr>
              <th className="py-3 px-4">User Details</th>
              <th className="py-3">Role</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredUsers.map((user) => (
              <tr key={user.userId}>
                <td className="px-4 py-3">
                  <span className="d-block fw-bold text-dark">{user.name}</span>
                  <small className="text-muted">ID: {user.userId} | {user.email}</small>
                </td>
                <td><span className="badge bg-secondary">{user.role}</span></td>
                <td>
                  <select className="form-select form-select-sm w-auto bg-primary bg-opacity-10 text-primary border-0 fw-bold rounded-pill px-3">
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr><td colSpan="3" className="text-center py-4 text-muted">No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UsersTab;