import { UseQueryOptions } from '@tanstack/react-query'

import { getTicketGraph, getTicketOverview } from '@/apis/ticket'
import { TicketGraph, TicketOverview } from '@/interfaces/ticket'

export const ticketOverviewQuery = (): UseQueryOptions<TicketOverview> => ({
  queryKey: ['ticket_overview'],
  queryFn: async () => getTicketOverview(),
})

export const ticketGraphQuery = (): UseQueryOptions<TicketGraph[]> => ({
  queryKey: ['ticket_graph'],
  queryFn: async () => getTicketGraph(),
})
