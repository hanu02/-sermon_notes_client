import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import toast from 'react-hot-toast';

export default function SavedNotes() {
  // State to store the list of fetched notes
  const [notes, setNotes] = useState([]);
  
  // Hook to handle routing/redirection to individual note pages
  const navigate = useNavigate();

  // Fetch all notes from the backend when the component first loads
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get('/notes');
        setNotes(response.data); // Save the fetched notes into state
      } catch (err) {
      toast.error(err.response?.data?.message || 'Could not load notes');
      }
    };

    fetchNotes();
  }, []);

  // Function to handle deleting a specific note by ID
  const handleDelete = async (id) => {
    // Ask for user confirmation before deleting
    if (!window.confirm('Delete this sermon?')) return;
    
    try {
      // 1. Send DELETE request to the backend route
      await api.delete(`/notes/${id}`);
      
      // 2. Filter out the deleted note from the local state to update the screen instantly
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
       toast.error(err.response?.data?.message || 'Could not delete sermon');
    }
  };

 return (
    // Main container screen background and padding
    <div className="min-h-screen bg-gray-50 py-10 px-8">
      {/* 
        w-full: Stretches the list across the screen width
        mr-auto: Keeps everything aligned to the left side
      */}
      <div className="w-full mr-auto space-y-6">
        
        {/* Page Title */}
        <h2 className="text-3xl font-bold text-blue-600 text-left">Saved Sermons</h2>
        
        {/* Loop through each note in the notes array and display a card */}
        {notes.map((note) => (
          <div key={note._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 space-y-3">
            <h3 className="text-xl font-bold text-gray-800">{note.title}</h3>
            <p className="text-sm font-medium text-blue-600">{note.scriptureReferencing}</p>
            
            {/* Action buttons wrapper */}
            <div className="flex gap-3 pt-2">
              {/* Button to redirect to the dedicated ViewNote page using the note's unique ID */}
              <button 
                onClick={() => navigate(`/notes/${note._id}`)}
                className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-500 transition font-medium"
              >
                View
              </button>

              {/* Button to trigger the delete function */}
              <button 
                onClick={() => handleDelete(note._id)}
                className="bg-red-500 text-white px-4 py-1.5 rounded text-sm hover:bg-red-600 transition font-medium"
              >
                Delete
              </button>
              <button onClick={() => navigate('/notes')} className = "bg-blue-400 text-white px-4 py-1.5 ronded text-sm hover:bg-red-600 font-medium"> Return </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}