import { tv } from 'tailwind-variants'
import { TicketPriority, TicketStatus } from '@/constants/ticket'

const styles = tv({
  base: 'rounded-full px-4 py-1 text-xs font-medium uppercase text-white',
  variants: {
    priority: {
      low: 'bg-yellow-500',
      medium: 'bg-green-500',
      high: 'bg-red-500',
    },
    status: {
      pending: 'bg-yellow-500',
      approved: 'bg-green-500',
      rejected: 'bg-red-500',
    },
  },
  defaultVariants: {
    priority: 'medium',
  },
})

export const PriorityChip = ({ priority }: { priority: TicketPriority }) => (
  <span className={styles({ priority })}>{priority}</span>
)

export const StatusChip = ({ status }: { status: TicketStatus }) => (
  <span className={styles({ status })}>{status}</span>
)
