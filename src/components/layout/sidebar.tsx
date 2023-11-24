import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { NavLink } from 'react-router-dom'
import {
  ChartPieIcon,
  Cog6ToothIcon,
  TicketIcon,
} from '@heroicons/react/24/solid'

import { Menu } from '@/interfaces/user'
import { Logout } from '@/components/layout'

const getSidebarIcon = (path: string) => {
  switch (path) {
    case '/overview':
      return ChartPieIcon
    case '/ticket':
      return TicketIcon
    case '/setting':
      return Cog6ToothIcon
    default:
      return ChartPieIcon
  }
}

export const Sidebar = ({ menus }: { menus?: Menu[] }) => {
  const navigations = menus?.map((menu) => ({
    ...menu,
    Icon: getSidebarIcon(menu.path),
  }))

  return (
    <div className="fixed flex h-screen min-w-fit flex-col bg-gray-800 py-4 text-gray-300 shadow lg:min-w-[20rem]">
      <div className="flex items-center px-6 py-4 sm:px-8">
        <img src="/vite.svg" alt="Vite's logo" width={36} height={36} />
        <span className="ml-4 hidden text-xl font-bold md:block">
          Dashboard
        </span>
      </div>
      <nav className="mt-4 flex h-full flex-col justify-between border-t border-t-gray-700">
        <div>
          {navigations?.map((navigation) => (
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
                    {
                      'mt-2 border-t border-t-gray-700': navigation.borderTop,
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
}
