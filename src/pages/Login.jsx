import { useState } from "react";
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login(){
    // Creates state for the email input field, starting as an empty string
    const [email ,setEmail] =useState('')

    // Creates state for the password input field, starting as an empty string
    const[password,setPassword]= useState('')

    // Initializes the navigate hook so we can redirect the user to a different page after logging in
    const navigate = useNavigate()

    // Function that runs when the user submits the login form
    const handleSubmit  = async  (e) => {
        // Prevents the browser from reloading the page on form submission
        e.preventDefault();
        try{
            // 1. Send email and password to the backend login route, keep the answer in 'response'
            const response = await api.post ('/auth/login', {email, password})

            // 2. Save the response data (like tokens or user info) in browser localStorage as a JSON string under the key 'user'
            localStorage.setItem('user',JSON.stringify(response.data))

            // 3. Redirect the user to the '/notes' page upon successful login
            navigate('/notes');
        }
        catch(err){
            // If an error happens, show the backend's specific error message, or fallback to 'login failed'
            toast.error(err.response?.data?.message || 'login failed');
        }
    }
  return (
  <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-300 via-blue-500 to-blue-900 px-4">
    <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-center">

      {/* round user icon */}
      <div className="w-20 h-20 rounded-full bg-blue-900 flex items-center justify-center shadow-lg">
        <User className="w-10 h-10 text-white" />
      </div>

      <h2 className="mt-6 mb-10 text-2xl font-light tracking-[0.3em] text-white/90">
       Sermon Notes LOGIN
      </h2>

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
        LOGIN
      </button>

      <p className="mt-6 text-sm text-white/90">
        Don't have an account?{' '}
        <button type="button" onClick={() => navigate('/register')} className="font-semibold underline">
          Sign up
        </button>
      </p>
    </form>
  </div>
);
}