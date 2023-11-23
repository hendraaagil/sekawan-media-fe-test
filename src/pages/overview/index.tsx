import { useQuery } from '@tanstack/react-query'

import { ticketOverviewQuery } from '@/queries/ticket'
import { Container } from '@/components/layout'
import { OverviewCard, OverviewChart } from '@/components/overview'

export const OverviewPage = () => {
  const { data: ticketOverview } = useQuery(ticketOverviewQuery())

  return (
    <Container title="Overview">
      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <OverviewCard
            title="Unresolved"
            value={ticketOverview?.totalUnresolved as number}
          />
          <OverviewCard
            title="Overdue"
            value={ticketOverview?.totalOverdue as number}
          />
          <OverviewCard
            title="Open"
            value={ticketOverview?.totalOpen as number}
          />
          <OverviewCard
            title="On Hold"
            value={ticketOverview?.totalHold as number}
          />
        </div>
        <OverviewChart />
      </div>
    </Container>
  )
}
