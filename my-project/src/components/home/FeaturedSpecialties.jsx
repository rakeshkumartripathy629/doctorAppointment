import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Brain, Baby, Bone, Eye, Activity } from 'lucide-react';

const specialties = [
  { icon: Heart, name: 'Cardiology', count: 12 },
  { icon: Brain, name: 'Neurology', count: 8 },
  { icon: Baby, name: 'Pediatrics', count: 15 },
  { icon: Bone, name: 'Orthopedics', count: 10 },
  { icon: Eye, name: 'Ophthalmology', count: 6 },
  { icon: Activity, name: 'General Medicine', count: 20 },
];

const FeaturedSpecialties = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Specialties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialties.map(({ icon: Icon, name, count }) => (
            <Link
              key={name}
              to={`/doctors?specialty=${name}`}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                  <p className="text-gray-600">{count} Specialists</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSpecialties;
