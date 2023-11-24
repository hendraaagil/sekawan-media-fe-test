import { useTranslation } from 'react-i18next'
import { Icon } from '@tremor/react'
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'

import { User } from '@/interfaces/user'
import { Heading } from '@/components/ui'

export const Topbar = ({ title, user }: { title: string; user?: User }) => {
  const { t } = useTranslation()

  return (
    <header className="flex items-center justify-between p-6">
      <Heading size="h2">{title}</Heading>
      <div className="flex items-center">
        <div className="hidden items-center space-x-2 border-r border-r-gray-400 px-4 sm:flex">
          <Icon
            icon={MagnifyingGlassIcon}
            color="gray"
            tooltip={t('dashboard.topbar.search')}
            className="cursor-pointer"
          />
          <Icon
            icon={BellIcon}
            color="gray"
            tooltip={t('dashboard.topbar.notification')}
            className="cursor-pointer"
          />
        </div>
        <div className="flex items-center px-4">
          <span className="mr-4 hidden font-semibold text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis sm:block">
            {user?.name}
          </span>
          <img
            src={user?.pictureUrl}
            alt={t('dashboard.topbar.altPicture')}
            className="h-12 w-12 rounded-full border-2 border-gray-50 shadow"
          />
        </div>
      </div>
    </header>
  )
}
