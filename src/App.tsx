import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components/auth/PrivateRoute';
import Layout from './components/Layout';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { ResetPassword } from './components/auth/ResetPassword';
import Dashboard from './components/Dashboard';
import PersonaBuilder from './components/personas/PersonaBuilder';
import CreatePersona from './components/personas/CreatePersona';
import EditPersona from './components/personas/EditPersona';
import JourneyList from './components/journeys/list/JourneyList';
import JourneyBuilder from './components/journeys/builder/JourneyBuilder';
import Analytics from './components/Analytics';
import Profile from './components/settings/Profile';

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route path="/" element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="personas" element={<PersonaBuilder />} />
        <Route path="personas/create" element={<CreatePersona />} />
        <Route path="personas/edit/:id" element={<EditPersona />} />
        <Route path="journeys" element={<JourneyList />} />
        <Route path="journeys/new" element={<JourneyBuilder />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}