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
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-7">

                    <div className="card border-0 shadow-lg rounded-4">
                        <div className="card-body p-5">

                            {/* Header */}
                            <div className="text-center mb-4">
                                <h2 className="fw-bold text-primary">🏛️ Add Heritage Site</h2>
                                <p className="text-muted">Fill details to create a new heritage location</p>
                            </div>

                            {success && <div className="alert alert-success text-center">{success}</div>}
                            {error && <div className="alert alert-danger text-center">{error}</div>}

                            <form onSubmit={handleSubmit}>

                                {/* Name */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Heritage Name</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-3"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter heritage name"
                                        required
                                    />
                                </div>

                                {/* Location */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Location</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-3"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Enter location"
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Description</label>
                                    <textarea
                                        className="form-control rounded-3"
                                        name="description"
                                        rows="3"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Write short description..."
                                        required
                                    />
                                </div>

                                {/* Status */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Status</label>
                                    <select
                                        className="form-select rounded-3"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>

                                {/* Image Upload */}
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">Heritage Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />

                                    {preview && (
                                        <div className="mt-3 text-center">
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="img-fluid rounded-3 shadow-sm"
                                                style={{ maxHeight: "200px" }}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Submit */}
                                <div className="d-grid">
                                    <button className="btn btn-primary btn-lg rounded-3 shadow-sm">
                                        ➕ Create Heritage Site
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
