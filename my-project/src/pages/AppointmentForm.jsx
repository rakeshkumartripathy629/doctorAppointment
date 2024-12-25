import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { generateAppointmentPDF } from '../utils/pdfGenerator';
import { format } from 'date-fns';
import { Calendar, Clock, User, Mail, Phone } from 'lucide-react';

export const AppointmentForm = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const doctor = state.doctors.find(d => d.id === doctorId);

  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    date: '',
    time: ''
  });

  if (!doctor) {
    return <div className="container mx-auto px-6 py-8">Doctor not found</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const appointment = {
      id: crypto.randomUUID(),
      doctorId: doctor.id,
      status: 'pending',
      ...formData
    };

    dispatch({ type: 'ADD_APPOINTMENT', payload: appointment });
    generateAppointmentPDF(appointment, doctor);
    navigate('/appointment-success');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Appointment with {doctor.name}</h2>
          
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold text-gray-800">{doctor.specialty}</span>
              <span className="text-blue-600 font-semibold">${doctor.fee}</span>
            </div>
            <p className="text-gray-600">{doctor.bio}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2" />
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                value={formData.patientName}
                onChange={e => setFormData({...formData, patientName: e.target.value})}
              />
            </div>

            <div>
              <label className="flex items-center text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </label>
              <input
                type="email"
                required
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                value={formData.patientEmail}
                onChange={e => setFormData({...formData, patientEmail: e.target.value})}
              />
            </div>

            <div>
              <label className="flex items-center text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                required
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                value={formData.patientPhone}
                onChange={e => setFormData({...formData, patientPhone: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date
                </label>
                <input
                  type="date"
                  required
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div>
                <label className="flex items-center text-gray-700 mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  Time
                </label>
                <input
                  type="time"
                  required
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
