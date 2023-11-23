import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Icon } from '@tremor/react'
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'

import { userQuery } from '@/queries/dashboard'
import { Sidebar } from '@/components/layout'
import { Heading } from '@/components/ui'

export const Container = ({
  children,
  title,
}: {
  children?: React.ReactNode
  title: string
}) => {
  const { data: user } = useQuery(userQuery())

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full bg-gray-300">
        <header className="flex items-center justify-between px-4 py-5 shadow">
          <Heading size="h2">{title}</Heading>
          <div className="flex items-center">
            <div className="hidden items-center space-x-2 border-r-2 border-r-gray-400 px-4 sm:flex">
              <Icon
                icon={MagnifyingGlassIcon}
                color="gray"
                tooltip="Search tasks"
                className="cursor-pointer"
              />
              <Icon
                icon={BellIcon}
                color="gray"
                tooltip="Show notifications"
                className="cursor-pointer"
              />
            </div>
            <div className="flex items-center px-4">
              <span className="mr-4 hidden font-semibold text-tremor-content-emphasis sm:block">
                {user?.name}
              </span>
              <img
                src={user?.pictureUrl}
                alt="Picture"
                className="h-12 w-12 rounded-full border-2 border-gray-50 shadow"
              />
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  )
}
