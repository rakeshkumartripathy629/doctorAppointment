import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import DoctorCard from '../components/DoctorCard';
import { Search } from 'lucide-react';
import FeaturedSpecialties from '../components/home/FeaturedSpecialties';
import HowItWorks from '../components/home/HowItWorks';

export const Home = () => {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = state.doctors
    .filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 6); // Show only 6 doctors on homepage

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Hero Section with Grid Background */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 w-full flex items-center justify-center">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        ></div>
        <div className="container mx-auto px-6 relative text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-2xl mx-auto">
            Your Health, Our Priority: Find the Right Doctor Today
          </h1>
          <p className="text-xl mb-8 text-blue-100 max-w-xl mx-auto">
            Connect with top healthcare professionals and book appointments with ease
          </p>
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by doctor name or specialty..."
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Featured Specialties */}
      <FeaturedSpecialties />

      {/* Featured Doctors */}
      <section className="py-16 bg-white w-full">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Doctors</h2>
            <a href="/doctors" className="text-blue-600 hover:text-blue-700">
              View All Doctors →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map(doctor => (
              <DoctorCard key={doctor.id} {...doctor} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
