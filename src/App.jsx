import { useState } from 'react'

import './App.css'

import { Routes, Route } from 'react-router-dom';
import CitizenRoutes from './Routes/CitizenRoutes';
import CitizenDashboard from './CitizenManagement/pages/CitizenDashboard'
import MyGrants from './CitizenManagement/pages/MyGrants';
import MyEvents from './CitizenManagement/pages/MyEvents';
import Notifications from './CitizenManagement/pages/Notifications';
import Register from './Auth/pages/CitizenLoginAndRegistration/Register';
import Login from './Auth/pages/CitizenLoginAndRegistration/Login';
import AdminRoutes from './Routes/AdminRoutes';
import AdminDashboard from './Admin/pages/AdminDashboard';
import ComplianceAndAuditDashboard from './ComplianceAndAudit/pages/ComplianceAndAuditDashboard';
import ComplianceAndAuditRoutes from './Routes/ComplianceAndAuditRoutes';
import CulturalOfficerRoutes from './Routes/CulturalOfficerRoutes';
import CulturalOfficerDashboard from './ProgramManagement/pages/CulturalOfficerDashboard';
import ProgramManagerRoutes from './Routes/ProgramManagerRoutes';
import ProgramManagerDashboard from './ProgramManagement/pages/ProgramManagerDashboard';
import AuditorRoutes from './Routes/AuditorRoutes';
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

function App() {
  return <>
    <Routes>


      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<HomePageRoutes />} />
      <Route path="/citizen" element={<CitizenRoutes />}>
        <Route path="dashboard" element={<CitizenDashboard />} />

        <Route path="grants" element={<MyGrants />} />
        <Route path="events" element={<MyEvents />} />
        <Route path="notifications" element={<Notifications />} />

      </Route>

      <Route path="/admin" element={<AdminRoutes />}>
        <Route path="dashboard" element={<AdminDashboard />} />


        {/* <Route path="grants" element={<MyGrants />} />
        <Route path="events" element={<MyEvents />} />
        <Route path="notifications" element={<Notifications />} /> */}

      </Route>

      <Route path="/compliance-audit" element={<ComplianceAndAuditRoutes />}>
        <Route path="dashboard" element={<ComplianceAndAuditDashboard />} />
        Username

        {/* <Route path="grants" element={<MyGrants />} />
        <Route path="events" element={<MyEvents />} />
        <Route path="notifications" element={<Notifications />} /> */}

      </Route>

      <Route path="/culturalofficer" element={<CulturalOfficerRoutes />}>
        <Route path="dashboard" element={<OfficerDashboard />} />
        <Route path="heritage" element={<HeritageDashboard />} />
        <Route path="createHeritageSite" element={<CreateHeritageSite />} />
        <Route path="heritageSiteDetails/:siteId" element={<HeritageSiteDetails />} />
        <Route path="officerdashboard" element={<OfficerDashboard />} />


        {/* <Route path="grants" element={<MyGrants />} />
        <Route path="events" element={<MyEvents />} />
        <Route path="notifications" element={<Notifications />} /> */}

      </Route>

      // Combine into ONE block in App.js
<Route path="/programmanager" element={<ProgramManagerRoutes />}>
    <Route path="dashboard" element={<ProgramManagerDashboard />} />
    <Route path="programs" element={<ProgramManagerPrograms />} />
    <Route path="create" element={<CreateProgram />} />
    
    {/* Events Drill-down */}
    <Route path="programEvents/:programId" element={<EventDashboard />} />
    <Route path="createEvent/:programId" element={<CreateEvent />} />
    
    {/* Resources Drill-down (Linked to Event) */}
    {/* Make sure these match the Links in your EventList */}
    <Route path="eventResources/:programId/:eventId" element={<ResourceDashboard />} />
    <Route path="createResource/:programId/:eventId" element={<CreateResource />} />
</Route>

      <Route path="/auditor" element={<AuditorRoutes />}>
        <Route path="dashboard" element={<AuditorDashboard />} />

        {/* <Route path="grants" element={<MyGrants />} />
        <Route path="events" element={<MyEvents />} />
        <Route path="notifications" element={<Notifications />} /> */}

      </Route>

    </Routes>
  </>;
}

export default App
