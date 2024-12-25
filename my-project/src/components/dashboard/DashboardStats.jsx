// import React from 'react';
// import { useApp } from '../../context/AppContext';
// import { Users, Calendar, UserCheck, Clock } from 'lucide-react';

// const DashboardStats = () => {
//   const { state } = useApp();

//   const stats = [
//     {
//       title: 'Total Doctors',
//       value: state.doctors.length,
//       icon: Users,
//       color: 'blue'
//     },
//     {
//       title: 'Active Doctors',
//       value: state.doctors.filter(d => d.status === 'active').length,
//       icon: UserCheck,
//       color: 'green'
//     },
//     {
//       title: 'Total Appointments',
//       value: state.appointments.length,
//       icon: Calendar,
//       color: 'purple'
//     },
//     {
//       title: 'Pending Appointments',
//       value: state.appointments.filter(a => a.status === 'pending').length,
//       icon: Clock,
//       color: 'yellow'
//     }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {stats.map(({ title, value, icon: Icon, color }) => (
//         <div key={title} className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">{title}</p>
//               <h3 className="text-2xl font-bold mt-1">{value}</h3>
//             </div>
//             <Icon className={`h-8 w-8 text-${color}-500`} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DashboardStats;


import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Calendar, UserCheck, Clock, Trash2 } from 'lucide-react';

const DashboardStats = () => {
  const { state, dispatch } = useApp();

  const stats = [
    {
      title: 'Total Doctors',
      value: state.doctors.length,
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Active Doctors',
      value: state.doctors.filter((d) => d.status === 'active').length,
      icon: UserCheck,
      color: 'green',
    },
    {
      title: 'Total Appointments',
      value: state.appointments.length,
      icon: Calendar,
      color: 'purple',
    },
    {
      title: 'Pending Appointments',
      value: state.appointments.filter((a) => a.status === 'pending').length,
      icon: Clock,
      color: 'yellow',
    },
  ];

  const handleDeleteAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      dispatch({ type: 'DELETE_APPOINTMENT', payload: appointmentId });
    }
  };

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(({ title, value, icon: Icon, color }) => (
          <div key={title} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <h3 className="text-2xl font-bold mt-1">{value}</h3>
              </div>
              <Icon className={`h-8 w-8 text-${color}-500`} />
            </div>
          </div>
        ))}
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Manage Appointments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {state.appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appointment.patientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appointment.doctorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : appointment.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className="text-red-600 hover:text-red-900 flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
