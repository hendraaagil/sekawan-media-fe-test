import { TicketPriority, TicketStatus } from '@/constants/ticket'

export interface TicketOverview {
  totalUnresolved: number
  totalOverdue: number
  totalOpen: number
  totalHold: number
}

export interface TicketGraph {
  month: string
  'Total Tickets': number
}

export interface Ticket {
  id: string
  title: string
  content: string
  pictureUrl: string
  customerName: string
  updatedAt: string
  createdAt: string
  priority: TicketPriority
  status: TicketStatus
}
