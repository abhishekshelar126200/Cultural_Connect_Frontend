import { useEffect, useState } from "react";
import { getAllPrograms, getAllApplications } from "../Services/programManager.api";
import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProgramManagerDashboard() {

  const [programs, setPrograms] = useState([]);
  const [applications, setApplications] = useState([]);

  const [stats, setStats] = useState({
    totalPrograms: 0,
    totalApplications: 0,
    approved: 0,
    rejected: 0,
    pending: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    const programRes = await getAllPrograms();
    const appRes = await getAllApplications();

    setPrograms(programRes.data);
    setApplications(appRes.data);

    const approved = appRes.data.filter(a => a.status === "APPROVED").length;
    const rejected = appRes.data.filter(a => a.status === "REJECTED").length;
    const pending = appRes.data.filter(a => a.status === "PENDING").length;

    setStats({
      totalPrograms: programRes.data.length,
      totalApplications: appRes.data.length,
      approved,
      rejected,
      pending
    });
  };

  // ✅ PIE CHART DATA
  const chartData = {
    labels: ["Approved", "Rejected", "Pending"],
    datasets: [
      {
        data: [stats.approved, stats.rejected, stats.pending],
        backgroundColor: ["#28a745", "#dc3545", "#ffc107"]
      }
    ]
  };

  return (
    <div className="container mt-4">

      <h3 className="mb-4">Program Manager Dashboard</h3>

      {/* ✅ STATS CARDS */}
      <div className="row">

        <div className="col-md-3">
          <div className="card text-center shadow p-3">
            <h6>Total Programs</h6>
            <h3>{stats.totalPrograms}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow p-3">
            <h6>Total Applications</h6>
            <h3>{stats.totalApplications}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow p-3 bg-success text-white">
            <h6>Approved</h6>
            <h3>{stats.approved}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow p-3 bg-danger text-white">
            <h6>Rejected</h6>
            <h3>{stats.rejected}</h3>
          </div>
        </div>

      </div>

      {/* ✅ CHART */}
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <div className="card p-3 shadow">
            <h5 className="text-center mb-3">Application Status</h5>
            <Pie data={chartData} />
          </div>
        </div>
      </div>

    </div>
  );
}