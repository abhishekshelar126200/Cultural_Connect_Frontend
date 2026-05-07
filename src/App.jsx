import { useState } from 'react'

import './App.css'

import { Routes, Route } from 'react-router-dom';
import CitizenRoutes from './Routes/CitizenRoutes';
import CitizenHome from './CitizenManagement/pages/CitizenHome';
import CitizenDashboard from './CitizenManagement/pages/CitizenDashboard'
import MyGrants from './CitizenManagement/pages/MyGrants';
import MyEvents from './CitizenManagement/pages/MyEvents';
import Notifications from './CitizenManagement/pages/Notifications';
import Register from './Auth/pages/CitizenLoginAndRegistration/Register';
import Login from './Auth/pages/CitizenLoginAndRegistration/Login';

function App() {
  return <>
    <Routes>

      <Route path="/citizen" element={<CitizenRoutes />}>
        <Route index element={<CitizenHome />} />
        <Route path="dashboard" element={<CitizenDashboard />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        <Route path="grants" element={<MyGrants />} />
        <Route path="events" element={<MyEvents />} />
        <Route path="notifications" element={<Notifications />} />

      </Route>

    </Routes>
  </>;
}

export default App
