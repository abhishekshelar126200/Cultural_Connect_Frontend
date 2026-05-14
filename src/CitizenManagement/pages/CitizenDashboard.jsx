import React, { useState, useEffect } from "react";
import { getPrograms, fetchNotifications, getApplicationsByCitizen } from "../citizen.api";
import ProgramStats from "../components/ProgramStats";
import ProgramList from "../components/ProgramList";

function Dashboard() {

    const [programs, setPrograms] = useState([]);

    const [stats, setStats] = useState({
        applied: 0,
        approved: 0,
        rejected: 0
    });

    const [unreadNotifCount, setUnreadNotifCount] = useState(0);

    const citizenId = localStorage.getItem("userId");

    const loadDashboardData = async () => {

        if (!citizenId) return;

        try {
            // ✅ LOAD PROGRAMS
            const programRes = await getPrograms();

            const sorted = programRes.data.sort(
                (a, b) => b.programId - a.programId
            );

            const latest15 = sorted.slice(0, 15);

            setPrograms(latest15);

            // ✅ LOAD APPLICATIONS (IMPORTANT)
            const appRes = await getApplicationsByCitizen(citizenId);

            const applied = appRes.data.length;
            const approved = appRes.data.filter(a => a.status === "APPROVED").length;
            const rejected = appRes.data.filter(a => a.status === "REJECTED").length;

            setStats({
                applied,
                approved,
                rejected
            });

            // ✅ LOAD NOTIFICATIONS
            const notifRes = await fetchNotifications(citizenId);

            const unread = notifRes.data.data.filter(
                n => n.status === "SENT"
            ).length;

            setUnreadNotifCount(unread);

        } catch (error) {
            console.error("Dashboard data error:", error);
        }
    };

    useEffect(() => {
        loadDashboardData();
    }, [citizenId]);

    return (
        <div className="container my-4">

            {/* ✅ UPDATED STATS */}
            <ProgramStats
                programStats={{
                    appliedPrograms: stats.applied,
                    approvedPrograms: stats.approved,
                    rejectedPrograms: stats.rejected,
                    notifications: unreadNotifCount
                }}
            />

            {/* ✅ PROGRAM LIST (TOP 15) */}
            <ProgramList programs={programs} />

        </div>
    );
}

export default Dashboard;
