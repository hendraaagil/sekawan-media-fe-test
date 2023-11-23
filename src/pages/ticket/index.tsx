import { Container } from '@/components/layout'
import { TicketList } from '@/components/ticket'

export const TicketPage = () => {
  return (
    <Container title="Tickets">
      <div className="p-6">
        <TicketList />
      </div>
    </Container>
  )
}
