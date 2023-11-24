import { z } from 'zod'

export const ticketSchema = z
  .object({
    title: z.string({ required_error: 'Title is required!' }),
    content: z.string({ required_error: 'Description is required!' }),
    priority: z.enum(['low', 'medium', 'high'], {
      required_error: 'Priority is required!',
      invalid_type_error: 'Priority must be low, medium or high!',
    }),
  })
  .required()

export type TicketSchema = z.infer<typeof ticketSchema>
