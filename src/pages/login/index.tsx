import { useTranslation } from 'react-i18next'
import { Subtitle } from '@tremor/react'

import { Heading } from '@/components/ui'
import { LoginForm } from '@/components/login'

export const LoginPage = () => {
  const { t } = useTranslation()

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-800">
      <div className="flex max-w-fit flex-col items-center space-y-4 rounded-tremor-default bg-gray-50 p-8 dark:bg-dark-tremor-background">
        <img src="/vite.svg" alt="Vite's logo" width={36} height={36} />
        <Heading size="h2">{t('login.title')}</Heading>
        <Subtitle className="text-sm">{t('login.subtitle')}</Subtitle>
        <LoginForm />
      </div>
    </main>
  )
}
