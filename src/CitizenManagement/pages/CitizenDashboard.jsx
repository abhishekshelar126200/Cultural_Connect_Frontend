import React, { useState, useEffect } from "react";
import { getPrograms, fetchNotifications } from "../citizen.api";
import ProgramStats from "../components/ProgramStats";
import ProgramList from "../components/ProgramList";

function Dashboard() {
    const [programs, setPrograms] = useState([]);

  const loadPrograms = async () => {
    const res = await getPrograms();

    // ✅ Sort latest first
    const sorted = res.data.sort(
        (a, b) => b.programId - a.programId
    );

    // ✅ Take only top 15
    const latest15 = sorted.slice(0, 15);

    setPrograms(latest15);
};

    const [unreadNotifCount, setUnreadNotifCount] = useState(0);

    // ✅ DYNAMIC ID: Pull from localStorage
    const citizenId = localStorage.getItem("userId");

    const loadDashboardData = async () => {
        if (!citizenId) return;
        try {
            const programRes = await getPrograms();
            setPrograms(programRes.data);

            const notifRes = await fetchNotifications(citizenId);
            const unreadCount = notifRes.data.data.filter(n => n.status === "SENT").length;
            setUnreadNotifCount(unreadCount);
        } catch (error) {
            console.error("Dashboard data error:", error);
        }
    };

    useEffect(() => {
        loadDashboardData();
    }, [citizenId]);

    return (
        <div className="container my-4">
            <ProgramStats programStats={{
                appliedPrograms: programs.length,
                approvedGrants: 0, 
                upcomingEvents: 0, 
                notifications: unreadNotifCount
            }} />
            <ProgramList programs={programs} />
        </div>
    );
}

export default Dashboard;