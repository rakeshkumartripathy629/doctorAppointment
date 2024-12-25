import React from 'react';
import { useApp } from '../../context/AppContext';
import { format } from 'date-fns';

const AppointmentsList = () => {
  const { state } = useApp();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Patient</th>
              <th className="px-4 py-2 text-left">Doctor</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {state.appointments.map(appointment => {
              const doctor = state.doctors.find(d => d.id === appointment.doctorId);
              return (
                <tr key={appointment.id} className="border-t">
                  <td className="px-4 py-2">{appointment.patientName}</td>
                  <td className="px-4 py-2">{doctor?.name}</td>
                  <td className="px-4 py-2">
                    {format(new Date(appointment.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        appointment.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : appointment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsList;
