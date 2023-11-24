import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'

const actions = [
  {
    name: 'Approve',
    href: '#',
  },
  {
    name: 'Reject',
    href: '#',
  },
  {
    name: 'Details',
    href: '#',
  },
]

export const ListAction = () => {
  return (
    <Popover className="relative">
      <Popover.Button className="rounded-full p-2 transition-colors hover:bg-white focus:outline-none">
        <EllipsisVerticalIcon className="h-6 w-6" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute -top-8 z-10 mt-3 min-w-fit max-w-sm -translate-x-full transform">
          <div className="overflow-hidden rounded-tremor-default shadow-lg">
            <div className="relative grid gap-1 bg-white">
              {actions.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-3 transition-colors hover:bg-gray-100 focus:outline-none"
                >
                  <p className="font-medium text-tremor-content-emphasis">
                    {item.name}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
