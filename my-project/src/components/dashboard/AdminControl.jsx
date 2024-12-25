import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Settings, FileText } from 'lucide-react';

const AdminControls = () => {
  const navigate = useNavigate();

  const adminActions = [
    {
      title: 'Add New Doctor',
      description: 'Register a new healthcare professional',
      icon: UserPlus,
      action: () => navigate('/admin/doctors/new'),
      color: 'blue',
    },
    {
      title: 'Manage Doctors',
      description: 'Edit or update doctor profiles',
      icon: Settings,
      action: () => navigate('/admin'),
      color: 'purple',
    },
    {
      title: 'View Reports',
      description: 'Access appointment statistics',
      icon: FileText,
      action: () => navigate('/admin/reports'),
      color: 'green',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {adminActions.map(({ title, description, icon: Icon, action, color }) => (
        <button
          key={title}
          onClick={action}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
        >
          <Icon className={`h-8 w-8 text-${color}-500 mb-3`} />
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </button>
      ))}
    </div>
  );
};

export default AdminControls;
