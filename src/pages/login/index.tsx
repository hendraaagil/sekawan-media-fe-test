import { Subtitle } from '@tremor/react'

import { Heading } from '@/components/ui'
import { LoginForm } from '@/components/login'

export const LoginPage = () => (
  <main className="flex min-h-screen items-center justify-center bg-gray-800">
    <div className="flex max-w-fit flex-col items-center space-y-4 rounded-lg bg-gray-50 p-8">
      <img src="/vite.svg" alt="Vite's logo" width={36} height={36} />
      <Heading size="h2">Login to Dashboard</Heading>
      <Subtitle className="text-sm">
        Enter your email and password below
      </Subtitle>
      <LoginForm />
    </div>
  </main>
)
