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
import { SettingPage } from '@/pages/setting'

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
    loader: () => protectedLoader(['admin']),
  },
  {
    path: '/ticket',
    element: <TicketPage />,
    loader: () => protectedLoader(['admin', 'guest']),
    action: ticketAction,
  },
  {
    path: '/setting',
    element: <SettingPage />,
    loader: () => protectedLoader(['admin', 'guest']),
  },
  {
    path: '/logout',
    action: logoutAction,
  },
  {
    path: '*',
    element: <p>Not Found</p>,
  },
])
