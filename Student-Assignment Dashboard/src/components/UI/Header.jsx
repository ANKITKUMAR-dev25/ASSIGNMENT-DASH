import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from './Button';

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-gray-900 text-white p-4 shadow-xl flex justify-between items-center sticky top-0 z-50 border-b-4 border-indigo-500">
      <Link to="/" className="text-2xl font-extrabold tracking-widest text-indigo-300 hover:text-white transition duration-300">
        🚀 ASSIGNMENT DASH
      </Link>
      <nav>
        {isAuthenticated ? (
          // --- LOGGED IN VIEW (Same) ---
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Welcome, **{user.username}**</span>
            
            {user.role === 'admin' ? (
                <Link to="/admin" className="text-sm text-indigo-300 hover:text-white hidden sm:block">Dashboard</Link>
            ) : (
                <Link to="/student" className="text-sm text-indigo-300 hover:text-white hidden sm:block">Assignments</Link>
            )}

            <Button onClick={logout} variant="danger" className="py-1 px-3">
              Logout
            </Button>
          </div>
        ) : (
          // --- LOGGED OUT VIEW (Login and Register) ---
          <div className="flex space-x-3">
            
            {/* 1. LOGIN Button */}
            <Link to="/login?mode=signin"> 
              <Button 
                  variant="secondary" 
                  className="bg-indigo-600 text-white hover:bg-indigo-700 py-2 px-4 shadow-lg font-semibold"
              >
                Login
              </Button>
            </Link>

            {/* 2. REGISTER Button (New Link: Explicitly sets mode=register) */}
            <Link to="/login?mode=register"> 
              <Button 
                  variant="secondary" 
                  className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 py-2 px-4 shadow-lg font-semibold"
              >
                Register
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};