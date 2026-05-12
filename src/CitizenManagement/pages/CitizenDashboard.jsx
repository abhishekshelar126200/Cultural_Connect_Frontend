import React, { useState, useEffect } from "react";
import { getPrograms } from "../citizen.api";
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


    useEffect(() => {
        loadPrograms();
    }, []);

    // ✅ Stats derived from backend response
    const appliedPrograms = programs.length;

    const approvedGrants = 0
    // programs.reduce(
    //     (sum, program) => sum + program.grantIds.length,
    //     0
    // );

    const upcomingEvents = 0
    // programs.reduce(
    //     (sum, program) => sum + program.eventIds.length,
    //     0
    // );

    const notifications =
        appliedPrograms + approvedGrants + upcomingEvents;

    return (
        <div className="container my-4">

            {/* -------- DASHBOARD STATS (UNCHANGED UI) -------- */}
            <ProgramStats programStats={{
                appliedPrograms,
                approvedGrants,
                upcomingEvents,
                notifications
            }} />

            {/* -------- PROGRAM LIST SECTION (NEW) -------- */}
            <ProgramList programs={programs} />

        </div>
    );
}

export default Dashboard;