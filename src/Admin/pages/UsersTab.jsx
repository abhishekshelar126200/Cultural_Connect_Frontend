import React, { useState, useEffect } from "react";
import * as adminService from "../adminService";

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchUserId, setSearchUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertPopup, setAlertPopup] = useState({ show: false, message: "", type: "success" });
  const [confirmPopup, setConfirmPopup] = useState({ show: false, userId: null });

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "CITIZEN",
    status: "ACTIVE"
  });

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

  const handleAddUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await adminService.registerUserByAdmin(newUser);
      setAlertPopup({ show: true, message: "User successfully created!", type: "success" });
      setShowAddModal(false);
      setNewUser({ name: "", email: "", phone: "", password: "", role: "CITIZEN", status: "ACTIVE" }); 
      fetchUsers(); 
    } catch (error) {
      console.error("Error creating user", error);
      setAlertPopup({ show: true, message: "Failed to create user. Please check details.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (id) => {
    setConfirmPopup({ show: true, userId: id });
  };

  const executeDelete = async () => {
    const id = confirmPopup.userId;
    setConfirmPopup({ show: false, userId: null });

    try {
      await adminService.deleteUserByAdmin(id);
      setAlertPopup({ show: true, message: `User ID #${id} deleted successfully!`, type: "success" });
      setUsers(users.filter(u => u.userId !== id));
      setFilteredUsers(filteredUsers.filter(u => u.userId !== id));
    } catch (error) {
      console.error("Error deleting user", error);
      setAlertPopup({ show: true, message: error.response?.data?.message || "Failed to delete user.", type: "error" });
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <section className="fade-in w-100">
      
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div className="input-group w-50 shadow-sm rounded-3 overflow-hidden border">
          <input 
            type="text" 
            className="form-control border-0 bg-light px-3 py-2" 
            placeholder="Search by User ID..." 
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
          />
          {searchUserId && (
             <button className="btn btn-light border-start px-3" onClick={() => {setSearchUserId(""); setFilteredUsers(users);}}>✕</button>
          )}
          <button className="btn btn-primary px-4 fw-bold" onClick={handleSearch}>Search</button>
        </div>

        <button 
          className="btn btn-success fw-bold px-4 rounded-3 shadow-sm d-flex align-items-center gap-2"
          onClick={() => setShowAddModal(true)}
        >
          <span className="fs-5 lh-1">+</span> Add User
        </button>
      </div>

      <div className="table-responsive rounded-4 shadow-sm border border-light overflow-hidden">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light text-muted small text-uppercase">
            <tr>
              <th className="py-3 px-4">User Details</th>
              <th className="py-3">Role</th>
              <th className="py-3">Status</th>
              <th className="py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredUsers.map((user) => (
              <tr key={user.userId}>
                <td className="px-4 py-3">
                  <span className="d-block fw-bold text-dark">{user.name}</span>
                  <small className="text-muted">ID: {user.userId} | {user.email}</small>
                </td>
                <td>
                  <span className={`badge ${user.role === 'ADMIN' ? 'bg-danger' : 'bg-secondary'}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className="badge bg-primary bg-opacity-10 text-primary border-0 fw-bold rounded-pill px-3 py-2">
                    {user.status || "ACTIVE"}
                  </span>
                </td>
                <td className="text-center">
                  {/* ✅ UI PROTECT: Disable delete button if role is ADMIN */}
                  <button 
                    className={`btn btn-sm rounded-circle shadow-sm ${user.role === 'ADMIN' ? 'btn-light text-muted opacity-50' : 'btn-light text-danger'}`}
                    style={{ width: '32px', height: '32px', cursor: user.role === 'ADMIN' ? 'not-allowed' : 'pointer' }}
                    onClick={() => user.role !== 'ADMIN' && handleDeleteClick(user.userId)}
                    title={user.role === 'ADMIN' ? "Admins cannot be deleted" : "Delete User"}
                    disabled={user.role === 'ADMIN'}
                  >
                    <span className="fw-bold">✕</span>
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr><td colSpan="4" className="text-center py-4 text-muted">No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <>
          <div className="modal show d-block" tabIndex="-1" style={{ zIndex: 1055 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 border-0 shadow-lg">
                <div className="modal-header bg-dark text-white border-0 rounded-top-4 p-4">
                  <h5 className="modal-title fw-bold">Add New User</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowAddModal(false)}></button>
                </div>
                <div className="modal-body p-4 bg-light">
                  <form onSubmit={handleAddUser}>
                    <div className="mb-3">
                      <label className="form-label fw-bold small text-muted">Full Name</label>
                      <input type="text" className="form-control border-0 shadow-sm px-3 py-2" required 
                        value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold small text-muted">Email Address</label>
                      <input type="email" className="form-control border-0 shadow-sm px-3 py-2" required 
                        value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold small text-muted">Phone Number</label>
                      <input type="text" className="form-control border-0 shadow-sm px-3 py-2" required 
                        value={newUser.phone} onChange={(e) => setNewUser({...newUser, phone: e.target.value})} />
                    </div>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label className="form-label fw-bold small text-muted">Role</label>
                        {/* ✅ ALL ROLES ADDED HERE */}
                        <select className="form-select border-0 shadow-sm px-3 py-2" 
                          value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})}>
                          <option value="CITIZEN">CITIZEN</option>
                          <option value="OFFICER">OFFICER</option>
                          <option value="MANAGER">MANAGER</option>
                          <option value="COMPLIANCE">COMPLIANCE</option>
                          <option value="AUDITOR">AUDITOR</option>
                        </select>
                      </div>
                      <div className="col-6 mb-4">
                        <label className="form-label fw-bold small text-muted">Temporary Password</label>
                        <input type="text" className="form-control border-0 shadow-sm px-3 py-2" required 
                          value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} />
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button type="button" className="btn btn-light fw-bold w-50" onClick={() => setShowAddModal(false)}>Cancel</button>
                      <button type="submit" className="btn btn-success fw-bold w-50" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save User"}
                      </button>
                    </div>
                  </form>
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
                <p className="text-muted small mb-4">Are you sure you want to delete user ID #{confirmPopup.userId}? This cannot be undone.</p>
                <div className="d-flex gap-2 justify-content-center">
                  <button className="btn btn-light fw-bold w-50" onClick={() => setConfirmPopup({ show: false, userId: null })}>Cancel</button>
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

export default UsersTab;