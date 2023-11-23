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
