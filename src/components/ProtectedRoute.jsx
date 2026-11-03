import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // 1. read the saved user from localStorage
  const user = localStorage.getItem('user');
  // 2. if there is no user, return <Navigate to="/login" replace />
  if(!user){
   return <Navigate to="/login" replace /> ;
  }
  // 3. otherwise, return children
 return children;
 }
