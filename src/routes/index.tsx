import { Navigate, createBrowserRouter } from 'react-router-dom'

import {
  loginAction,
  loginLoader,
  logoutAction,
  protectedLoader,
} from '@/libs/auth'
import { ticketAction } from '@/libs/ticket'

import { LoginPage } from '@/pages/login'
import { OverviewPage } from '@/pages/overview'
import { TicketPage } from '@/pages/ticket'

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
    path: '/overview',
    element: <OverviewPage />,
    loader: protectedLoader,
  },
  {
    id: 'ticket',
    path: '/ticket',
    element: <TicketPage />,
    loader: protectedLoader,
    action: ticketAction,
  },
  {
    path: '/logout',
    action: logoutAction,
  },
])
