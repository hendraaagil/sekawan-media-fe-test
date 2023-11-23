import { UseQueryOptions } from '@tanstack/react-query'

import { getTicketGraph, getTicketOverview, getTickets } from '@/apis/ticket'
import { Ticket, TicketGraph, TicketOverview } from '@/interfaces/ticket'

export const ticketOverviewQuery = (): UseQueryOptions<TicketOverview> => ({
  queryKey: ['ticket_overview'],
  queryFn: async () => getTicketOverview(),
})

export const ticketGraphQuery = (): UseQueryOptions<TicketGraph[]> => ({
  queryKey: ['ticket_graph'],
  queryFn: async () => getTicketGraph(),
})

export const ticketListQuery = (): UseQueryOptions<Ticket[]> => ({
  queryKey: ['ticket_list'],
  queryFn: async () => getTickets(),
})
