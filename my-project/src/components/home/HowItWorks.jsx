import React from 'react';
import { Search, Calendar, FileCheck } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Find Your Doctor',
    description: 'Search through our extensive network of qualified healthcare professionals.'
  },
  {
    icon: Calendar,
    title: 'Book Appointment',
    description: 'Choose a convenient time slot and book your appointment instantly.'
  },
  {
    icon: FileCheck,
    title: 'Get Confirmation',
    description: 'Receive instant confirmation and appointment details via email.'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-6 relative">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Icon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="relative">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-0.5 bg-gray-300"></div>
                  </div>
                )}
              </div>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
