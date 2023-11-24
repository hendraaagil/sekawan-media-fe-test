import { useState } from 'react'
import { Button } from '@tremor/react'

import { Container } from '@/components/layout'
import { CreateTicket, TicketList } from '@/components/ticket'
import { Dialog, Heading } from '@/components/ui'

export const TicketPage = () => {
  const [showCreate, setShowCreate] = useState(false)

  const closeDialog = () => {
    setShowCreate(false)
  }

  return (
    <Container title="Tickets">
      <div className="p-6">
        <div className="rounded-tremor-default bg-white shadow-tremor-card">
          <div className="flex items-center justify-between p-8">
            <Heading size="h3">All Tickets</Heading>
            <Button size="lg" onClick={() => setShowCreate(true)}>
              Create Ticket
            </Button>
            <Dialog isOpen={showCreate} onClose={closeDialog}>
              <CreateTicket closeFn={closeDialog} />
            </Dialog>
          </div>

          <TicketList />
        </div>
      </div>
    </Container>
  )
}
