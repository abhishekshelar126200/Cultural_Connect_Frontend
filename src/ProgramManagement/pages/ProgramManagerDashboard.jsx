import { useEffect, useState } from "react";
import { getAllPrograms, getAllApplications } from "../Services/programManager.api";
import { Pie } from "react-chartjs-2";
import "../../style/ManagerDashboard.css";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProgramManagerDashboard() {
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

  const chartData = {
    labels: ["Approved", "Rejected", "Pending"],
    datasets: [
      {
        data: [stats.approved, stats.rejected, stats.pending],
        backgroundColor: ["#10b981", "#ef4444", "#f59e0b"],
        borderWidth: 0,
        hoverOffset: 10,
      }
    ]
  };

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h2>Program Manager Dashboard</h2>
        <p>Welcome back! Here's what's happening today.</p>
      </header>

      {/* ✅ STATS CARDS */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Programs</span>
          <h3 className="stat-value">{stats.totalPrograms}</h3>
        </div>

        <div className="stat-card">
          <span className="stat-label">Total Applications</span>
          <h3 className="stat-value">{stats.totalApplications}</h3>
        </div>

        <div className="stat-card approved">
          <span className="stat-label">Approved</span>
          <h3 className="stat-value">{stats.approved}</h3>
        </div>

        <div className="stat-card rejected">
          <span className="stat-label">Rejected</span>
          <h3 className="stat-value">{stats.rejected}</h3>
        </div>
      </div>

      {/* ✅ CHART AREA */}
      {/* ✅ CHART AREA */}
<div className="content-grid">
  <div className="chart-container">
    <h5 className="chart-title">Application Distribution</h5>
    <div className="pie-wrapper">
      <Pie 
        data={chartData} 
        options={{
          responsive: true,
          maintainAspectRatio: true, // ✅ Keeps it from stretching
          plugins: {
            legend: { 
              position: 'bottom', 
              labels: { 
                usePointStyle: true, 
                padding: 20,
                font: { size: 12 }
              } 
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              padding: 12,
              cornerRadius: 8
            }
          }
        }} 
      />
    </div>
  </div>
</div>
    </div>
  );
}