import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import { ChartPieIcon, TicketIcon } from '@heroicons/react/24/solid'

import { Logout } from '@/components/layout'
import { twMerge } from 'tailwind-merge'

const navigations = [
  { label: 'Overview', Icon: ChartPieIcon, path: '/dashboard' },
  { label: 'Tickets', Icon: TicketIcon, path: '/ticket' },
]

export const Sidebar = () => (
  <div className="flex min-h-screen min-w-fit flex-col bg-gray-800 py-4 text-gray-300 md:min-w-[20rem]">
    <div className="flex items-center px-6 py-4 sm:px-8">
      <img src="/vite.svg" alt="Vite's logo" width={36} height={36} />
      <span className="ml-4 hidden text-xl font-bold md:block">Dashboard</span>
    </div>
    <nav className="mt-4 flex h-full flex-col justify-between border-t border-t-gray-700">
      <div>
        {navigations.map((navigation) => (
          <NavLink
            key={navigation.label}
            to={navigation.path}
            className={({ isActive }) =>
              twMerge(
                clsx(
                  'flex items-center border-l-2 border-l-transparent px-6 py-4 transition-colors sm:px-8',
                  'hover:border-l-gray-50 hover:bg-gray-700 hover:text-gray-50',
                  {
                    'border-l-gray-50 bg-gray-700 text-gray-50': isActive,
                  },
                ),
              )
            }
          >
            <navigation.Icon className="h-6 w-6" />
            <span className="ml-4 hidden md:block">{navigation.label}</span>
          </NavLink>
        ))}
      </div>
      <Logout />
    </nav>
  </div>
)
