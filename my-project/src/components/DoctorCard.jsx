import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, DollarSign, Award } from 'lucide-react';

const DoctorCard = ({ id, name, specialty, experience, fee, status, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {status}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{specialty}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Award className="h-4 w-4 mr-1" />
            <span>{experience} years</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>${fee}</span>
          </div>
        </div>
        <Link
          to={`/doctors/${id}`}
          className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
