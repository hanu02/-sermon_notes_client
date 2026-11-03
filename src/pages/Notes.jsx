import { useState,useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
export default function Notes(){

    const navigate = useNavigate();
 const [notes, setNotes] = useState([]);
 const [title, setTitle] =useState('');
 const [scriptureReferencing, setScriptureReferencing] = useState('');
 const [content, setContent] = useState('');
 useEffect( () => {
    const fetchNotes = async () => {
        try{

            // 1. GET '/notes' and keep the answer in response
            const response = await api.get('/notes')
        // 2. put response.data into the notes state
        setNotes(response.data)
        }
        catch(err){
            toast.error(err.response?.data?.message|| 'Could not load notes')

        }
    }
    fetchNotes();
 }

  ,[])

  const handleLogout = () => {
  localStorage.removeItem('user');
  navigate('/login');
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // send the sermon to the backend
    const response = await api.post('/notes',{ title,scriptureReferencing,content})
    //new notes
    setNotes([response.data, ...notes])
    setTitle('');
    setScriptureReferencing('');
    setContent('');
  } catch (err) {
    
    toast.error(err.response?.data?.message || 'Could not save sermon');
  }
};
return (
    <div className="min-h-screen bg-gray-50 py-8 px-6 flex flex-col items-center">
      <div className="w-full max-w-3xl flex flex-col flex-1 space-y-6">
        
        {/* Header Bar (Title & Logout) */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-blue-900">My Sermons</h2>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/savednotes')} 
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
            >
              Saved Sermons
            </button>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium text-sm"
            >
              LOGOUT
            </button>
          </div>
        </div>

        {/* Form Card */}
        <form className="bg-white p-8 rounded-xl shadow-md flex flex-col gap-5 border border-gray-100" onSubmit={handleSubmit}>
          
          <h3 className="text-lg font-semibold text-gray-700">Create New Sermon</h3>

          {/* Sermon Title Input */}
          <input 
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Sermon title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Scripture Reference Input */}
          <input 
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Scripture (e.g. James 2:14-26)"
            value={scriptureReferencing}
            onChange={(e) => setScriptureReferencing(e.target.value)}
          />

          {/* Sermon Content Textarea */}
          <textarea 
            className="border border-gray-300 rounded-lg p-3 w-full min-h-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            placeholder="Type your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button 
            type="submit" 
            className="bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 transition font-semibold tracking-wide"
          >
            Save Sermon
          </button>
          
        </form>
      </div>
    </div>
  );
}