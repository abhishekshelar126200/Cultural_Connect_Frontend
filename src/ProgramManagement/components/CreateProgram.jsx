import React, { useState } from "react";
import { createProgram } from "../Services/programManager.api";
import { useNavigate } from "react-router-dom";

export default function CreateProgram() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createProgram(formData);

            alert("Program Created Successfully ✅");

            navigate("/programmanager/programs"); // go back

        } catch (error) {
            console.error(error);
            alert("Error creating program ❌");
        }

        setLoading(false);
    };

    return (
        <div className="container">

            <h3 className="mb-3">Create Program</h3>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="btn btn-success" disabled={loading}>
                    {loading ? "Creating..." : "Create Program"}
                </button>

            </form>
        </div>
    );
}