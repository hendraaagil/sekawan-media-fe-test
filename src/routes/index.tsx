import { Navigate, createBrowserRouter } from 'react-router-dom'

import { loginAction, loginLoader, protectedLoader } from '@/libs/auth'

import { LoginPage } from '@/pages/login'
import { DashboardPage } from '@/pages/dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    loader: loginLoader,
    action: loginAction,
  },
  {
    id: 'dashboard',
    path: '/dashboard',
    element: <DashboardPage />,
    loader: protectedLoader,
  },
])
