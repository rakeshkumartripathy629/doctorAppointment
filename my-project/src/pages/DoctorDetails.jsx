import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Calendar, Clock, Award, DollarSign, Mail, Phone } from 'lucide-react';

export const DoctorDetails = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { state } = useApp();
  
  const doctor = state.doctors.find(d => d.id === doctorId);

  if (!doctor) {
    return <div className="container mx-auto px-6 py-8">Doctor not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:w-48"
                src={doctor.image}
                alt={doctor.name}
              />
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">{doctor.name}</h2>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  doctor.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {doctor.status}
                </span>
              </div>
              <p className="mt-2 text-lg text-blue-600">{doctor.specialty}</p>
              
              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{doctor.experience} years experience</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                  <span>${doctor.fee} per visit</span>
                </div>
              </div>

              <p className="mt-4 text-gray-600">{doctor.bio}</p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{doctor.contact.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{doctor.contact.phone}</span>
                </div>
              </div>

              <button
                onClick={() => navigate(`/doctors/${doctor.id}/appointment`)}
                className="mt-8 flex items-center justify-center w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
