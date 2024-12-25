import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import  Header  from './components/Header';
import  Footer  from './components/Footer';
import { Home } from './pages/Home';
import { Doctors } from './pages/Doctors';
import { DoctorDetails } from './pages/DoctorDetails';
import { AppointmentForm } from './pages/AppointmentForm';
import { AppointmentSuccess } from './pages/AppointmentSuccess';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { DoctorForm } from './pages/admin/DoctorFormData';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/doctors/:doctorId" element={<DoctorDetails />} />
              <Route path="/doctors/:doctorId/appointment" element={<AppointmentForm />} />
              <Route path="/appointment-success" element={<AppointmentSuccess />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/doctors/new" element={<DoctorForm />} />
              <Route path="/admin/doctors/:doctorId/edit" element={<DoctorForm />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
