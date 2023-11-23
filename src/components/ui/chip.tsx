import { tv } from 'tailwind-variants'

const styles = tv({
  base: 'rounded-full px-4 py-1 text-xs font-medium uppercase text-white',
  variants: {
    priority: {
      low: 'bg-yellow-500',
      medium: 'bg-green-500',
      high: 'bg-red-500',
    },
  },
  defaultVariants: {
    priority: 'medium',
  },
})

export const PriorityChip = ({
  priority,
}: {
  priority: 'low' | 'medium' | 'high'
}) => <span className={styles({ priority })}>{priority}</span>
