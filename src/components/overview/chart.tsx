import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { AreaChart, Card, Title } from '@tremor/react'

import { TicketGraph } from '@/interfaces/ticket'
import { ticketGraphQuery } from '@/queries/ticket'

export const OverviewChart = () => {
  const { t } = useTranslation()
  const { data: ticketGraph } = useQuery(ticketGraphQuery())

  return (
    <Card>
      <Title className="font-bold">{t('overview.chartTitle')}</Title>
      <AreaChart
        className="mt-4"
        data={ticketGraph as TicketGraph[]}
        index="month"
        categories={['Total Tickets']}
        colors={['blue']}
        curveType="monotone"
      />
    </Card>
  )
}
