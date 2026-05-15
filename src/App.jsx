import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
 

// ✅ Existing imports (unchanged)
import CitizenRoutes from './Routes/CitizenRoutes';
import CitizenDashboard from './CitizenManagement/pages/CitizenDashboard';
import MyEvents from './CitizenManagement/pages/MyEvents';
import Notifications from './CitizenManagement/pages/Notifications';
 
import Register from './Auth/pages/CitizenLoginAndRegistration/Register';
import Login from './Auth/pages/CitizenLoginAndRegistration/Login';
 
import AdminRoutes from './Routes/AdminRoutes';
import AdminDashboard from './Admin/pages/AdminDashboard';
 
import ComplianceAndAuditDashboard from './ComplianceAndAudit/pages/ComplianceAndAuditDashboard';
import ComplianceAndAuditRoutes from './Routes/ComplianceAndAuditRoutes';
 
import CulturalOfficerRoutes from './Routes/CulturalOfficerRoutes';
 
import ProgramManagerRoutes from './Routes/ProgramManagerRoutes';
import ProgramManagerDashboard from './ProgramManagement/pages/ProgramManagerDashboard';
 
import AuditorDashboard from './ComplianceAndAudit/pages/AuditorDashboard';
 
import HomePageRoutes from './Routes/HomePageRoutes';
 
import HeritageDashboard from './HeritageManagement/pages/HeritageDashboard';
import CreateHeritageSite from './HeritageManagement/pages/CreateHeritageSite';
import HeritageSiteDetails from './HeritageManagement/pages/HeritageSiteDetails';
import OfficerDashboard from './ProgramManagement/pages/OfficerDashboard';
import ProgramManagerPrograms from './ProgramManagement/pages/ProgramManagerPrograms';
import CreateProgram from './ProgramManagement/components/CreateProgram';
import CreateEvent from './EventAndResourceManagement/pages/CreateEvent';
import EventDashboard from './EventAndResourceManagement/pages/EventDashboard';
import ResourceDashboard from './EventAndResourceManagement/pages/ResourceDashboard';
import CreateResource from './EventAndResourceManagement/pages/CreateResource';
import EditEvent from './EventAndResourceManagement/pages/EditEvent';
import EditResource from './EventAndResourceManagement/pages/EditResource';
import CompliancePrograms from './ComplianceAndAudit/pages/CompliancePrograms';
import AuditorFeedback from './ComplianceAndAudit/pages/AuditorFeedback';
import AuditRoutes from './Routes/AuditRoutes';
import CitizenPrograms from './CitizenManagement/components/CitizenPrograms';
import ProgramDetails from './CitizenManagement/components/ProgramDetails';
import CitizenApplications from './CitizenManagement/pages/CitizenApplications';
import OfficerCitizens from './ProgramManagement/pages/OfficerCitizens';
import ProgramApplications from './ProgramManagement/pages/ProgramApplications';
import MyGrants from './ProgramManagement/pages/MyGrants';
import ProgramDetail from './ComplianceAndAudit/pages/ProgramDetails';
export default function App() {
  return (
    <>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
 
        {/* Home */}
        <Route path="/" element={<HomePageRoutes />} />
 
        {/* Citizen */}
        <Route path="/citizen" element={<CitizenRoutes />}>
          <Route path="dashboard" element={<CitizenDashboard />} />
          <Route path="programs" element={<CitizenPrograms />} />
          <Route path="program/:id" element={<ProgramDetails />} />
          <Route path="applications" element={<CitizenApplications />} />
          <Route path="grants" element={<MyGrants />} />
          <Route path="events" element={<MyEvents />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
 
        {/* Admin */}
        <Route path="/admin" element={<AdminRoutes />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          
        </Route>
 
        {/* Compliance & Audit */}
        <Route path="/compliance-audit" element={<ComplianceAndAuditRoutes />}>
          <Route path='new-programs' element={<ComplianceAndAuditDashboard />} />
          <Route path='compliance-programs' element={<CompliancePrograms />} />
          <Route path='auditorfeedback' element={<AuditorFeedback />} />
 
        </Route>
 
        <Route path="/audit" element={<AuditRoutes />}>
          <Route path='auditordashboard' element={<AuditorDashboard />} />
          <Route path='programDetails/:complianceId/:programId' element={<ProgramDetail />} />
        </Route>
 
        {/* Program Manager */}
       {/* Program Manager */}
<Route path="/programmanager" element={<ProgramManagerRoutes />}>
  <Route path="dashboard" element={<ProgramManagerDashboard />} />
  <Route path="programs" element={<ProgramManagerPrograms />} />
 
  {/* ✅ ADD THIS (IMPORTANT) */}
  <Route path="applications" element={<ProgramApplications />} />
 
  <Route path="create" element={<CreateProgram />} />
 
  {/* Events Drill-down */}
  <Route path="programEvents/:programId" element={<EventDashboard />} />
  <Route path="createEvent/:programId" element={<CreateEvent />} />
 
  {/* Resources Drill-down */}
  <Route path="eventResources/:programId/:eventId" element={<ResourceDashboard />} />
  <Route path="createResource/:programId/:eventId" element={<CreateResource />} />
  <Route path="editEvent/:programId/:eventId" element={<EditEvent />} />
  <Route path="editResource/:programId/:eventId/:resourceId" element={<EditResource />} />
</Route>
 
        {/* Cultural Officer */}
        <Route path="/culturalofficer" element={<CulturalOfficerRoutes />}>
          <Route path="dashboard" element={<OfficerDashboard />} />
          <Route path="citizens" element={<OfficerCitizens />} />
          <Route path="heritage" element={<HeritageDashboard />} />
          <Route path="createHeritageSite" element={<CreateHeritageSite />} />
          <Route path="heritageSiteDetails/:siteId" element={<HeritageSiteDetails />} />
          <Route path="officerdashboard" element={<OfficerDashboard />} />
        </Route>
      </Routes>
    </>
  );
}
 