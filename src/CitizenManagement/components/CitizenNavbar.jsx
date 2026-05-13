import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import { getCitizenById } from "../citizen.api";

function CitizenNavbar() {

    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();
const [status, setStatus] = useState("");

    const userName = localStorage.getItem("username");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };
    useEffect(() => {
    loadStatus();
}, []);

const loadStatus = async () => {
    try {
        const citizenId = localStorage.getItem("userId");
        const res = await getCitizenById(citizenId);
        setStatus(res.data.status);
    } catch (err) {
        console.error(err);
    }
};


    return (
        <>
            <nav className="navbar navbar-dark bg-dark px-4">

                <span className="navbar-brand fw-bold">
                    CultureConnect
                </span>

                <div className="d-flex align-items-center">

                    {/* ✅ Profile Button */}
                    <button
    className="btn btn-outline-light me-2"
    onClick={() => setShowProfile(true)}
>
    <div className="text-start">
        <div>👤 {userName}</div>
        <small className="text-warning">
            {status}
        </small>
    </div>
</button>

                    {/* ✅ Notifications (optional) */}
                    <button
                        className="btn btn-outline-warning me-2"
                        onClick={() => navigate("/citizen/notifications")}
                    >
                        🔔
                    </button>

                    {/* ✅ Logout */}
                    <button
                        className="btn btn-danger"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </nav>

            {/* ✅ PROFILE MODAL */}
            {showProfile && (
                <ProfileModal onClose={() => setShowProfile(false)} />
            )}
        </>
    );
}

export default CitizenNavbar;
