import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button'; 

export const SignUp = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="p-10 bg-white shadow-2xl rounded-2xl w-96 border-t-4 border-yellow-500 text-center">
        
        {/* Header Section */}
        <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-yellow-600 mb-1">
                New User Sign-Up
            </h1>
            <p className="text-gray-500">Registration</p>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mb-6">
            <p className="text-lg font-semibold text-gray-800 mb-2">
                Registration is Disabled.
            </p>
            <p className="text-sm text-gray-600">
                In this demo environment, new users cannot be created. 
                Please use one of the existing **test usernames** below to log in.
            </p>
        </div>
        
        <div className="space-y-4">
            <Link to="/login">
                <Button 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3 text-lg shadow-md"
                >
                    ← Go to Login Page
                </Button>
            </Link>
            
            <p className="mt-4 text-xs text-gray-400">
                Test Users: `student1`, `student2`, `student3`
            </p>
        </div>
      </div>
    </div>
  );
};