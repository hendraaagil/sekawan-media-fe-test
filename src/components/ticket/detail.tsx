import { format } from 'date-fns'
import { useFetcher } from 'react-router-dom'
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
      <Heading size="h3">Detail Ticket</Heading>
      <div className="space-y-1">
        <p className="text-sm text-tremor-content-subtle">Customer Detail</p>
        <div className="flex items-center">
          <img
            src={ticket.pictureUrl}
            alt={`${ticket.customerName}'s picture`}
            className="mr-4 h-12 w-12 rounded-full"
          />
          <p>{ticket.customerName}</p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-tremor-content-subtle">Priority</p>
        <PriorityChip priority={ticket.priority} />
      </div>
      <div className="space-y-1">
        <p className="text-sm text-tremor-content-subtle">Status</p>
        <StatusChip status={ticket.status} />
      </div>
      <div className="space-y-1">
        <p className="text-sm text-tremor-content-subtle">Created At</p>
        <p className="capitalize">
          {format(new Date(ticket.createdAt), 'PP p')}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-tremor-content-subtle">Last Updated</p>
        <p className="capitalize">
          {format(new Date(ticket.updatedAt), 'PP p')}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-tremor-content-subtle">Title</p>
        <p>{ticket.title}</p>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-tremor-content-subtle">Description</p>
        <p>{ticket.content}</p>
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
            Reject
          </Button>
          <Button
            size="lg"
            color="green"
            className="w-full"
            onClick={() => actionHandler(TicketStatus.Approved)}
            loading={fetcher.state === 'submitting'}
          >
            Approve
          </Button>
        </div>
      ) : (
        <Button size="lg" className="w-full" onClick={closeFn}>
          Close
        </Button>
      )}
    </div>
  )
}
