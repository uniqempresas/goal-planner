import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PrivateRoute from '@/components/PrivateRoute';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import RecoverPassword from '@/pages/RecoverPassword';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import NotFound from '@/components/error/NotFound';

// Páginas de Áreas
import AreasList from '@/pages/areas/AreasList';
import AreaDetail from '@/pages/areas/AreaDetail';
import AreaFormPage from '@/pages/areas/AreaFormPage';

// Páginas de Metas
import { GoalsList } from '@/pages/goals/GoalsList';
import { GoalDetail } from '@/pages/goals/GoalDetail';
import GoalCreate from '@/pages/goals/GoalCreate';
import GoalEdit from '@/pages/goals/GoalEdit';

export const router = createBrowserRouter([
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
      // Rotas de Áreas de Vida
      {
        path: 'areas',
        children: [
          {
            index: true,
            element: <AreasList />,
          },
          {
            path: 'new',
            element: <AreaFormPage />,
          },
          {
            path: ':id',
            element: <AreaDetail />,
          },
          {
            path: ':id/edit',
            element: <AreaFormPage />,
          },
        ],
      },
      // Rotas de Metas Hierárquicas
      {
        path: 'metas',
        children: [
          {
            index: true,
            element: <Navigate to="/metas/grandes" replace />,
          },
          {
            path: 'grandes',
            children: [
              {
                index: true,
                element: <GoalsList />,
              },
              {
                path: 'criar',
                element: <GoalCreate />,
              },
              {
                path: ':id',
                element: <GoalDetail />,
              },
              {
                path: ':id/editar',
                element: <GoalEdit />,
              },
            ],
          },
          {
            path: 'anual',
            children: [
              {
                index: true,
                element: <GoalsList />,
              },
              {
                path: 'criar',
                element: <GoalCreate />,
              },
              {
                path: ':id',
                element: <GoalDetail />,
              },
              {
                path: ':id/editar',
                element: <GoalEdit />,
              },
            ],
          },
          {
            path: 'mensal',
            children: [
              {
                index: true,
                element: <GoalsList />,
              },
              {
                path: 'criar',
                element: <GoalCreate />,
              },
              {
                path: ':id',
                element: <GoalDetail />,
              },
              {
                path: ':id/editar',
                element: <GoalEdit />,
              },
            ],
          },
          {
            path: 'semanal',
            children: [
              {
                index: true,
                element: <GoalsList />,
              },
              {
                path: 'criar',
                element: <GoalCreate />,
              },
              {
                path: ':id',
                element: <GoalDetail />,
              },
              {
                path: ':id/editar',
                element: <GoalEdit />,
              },
            ],
          },
          {
            path: 'diarias',
            children: [
              {
                index: true,
                element: <GoalsList />,
              },
              {
                path: 'criar',
                element: <GoalCreate />,
              },
              {
                path: ':id',
                element: <GoalDetail />,
              },
              {
                path: ':id/editar',
                element: <GoalEdit />,
              },
            ],
          },
        ],
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
        path: 'templates',
        element: (
          <div className="p-6">
            <h1>Templates</h1>
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
    path: '*',
    element: <NotFound />,
  },
]);
