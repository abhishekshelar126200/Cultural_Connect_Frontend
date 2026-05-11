import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getHeritageSiteById } from "../Heritage.api";
import {
    getActivitiesBySite,
    addPreservationActivity,
    deletePreservationActivity
} from "../PreservationActivities.api";

export default function HeritageSiteDetails() {
    const {eventId } = useParams();
    const closeBtnRef = useRef(null); // To close modal programmatically

    const [site, setSite] = useState(null);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [activityData, setActivityData] = useState({
        description: "",
        date: "",
        status: "ONGOING"
    });

    const IMAGE_BASE_URL = "http://localhost:8086/uploads/";
    const officerId = localStorage.getItem("userId");

    useEffect(() => {
        loadData();
    }, [siteId]);

    const loadData = async () => {
        try {
            const [siteRes, activityRes] = await Promise.all([
                getHeritageSiteById(siteId),
                getActivitiesBySite(siteId)
            ]);
            setSite(siteRes.data);
            setActivities(activityRes.data);
        } catch (err) {
            console.error("Failed to load heritage details", err);
        } finally {
            setLoading(false);
        }
    };

    const handleActivityChange = (e) => {
        setActivityData({
            ...activityData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddActivity = async () => {
        if (!activityData.description || !activityData.date) {
            alert("Please fill in all fields");
            return;
        }

        setSubmitting(true);
        try {
            const payload = {
                ...activityData,
                siteId: Number(siteId), // Ensure it's a number
                officerId: Number(officerId)
            };

            await addPreservationActivity(payload);

            // Reset form
            setActivityData({ description: "", date: "", status: "ONGOING" });

            // Refresh list
            const refreshed = await getActivitiesBySite(siteId);
            setActivities(refreshed.data);

            // Close Modal via Ref
            if (closeBtnRef.current) closeBtnRef.current.click();
        } catch (err) {
            alert("Error adding activity");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteActivity = async (activityId) => {
        if (!window.confirm("Are you sure you want to delete this activity?")) return;

        try {
            await deletePreservationActivity(activityId);
            setActivities(prev => prev.filter(act => act.activityId !== activityId));
        } catch (err) {
            alert("Failed to delete activity");
        }
    };

    if (loading) return <div className="text-center my-5"><h5>Loading...</h5></div>;
    if (!site) return <div className="text-center my-5 text-danger">Site not found</div>;

    return (
        <div className="container my-5">
            {/* SITE HEADER */}
            <div className="row mb-5 align-items-center">
                <div className="col-md-7">
                    <h2 className="fw-bold text-primary">{site.name}</h2>
                    <p className="text-muted fs-5">📍 {site.location}</p>
                    <p className="lead">{site.description}</p>
                    <span className={`badge ${site.status === 'Active' ? 'bg-success' : 'bg-warning'}`}>
                        {site.status}
                    </span>
                </div>
                <div className="col-md-5">
                    {site.fileUri && (
                        <img
                            src={`${IMAGE_BASE_URL}${site.fileUri}`}
                            alt={site.name}
                            className="img-fluid rounded shadow-lg"
                            style={{ width: "100%", maxHeight: "350px", objectFit: "cover" }}
                        />
                    )}
                </div>
            </div>

            <hr />

            {/* ACTIVITIES SECTION */}
            <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
                <h4 className="fw-bold">Preservation Timeline</h4>
                <button className="btn btn-primary shadow-sm" data-bs-toggle="modal" data-bs-target="#addActivityModal">
                    ➕ Add Activity
                </button>
            </div>

            <div className="row">
                <div className="col-12">
                    {activities.length === 0 ? (
                        <div className="alert alert-light border text-center">No activities recorded yet.</div>
                    ) : (
                        activities.map(activity => (
                            <div key={activity.activityId} className="card mb-3 border-start border-primary border-4 shadow-sm">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="fw-bold mb-1">{activity.description}</h6>
                                        <span className="text-muted small">
                                            📅 {activity.date} | Status: <strong>{activity.status}</strong>
                                        </span>
                                    </div>
                                    <button
                                        className="btn btn-outline-danger btn-sm border-0"
                                        onClick={() => handleDeleteActivity(activity.activityId)}
                                    >
                                        🗑 Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* ADD ACTIVITY MODAL */}
            <div className="modal fade" id="addActivityModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Record Preservation Activity</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" ref={closeBtnRef}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Activity Description</label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    value={activityData.description}
                                    onChange={handleActivityChange}
                                    rows="3"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Date of Activity</label>
                                <input
                                    type="date"
                                    name="date"
                                    className="form-control"
                                    value={activityData.date}
                                    onChange={handleActivityChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Current Status</label>
                                <select name="status" className="form-select" value={activityData.status} onChange={handleActivityChange}>
                                    <option value="ONGOING">Ongoing</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="PLANNED">Planned</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAddActivity}
                                disabled={submitting}
                            >
                                {submitting ? "Saving..." : "Save Activity"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}