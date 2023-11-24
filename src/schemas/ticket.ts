import { t } from 'i18next'
import { z } from 'zod'

export const ticketSchema = z
  .object({
    title: z.string({ required_error: t('ticket.form.title.required') }),
    content: z.string({
      required_error: t('ticket.form.description.required'),
    }),
    priority: z.enum(['low', 'medium', 'high'], {
      required_error: t('ticket.form.priority.required'),
      invalid_type_error: t('ticket.form.priority.invalid'),
    }),
  })
  .required()

export type TicketSchema = z.infer<typeof ticketSchema>
