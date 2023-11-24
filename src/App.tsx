import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'

import { router } from '@/routes'
import { queryClient } from '@/configs/query'
import { settingProvider } from '@/providers/setting'

export default function App() {
  useEffect(() => {
    const isDarkMode = settingProvider.isDarkMode
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  )
}
