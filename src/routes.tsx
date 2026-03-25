import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PrivateRoute from '@/components/PrivateRoute';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import RecoverPassword from '@/pages/RecoverPassword';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'areas',
        element: (
          <div className="p-6">
            <h1>Áreas de Vida</h1>
            <p>Em desenvolvimento...</p>
          </div>
        ),
      },
      {
        path: 'goals',
        element: (
          <div className="p-6">
            <h1>Metas</h1>
            <p>Em desenvolvimento...</p>
          </div>
        ),
      },
      {
        path: 'agenda',
        element: (
          <div className="p-6">
            <h1>Agenda</h1>
            <p>Em desenvolvimento...</p>
          </div>
        ),
      },
      {
        path: 'weekly',
        element: (
          <div className="p-6">
            <h1>Planejamento Semanal</h1>
            <p>Em desenvolvimento...</p>
          </div>
        ),
      },
      {
        path: 'reviews',
        element: (
          <div className="p-6">
            <h1>Revisões</h1>
            <p>Em desenvolvimento...</p>
          </div>
        ),
      },
      {
        path: 'achievements',
        element: (
          <div className="p-6">
            <h1>Conquistas</h1>
            <p>Em desenvolvimento...</p>
          </div>
        ),
      },
      {
        path: 'settings',
        element: (
          <div className="p-6">
            <h1>Configurações</h1>
            <p>Em desenvolvimento...</p>
          </div>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/recover-password',
    element: <RecoverPassword />,
  },
]);
