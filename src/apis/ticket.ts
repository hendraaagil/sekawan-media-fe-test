import { Ticket, TicketGraph, TicketOverview } from '@/interfaces/ticket'
import { authProvider } from '@/providers/auth'
import { TicketSchema } from '@/schemas/ticket'
import { makeTickets } from '@/utils/faker'

export const getTicketOverview = async (): Promise<TicketOverview> => {
  await new Promise((r) => setTimeout(r, 1000)) // fake delay

  return {
    totalUnresolved: 59,
    totalOverdue: 12,
    totalOpen: 37,
    totalHold: 5,
  }
}

export const getTicketGraph = async (): Promise<TicketGraph[]> => {
  await new Promise((r) => setTimeout(r, 1000)) // fake delay

  return [
    { month: 'Jan', 'Total Tickets': 100 },
    { month: 'Feb', 'Total Tickets': 120 },
    { month: 'Mar', 'Total Tickets': 80 },
    { month: 'Apr', 'Total Tickets': 140 },
    { month: 'May', 'Total Tickets': 90 },
    { month: 'Jun', 'Total Tickets': 100 },
    { month: 'Jul', 'Total Tickets': 120 },
    { month: 'Aug', 'Total Tickets': 80 },
    { month: 'Sep', 'Total Tickets': 140 },
    { month: 'Oct', 'Total Tickets': 90 },
    { month: 'Nov', 'Total Tickets': 100 },
    { month: 'Dec', 'Total Tickets': 120 },
  ]
}

export const getTickets = async (): Promise<Ticket[]> => {
  await new Promise((r) => setTimeout(r, 1000)) // fake delay

  return makeTickets(200)
}

export const createTicket = async (ticket: TicketSchema): Promise<Ticket> => {
  await new Promise((r) => setTimeout(r, 1000)) // fake delay

  const createdTicket = {
    title: ticket.title,
    content: ticket.content,
    pictureUrl:
      authProvider.pictureUrl || 'https://picsum.photos/seed/picsum/200/300',
    customerName: authProvider.name || 'John Doe',
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    priority: ticket.priority as Ticket['priority'],
    status: 'pending' as Ticket['status'],
  }
  const existingTickets = localStorage.getItem('myTickets')

  let myTickets: Ticket[] = [createdTicket]
  if (existingTickets) {
    myTickets = [...JSON.parse(existingTickets), createdTicket]
  }
  localStorage.setItem('myTickets', JSON.stringify(myTickets))

  return createdTicket
}
