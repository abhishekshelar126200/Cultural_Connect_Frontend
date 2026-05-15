import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getHeritageSiteById } from "../Heritage.api";
import {
    getActivitiesBySite,
    addPreservationActivity,
    deletePreservationActivity,
    updatePreservationActivity
} from "../PreservationActivities.api";

export default function HeritageSiteDetails() {
    const { siteId } = useParams();
    const closeBtnRef = useRef(null);

    const [site, setSite] = useState(null);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState("ALL");

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

    // ✅ Filter logic
    const filteredActivities =
        activeTab === "ALL"
            ? activities
            : activities.filter((act) => act.status === activeTab);

    // ✅ Status Update
    const handleStatusChange = async (activityId, newStatus) => {
        const confirmUpdate = window.confirm(
            "Are you sure you want to change the activity status?"
        );
        if (!confirmUpdate) return;

        try {
            await updatePreservationActivity(activityId, newStatus);

            setActivities((prev) =>
                prev.map((act) =>
                    act.activityId === activityId
                        ? { ...act, status: newStatus }
                        : act
                )
            );
        } catch (err) {
            console.error(err);
            alert("Failed to update status");
        }
    };

    const loadData = async () => {
        try {
            const [siteRes, activityRes] = await Promise.all([
                getHeritageSiteById(siteId),
                getActivitiesBySite(siteId)
            ]);
            setSite(siteRes.data);
            setActivities(activityRes.data);
        } catch (err) {
            console.error("Error loading data", err);
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
            alert("Please fill all fields");
            return;
        }

        setSubmitting(true);
        try {
            const payload = {
                ...activityData,
                siteId: Number(siteId),
                officerId: Number(officerId)
            };

            await addPreservationActivity(payload);

            setActivityData({
                description: "",
                date: "",
                status: "ONGOING"
            });

            const refreshed = await getActivitiesBySite(siteId);
            setActivities(refreshed.data);

            closeBtnRef.current?.click();
        } catch (err) {
            alert("Failed to add activity");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteActivity = async (activityId) => {
        if (!window.confirm("Delete this activity?")) return;

        try {
            await deletePreservationActivity(activityId);
            setActivities((prev) =>
                prev.filter((act) => act.activityId !== activityId)
            );
        } catch (err) {
            alert("Delete failed");
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    if (!site) {
        return <div className="text-center text-danger mt-5">Site not found</div>;
    }

    return (
        <div className="container-fluid px-lg-5 py-4 bg-light min-vh-100">

            {/* ✅ HERO */}
            <div className="card shadow-sm rounded-4 mb-5 overflow-hidden">
                <div className="row g-0">
                    <div className="col-lg-6 p-5">
                        <h2 className="fw-bold">{site.name}</h2>
                        <p className="text-muted">{site.description}</p>
                        <p className="fw-semibold">
                            📍 {site.location}
                        </p>
                    </div>

                    <div className="col-lg-6">
                        {site.fileUri ? (
                            <img
                                src={`${IMAGE_BASE_URL}${site.fileUri}`}
                                className="w-100 h-100"
                                style={{ objectFit: "cover" }}
                                alt=""
                            />
                        ) : (
                            <div className="d-flex align-items-center justify-content-center h-100">
                                No Image
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ✅ HEADER */}
            <div className="d-flex justify-content-between mb-3">
                <h3>Preservation Activities</h3>
                <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#addActivityModal"
                >
                    + Add Activity
                </button>
            </div>

            {/* ✅ TABS */}
            <ul className="nav nav-pills bg-white p-2 rounded-4 shadow-sm mb-4">
                {["ALL", "ONGOING", "COMPLETED", "PLANNED"].map((tab) => (
                    <li key={tab} className="nav-item">
                        <button
                            className={`nav-link px-4 fw-semibold ${activeTab === tab
                                    ? "active bg-primary"
                                    : "text-dark"
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    </li>
                ))}
            </ul>

            {/* ✅ LIST */}
            {filteredActivities.length === 0 ? (
                <div className="text-center p-5 bg-white rounded">
                    No activities found
                </div>
            ) : (
                filteredActivities.map((activity) => (
                    <div
                        key={activity.activityId}
                        className="card mb-3 shadow-sm p-3"
                    >
                        <div className="d-flex justify-content-between align-items-center">

                            {/* LEFT */}
                            <div>
                                <h5>{activity.description}</h5>
                                <small className="text-muted">
                                    📅 {activity.date}
                                </small>
                            </div>

                            {/* RIGHT */}
                            <div className="d-flex gap-3">

                                <select
                                    value={activity.status}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            activity.activityId,
                                            e.target.value
                                        )
                                    }
                                    className={`form-select form-select-sm rounded-pill ${activity.status === "COMPLETED"
                                            ? "bg-success-subtle text-success"
                                            : activity.status === "ONGOING"
                                                ? "bg-primary-subtle text-primary"
                                                : "bg-warning-subtle text-warning"
                                        }`}
                                >
                                    <option value="ONGOING">Ongoing</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="PLANNED">Planned</option>
                                </select>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        handleDeleteActivity(activity.activityId)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}

            {/* ✅ MODAL */}
            <div className="modal fade" id="addActivityModal">
                <div className="modal-dialog">
                    <div className="modal-content p-4">

                        <h5>Add Activity</h5>

                        <textarea
                            name="description"
                            className="form-control my-2"
                            placeholder="Description"
                            onChange={handleActivityChange}
                        />

                        <input
                            type="date"
                            name="date"
                            className="form-control my-2"
                            onChange={handleActivityChange}
                        />

                        <select
                            name="status"
                            className="form-select my-2"
                            onChange={handleActivityChange}
                        >
                            <option value="ONGOING">Ongoing</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="PLANNED">Planned</option>
                        </select>

                        <button
                            className="btn btn-primary mt-2"
                            onClick={handleAddActivity}
                        >
                            {submitting ? "Saving..." : "Save"}
                        </button>

                        <button
                            className="btn btn-secondary mt-2"
                            data-bs-dismiss="modal"
                            ref={closeBtnRef}
                        >
                            Close
                        </button>

                    </div>
                </div>
            </div>

        </div>
    );
}