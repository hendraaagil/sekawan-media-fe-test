import { UseQueryOptions } from '@tanstack/react-query'

import { Ticket, TicketGraph, TicketOverview } from '@/interfaces/ticket'
import { authProvider } from '@/providers/auth'
import {
  getMyTickets,
  getTicketGraph,
  getTicketOverview,
  getTickets,
} from '@/apis/ticket'

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
  queryFn: async () => {
    if (authProvider.role !== 'admin') {
      return getMyTickets()
    }
    return getTickets()
  },
})
