import { useFetcher } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import { Button } from '@tremor/react'

import { authProvider } from '@/providers/auth'
import { TicketStatus } from '@/constants/ticket'
import { Ticket } from '@/interfaces/ticket'
import { Heading, PriorityChip, StatusChip } from '@/components/ui'

export const DetailTicket = ({
  ticket,
  closeFn,
}: {
  ticket: Ticket
  closeFn: () => void
}) => {
  const { t } = useTranslation()
  const fetcher = useFetcher()
  const isAdmin = authProvider.role === 'admin'

  const actionHandler = (status: TicketStatus) => {
    const formData = new FormData()
    formData.append('ticketId', ticket.id)
    formData.append('status', status)
    fetcher.submit(formData, { method: 'patch' })

    setTimeout(() => {
      closeFn()
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <Heading size="h3">{t('ticket.detail.title')}</Heading>
      <div className="space-y-1">
        <p className="text-sm text-tremor-content-subtle">
          {t('ticket.detail.customer')}
        </p>
        <div className="flex items-center">
          <img
            src={ticket.pictureUrl}
            alt={`${ticket.customerName}'s picture`}
            className="mr-4 h-12 w-12 rounded-full"
          />
          <p className="dark:text-white">{ticket.customerName}</p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-tremor-content-subtle">
          {t('ticket.detail.priority')}
        </p>
        <PriorityChip priority={ticket.priority} />
      </div>
      <div className="space-y-1">
        <p className="text-sm text-tremor-content-subtle">
          {t('ticket.detail.status')}
        </p>
        <StatusChip status={ticket.status} />
      </div>
      <div className="space-y-1">
        <p className="text-sm text-tremor-content-subtle">
          {t('ticket.detail.createdAt')}
        </p>
        <p className="capitalize dark:text-white">
          {format(new Date(ticket.createdAt), 'PP p')}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-tremor-content-subtle">
          {t('ticket.detail.updatedAt')}
        </p>
        <p className="capitalize dark:text-white">
          {format(new Date(ticket.updatedAt), 'PP p')}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-tremor-content-subtle">
          {t('ticket.detail.ticketTitle')}
        </p>
        <p className="dark:text-white">{ticket.title}</p>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-tremor-content-subtle">
          {t('ticket.detail.description')}
        </p>
        <p className="dark:text-white">{ticket.content}</p>
      </div>
      {isAdmin && ticket.status === TicketStatus.Pending ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Button
            size="lg"
            color="red"
            className="w-full"
            onClick={() => actionHandler(TicketStatus.Rejected)}
            loading={fetcher.state === 'submitting'}
          >
            {t('ticket.detail.reject')}
          </Button>
          <Button
            size="lg"
            color="green"
            className="w-full"
            onClick={() => actionHandler(TicketStatus.Approved)}
            loading={fetcher.state === 'submitting'}
          >
            {t('ticket.detail.approve')}
          </Button>
        </div>
      ) : (
        <Button size="lg" className="w-full" onClick={closeFn}>
          {t('ticket.detail.close')}
        </Button>
      )}
    </div>
  )
}
