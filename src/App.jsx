import Register from './pages/Register';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Notes from './pages/Notes';
import SavedNotes from './pages/SavedNotes';
import ViewNote from './pages/ViewNote';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return (<>
<Routes>
  <Route path='/' element ={<Login/>} />
  <Route path='/register' element = {< Register /> }/>
  <Route path='/login' element={<Login/>} />
  
  <Route
  path="/notes"
  element={
    <ProtectedRoute>
      <Notes />
    </ProtectedRoute>
  } />
<Route path='/savednotes' element ={<ProtectedRoute> <SavedNotes/></ProtectedRoute>} />
<Route path='/notes/:id' element ={<ProtectedRoute><ViewNote/></ProtectedRoute>} />

   
</Routes>
<Toaster position="top-right" />
 </> )
}


export default App;