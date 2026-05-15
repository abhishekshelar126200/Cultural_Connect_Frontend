import React, { useState } from "react";
import { uploadImage, createHeritageSite } from "../Heritage.api";

export default function CreateHeritageSite() {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        description: "",
        status: "Active",
        fileUri: ""
    });

    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            let fileUri = "";
            const siteId = Date.now();

            if (imageFile) {
                const imageData = new FormData();
                imageData.append("file", imageFile);
                const uploadRes = await uploadImage(siteId, imageData);
                fileUri = uploadRes.data.fileUri;
            }

            const payload = { ...formData, siteId, fileUri };
            await createHeritageSite(payload);

            setSuccess("✅ Heritage site created successfully!");
            setFormData({ name: "", location: "", description: "", status: "Active", fileUri: "" });
            setImageFile(null);
            setPreview(null);
        } catch (err) {
            setError("❌ Failed to create heritage site");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-4">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="row g-0">

                    {/* Left Column: Form Details */}
                    <div className="col-lg-7 p-4 p-md-5 bg-white">
                        <div className="mb-4">
                            <h2 className="fw-bold text-dark">🏛️ Add Heritage Site</h2>
                            <p className="text-muted">Register a new cultural landmark in the system.</p>
                        </div>

                        {success && <div className="alert alert-success border-0 small">{success}</div>}
                        {error && <div className="alert alert-danger border-0 small">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold small">Heritage Name</label>
                                    <input
                                        type="text"
                                        className="form-control bg-light border-0 py-2"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Ancient Temple"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold small">Location</label>
                                    <input
                                        type="text"
                                        className="form-control bg-light border-0 py-2"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="City, Country"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold small">Status</label>
                                <select
                                    className="form-select bg-light border-0 py-2"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Active">🟢 Active / Open</option>
                                    <option value="Inactive">🔴 Inactive / Restricted</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold small">Detailed Description</label>
                                <textarea
                                    className="form-control bg-light border-0"
                                    name="description"
                                    rows="5"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Provide historical context and significance..."
                                    required
                                />
                            </div>

                            <div className="d-grid">
                                <button
                                    className="btn btn-dark btn-lg py-3 rounded-3 fw-bold"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : "Confirm & Save Site"}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Image Upload & Visual Preview */}
                    <div className="col-lg-5 p-4 p-md-5 bg-light border-start d-flex flex-column justify-content-center">
                        <div className="text-center mb-4">
                            <h5 className="fw-bold">Visual Representation</h5>
                            <p className="small text-muted">Upload a high-quality photo of the site</p>
                        </div>

                        <div
                            className="border border-2 border-dashed rounded-4 d-flex align-items-center justify-content-center bg-white position-relative overflow-hidden"
                            style={{ minHeight: "300px", borderStyle: "dashed !important", borderColor: "#dee2e6 !important" }}
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-100 h-100 object-fit-cover position-absolute"
                                />
                            ) : (
                                <div className="text-center p-4">
                                    <div className="display-4 text-muted mb-2">📸</div>
                                    <p className="text-muted small mb-0">No image selected</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-4">
                            <input
                                type="file"
                                id="siteImage"
                                className="d-none"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="siteImage" className="btn btn-outline-primary w-100 py-2 rounded-3 fw-semibold">
                                {preview ? "Change Photo" : "Choose Photo"}
                            </label>
                            <p className="text-center x-small text-muted mt-2" style={{ fontSize: '0.75rem' }}>
                                Supported formats: JPG, PNG (Max 5MB)
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}