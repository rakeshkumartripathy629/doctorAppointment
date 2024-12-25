// src/pages/Dashboard.jsx
import React from 'react';
import {useApp} from '../context/AppContext';  // Default import
import DashboardStats from '../components/dashboard/DashboardStats';
import AppointmentsList from '../components/dashboard/AppointmentsList';
import DoctorsList from '../components/dashboard/DoctorsList';
import AdminControls from '../components/dashboard/AdminControl';

export const Dashboard = () => {
  const { state } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
        
        <DashboardStats />
        
        {state.isAdmin ? (
          <AdminControls />
        ) : null}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <AppointmentsList />
          <DoctorsList />
        </div>
      </div>
    </div>
  );
};
