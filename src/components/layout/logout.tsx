import { t } from 'i18next'
import { useFetcher } from 'react-router-dom'
import { Button, Icon } from '@tremor/react'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'

export const Logout = () => {
  const fetcher = useFetcher()
  const isLoggingOut = fetcher.formData != null

  return (
    <fetcher.Form method="post" action="/logout" className="px-2 sm:px-4">
      <Button
        icon={ArrowLeftOnRectangleIcon}
        type="submit"
        color="red"
        className="hidden w-full rounded-none px-6 py-4 transition-colors sm:px-8 md:flex"
        loading={isLoggingOut}
      >
        {t('dashboard.logout')}
      </Button>
      <button className="flex w-full justify-center rounded-tremor-default bg-red-500 py-2 md:hidden">
        <Icon
          icon={ArrowLeftOnRectangleIcon}
          tooltip={t('dashboard.logout')}
          className="text-white"
          size="lg"
        />
      </button>
    </fetcher.Form>
  )
}
