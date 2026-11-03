import { useState } from "react";
import api from "../api";
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Register() {
    // State to manage the name input value
    const [name, setName] = useState('');
    // State to manage the email input value
    const [email, setEmail] = useState('');
    // State to manage the password input value
    const [password, setPassword] = useState('');
    // Hook to handle programmatic navigation between routes
    const navigate = useNavigate();

    // Function called when the register form is submitted
    const handleSubmit = async (e) => {
        // Prevent default form page reload behavior
        e.preventDefault();
        try {
            // Send registration data to the backend API endpoint
            await api.post('/auth/register', { name, email, password });
            // Redirect user to the login page upon successful registration
            navigate('/login');
        } catch (err) {
            // Show error message from backend or fallback message
            toast.error(err.response?.data?.message || 'Registration failed');
        }
    };

   return (
  <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-300 via-blue-500 to-blue-900 px-4">
    <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-center">

      {/* round user icon */}
      <div className="w-20 h-20 rounded-full bg-blue-900 flex items-center justify-center shadow-lg">
        <User className="w-10 h-10 text-white" />
      </div>

      <h2 className="mt-6 mb-10 text-2xl font-light tracking-[0.3em] text-white/90">
        QUICKNOTES REGISTER
      </h2>

      {/* Name (Optional: add if your register form takes a name) */}
      <div className="w-full flex items-center gap-3 border-b border-white/70 pb-2 mb-6">
        <User className="w-5 h-5 text-white" />
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-transparent text-white placeholder:text-white/80 focus:outline-none"
        />
      </div>

      {/* email */}
      <div className="w-full flex items-center gap-3 border-b border-white/70 pb-2 mb-6">
        <Mail className="w-5 h-5 text-white" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent text-white placeholder:text-white/80 focus:outline-none"
        />
      </div>

      {/* password */}
      <div className="w-full flex items-center gap-3 border-b border-white/70 pb-2">
        <Lock className="w-5 h-5 text-white" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-transparent text-white placeholder:text-white/80 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full mt-10 bg-blue-900 hover:bg-blue-950 text-white font-semibold tracking-widest py-3 transition"
      >
        SIGN UP
      </button>

      <p className="mt-6 text-sm text-white/90">
        Already have an account?{' '}
        <button type="button" onClick={() => navigate('/login')} className="font-semibold underline">
          Log in
        </button>
      </p>
    </form>
  </div>
);
}