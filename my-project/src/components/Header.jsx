import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Stethoscope, UserCog, LayoutDashboard, Search } from 'lucide-react';

const Header = () => {
  const { state, dispatch } = useApp();

  const toggleAdmin = () => {
    dispatch({ type: 'SET_ADMIN_MODE', payload: !state.isAdmin });
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">MedBook</span>
          </Link>
        </div>

        {/* Center Section */}
        <div className="flex-grow flex justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search doctors, appointments..."
              className="w-full px-4 py-2 border rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute top-2 right-2 text-gray-500 hover:text-blue-600">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link to="/doctors" className="text-gray-600 hover:text-blue-600">
            Doctors
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <button
            onClick={toggleAdmin}
            className="flex items-center space-x-1 text-blue-600"
          >
            <UserCog className="h-5 w-5" />
            <span>{state.isAdmin ? 'Exit Admin' : 'Admin Mode'}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
