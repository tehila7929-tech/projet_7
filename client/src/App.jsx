import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './context/UserContext';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home/Home';
import Layout from './components/Layout/Layout';
import RegisterDetails from './pages/Auth/RegisterDetails';
import Todos from './pages/Todos/Todos';
import Posts from './pages/Posts/Posts';
import OwnerGuard from './components/Guard/OwnerGuard';

export default function App() {
  const { currentUser } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          currentUser ?
            <Navigate to="/home" replace /> :
            <Navigate to="/login" replace />
        } />

        <Route path='/login' element={
          currentUser ? <Navigate to="/home" replace /> : <Login />
        } />

        <Route path='/register' >
          <Route index element={<Register />} />
          <Route path='details' element={<RegisterDetails />} />
        </Route>

        <Route element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route element={<OwnerGuard />}>
            <Route path="users/:id/todos" element={<Todos />} />
            <Route path="users/:id/posts" element={<Posts />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}