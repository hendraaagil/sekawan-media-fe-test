import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { userQuery } from '@/queries/auth'
import { Sidebar, Topbar } from '@/components/layout'

export const Container = ({
  children,
  title,
}: {
  children?: React.ReactNode
  title: string
}) => {
  const { data: user } = useQuery(userQuery())

  return (
    <>
      <Sidebar menus={user?.menus} />
      <main className="min-h-screen w-full bg-gray-100 pl-20 dark:bg-dark-tremor-background-subtle sm:pl-24 md:pl-56 lg:pl-80">
        <Topbar title={title} user={user} />
        {children}
      </main>
    </>
  )
}
