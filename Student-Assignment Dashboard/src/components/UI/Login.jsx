import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // <-- Import Link
import { useAuth } from '../../contexts/AuthContext';
import { Button } from './Button';

// Simulated Icons remain the same...

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!password) {
        setError('Password cannot be empty.');
        return;
    }
    
    const userRole = login(username);
    
    if (userRole) {
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    } else {
      setError('Invalid username or password. Check spelling.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="p-10 bg-white shadow-2xl rounded-2xl w-96 transform hover:scale-[1.02] transition duration-300 border-t-4 border-indigo-600">
        
        <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-1">
                Welcome Back!
            </h1>
            <p className="text-gray-500">Sign in to the Assignment Dashboard</p>
        </div>

        {/* --- NEW LINK TO SIGN UP PAGE --- */}
        <div className="mb-6 border-b pb-4">
            <Link to="/signup">
                <Button 
                    className="w-full bg-yellow-400 text-gray-800 hover:bg-yellow-500 font-bold py-3 text-sm shadow-md"
                    variant="secondary"
                >
                    ⭐ New Student? Register Here
                </Button>
            </Link>
            <p className="text-center text-xs text-gray-400 mt-2">
                Use an existing username to log in below.
            </p>
        </div>
        
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4 text-sm" role="alert">
                {error}
            </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {/* UserIcon remains the same */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0H4.501Z" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="e.g., admin or student1"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full border-gray-300 rounded-lg p-3 pl-12 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 border"
                    required
                />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {/* LockIcon remains the same */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 1.5h10.5a2.25 2.25 0 0 0 2.25-2.25v-6A2.25 2.25 0 0 0 16.5 4.5h-9A2.25 2.25 0 0 0 4.5 6.75v6a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                </div>
                <input
                    type="password"
                    placeholder="Enter any password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full border-gray-300 rounded-lg p-3 pl-12 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 border"
                    required
                />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3 text-lg shadow-md"
          >
            Authenticate & Proceed
          </Button>
        </form>
        
        <p className="mt-6 text-center text-xs text-gray-400">
            **Test Users:** `admin`, `student1`, `student2`, `student3` (Password: any value)
        </p>
      </div>
    </div>
  );
};