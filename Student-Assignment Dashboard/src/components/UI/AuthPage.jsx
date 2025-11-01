import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from './Button';

// Simulated Icons remain the same...
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0H4.501Z" />
    </svg>
);
const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 1.5h10.5a2.25 2.25 0 0 0 2.25-2.25v-6A2.25 2.25 0 0 0 16.5 4.5h-9A2.25 2.25 0 0 0 4.5 6.75v6a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);

const EyeIcon = ({ toggle, visible }) => (
    <svg 
        onClick={toggle} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="w-5 h-5 text-gray-500 cursor-pointer hover:text-indigo-600 transition"
    >
        {visible ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.988 5.518A10.64 10.64 0 0 0 1.93 12c.573 3.125 3.255 5.518 6.786 5.518a10.64 10.64 0 0 0 3.864-.812m-3.864.812a10.64 10.64 0 0 1-3.864-.812M12 17.518c-3.111 0-5.642-2.393-6.195-5.518a10.64 10.64 0 0 1 6.195-5.518m0 11.036c3.111 0 5.642-2.393 6.195-5.518a10.64 10.64 0 0 1-6.195-5.518" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.323a1.5 1.5 0 0 1 0-.646C3.072 10.298 6.012 8.75 9 8.75s5.928 1.548 6.964 3.577a1.5 1.5 0 0 1 0 .646C14.928 14.352 11.988 15.8 9 15.8s5.928-1.548 6.964-3.577ZM9 14.25a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
        )}
    </svg>
);


export const AuthPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // 🔑 Get mode from URL: True if 'register', False if 'signin' or absent.
  const getInitialMode = () => searchParams.get('mode') === 'register';

  const [isRegistering, setIsRegistering] = useState(getInitialMode);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // 🔑 EFFECT: Update mode when URL search parameter changes
  React.useEffect(() => {
    setIsRegistering(getInitialMode());
  }, [searchParams]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!password) {
        setError('Password cannot be empty.');
        return;
    }
    
    if (isRegistering) {
        // --- REGISTER LOGIC ---
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (username.length < 3) {
             setError("Username must be at least 3 characters.");
            return;
        }
        
        // Simulate success and immediately transition to login view
        setSuccessMessage(`Registration for '${username}' successful! You can now use your registered username (with a test password) to log in.`);
        
        setIsRegistering(false); 
        setPassword('');
        setConfirmPassword('');
        
        return;
    }
    
    // --- LOGIN LOGIC ---
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

  const title = isRegistering ? "Create New Account" : "Welcome Back!";
  const subtitle = isRegistering ? "Start managing your assignments" : "Sign in to the Assignment Dashboard";

  const inputClass = (fieldError) => 
      `block w-full rounded-lg p-3 pl-12 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 border ${fieldError ? 'border-red-500' : 'border-gray-300'}`;
  
  const handleToggle = () => {
    // Manually push to the opposite mode to update the URL and trigger the useEffect hook
    const newMode = isRegistering ? 'signin' : 'register';
    navigate(`/login?mode=${newMode}`);
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="p-10 bg-white shadow-2xl rounded-2xl w-96 transform hover:scale-[1.02] transition duration-300 border-t-4 border-indigo-600">
        
        {/* Header Section */}
        <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-1">{title}</h1>
            <p className="text-gray-500">{subtitle}</p>
        </div>

        {/* Toggle Button */}
        <div className="mb-6 border-b pb-4">
            <Button 
                onClick={handleToggle} // Uses the navigate function to change URL
                className="w-full bg-gray-200 text-indigo-700 hover:bg-gray-300 font-bold py-3 text-sm shadow-md"
                variant="secondary"
            >
                {isRegistering ? "← Already have an account? Sign In" : "⭐ New User? Register Here"}
            </Button>
        </div>
        
        {/* Error/Success Messages */}
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4 text-sm" role="alert">
                {error}
            </div>
        )}

        {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4 text-sm" role="alert">
                {successMessage}
            </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Username Input (Same) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon />
                </div>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={inputClass(error)}
                    required
                />
            </div>
          </div>
          
          {/* Password Input (Same) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockIcon />
                </div>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass(error)}
                    required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <EyeIcon toggle={() => setShowPassword(!showPassword)} visible={showPassword} />
                </div>
            </div>
          </div>

          {/* Confirm Password (Registration only) */}
          {isRegistering && (
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <LockIcon />
                      </div>
                      <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Re-enter password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={inputClass(error)}
                          required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <EyeIcon toggle={() => setShowPassword(!showPassword)} visible={showPassword} />
                      </div>
                  </div>
              </div>
          )}
          
          {/* Submit Button */}
          <Button 
            type="submit" 
            className={`w-full font-extrabold py-3 text-lg shadow-md ${isRegistering ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
          >
            {isRegistering ? "Register Account" : "Authenticate & Proceed"}
          </Button>
        </form>
        
        <p className="mt-6 text-center text-xs text-gray-400">
            **Login Test Users:** `admin`, `student1`, `student2`, `student3`
        </p>
      </div>
    </div>
  );
};