import React, { useState } from "react";
import { uploadImage, createHeritageSite } from "../Heritage.api";
// import { v4 as uuidv4 } from "uuid";

export default function CreateHeritageSite() {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        description: "",
        status: "Active",
        fileUri: ""
    });

    const [imageFile, setImageFile] = useState(null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            let fileUri = "";
            // const siteId = uuidv4();
            const siteId = Date.now(); // Simple unique ID based on timestamp
            // ✅ STEP 1: Upload image first (multipart)
            if (imageFile) {

                const imageData = new FormData();
                imageData.append("file", imageFile);

                const uploadRes = await uploadImage(siteId, imageData);

                // Backend should return uploaded image URL
                fileUri = uploadRes.data.fileUri;
            }

            console.log("Image uploaded, file URI:", fileUri);

            // ✅ STEP 2: Send heritage site data
            const payload = {
                ...formData,
                siteId,
                fileUri
            };

            await createHeritageSite(payload);

            setSuccess("Heritage site created successfully!");
            setFormData({
                name: "",
                location: "",
                description: "",
                status: "Active",
                fileUri: ""
            });
            setImageFile(null);

        } catch (err) {
            setError("Failed to create heritage site");
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-7">

                    <div className="card shadow-lg border-0">
                        <div className="card-body p-4">

                            <h3 className="fw-bold text-primary text-center mb-4">
                                Create Heritage Site
                            </h3>

                            {success && <div className="alert alert-success">{success}</div>}
                            {error && <div className="alert alert-danger">{error}</div>}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">Heritage Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        rows="3"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Heritage Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <small className="text-muted">
                                        Upload an image for the heritage site
                                    </small>
                                </div>

                                <div className="d-grid">
                                    <button className="btn btn-primary btn-lg">
                                        Create Heritage Site
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