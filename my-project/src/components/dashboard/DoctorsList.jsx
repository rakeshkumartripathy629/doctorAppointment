import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const DoctorsList = () => {
  const { state } = useApp();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Doctors Overview</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Specialty</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {state.doctors.slice(0, 5).map(doctor => (
              <tr key={doctor.id} className="border-t">
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <img src={doctor.image} alt="" className="h-8 w-8 rounded-full mr-3" />
                    {doctor.name}
                  </div>
                </td>
                <td className="px-4 py-2">{doctor.specialty}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    doctor.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {doctor.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/doctors" className="text-blue-600 hover:text-blue-700 text-sm mt-4 inline-block">
          View all doctors →
        </Link>
      </div>
    </div>
  );
};

export default DoctorsList;
