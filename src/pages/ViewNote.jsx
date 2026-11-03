import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import toast from 'react-hot-toast';

export default function ViewNote() {
  // 1. get the id from the address
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 2. state for ONE note, starting as null
  const [note, setNote] = useState(null);
  const [title,setTitle] = useState('')
  const [scriptureReferencing,setScriptureReferencing]= useState('')
  const[content, setContent] = useState('')
  useEffect(() => {
    const fetchNote = async () => {
      try {
        // 3. GET this one note and keep the answer in response
        const response = await api.get(`/notes/${id}`);
        
        // 4. put response.data into the note state
     
        setNote(response.data);
        setContent(response.data.content || '');         // <-- This fills the textarea
        setTitle(response.data.title || '')
        setScriptureReferencing(response.data.setScriptureReferencing || '')
      } catch (err) {
         toast.error(err.response?.data?.message || 'Could not open sermon');
      }
    };
    fetchNote();
  }, [id]);
  const handleSave = async (e) => {
    e.preventDefault()
    try{
// 1. send PUT to '/notes/:id' with the three fields, keep the answer in response
 const response = await api.put(`/notes/${id}`, {  content ,title,scriptureReferencing});
    // 2. put response.data into the note state
    setNote(response.data)
    // 3. tell the user it saved
    toast.success('saved')
    }
    catch(err){
    toast.error(err.response?.data?.message || 'Could not save sermon');
    }
  }

  // 5. while note is still null, return a "Loading..." paragraph
  if (!note) return <p className="p-6">Loading...</p>;

  return (
   
    // Main container screen background and padding
    <div className="min-h-screen bg-gray-50 py-10 px-8">
      {/* 
        w-full: Stretches the container wide across the screen
        mr-auto: Keeps everything aligned to the left side
      */}
      <div className="w-full mr-auto space-y-6 bg-white p-8 rounded-xl shadow-md border border-gray-100">
        
        {/* 6. a Back button, then the title, scripture, and content of the note */}
        <button 
          onClick={() => navigate('/savednotes')}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300 transition font-medium"
        >
          BACK
        </button>
        <form onSubmit={handleSave} className="space-y-4">
            <input
            className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-pre-wrap leading-relaxed"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <input
            className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-pre-wrap leading-relaxed"
            type="text"
            value={scriptureReferencing}
            onChange={(e) => setScriptureReferencing(e.target.value)}/>
            <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-pre-wrap leading-relaxed"
            placeholder="Type your content"
          />
            <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700 transition"
          >
            Save
          </button>

        </form>

        
        
      </div>
    </div>
  );
}