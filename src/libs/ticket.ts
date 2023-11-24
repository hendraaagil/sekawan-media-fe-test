import toast from 'react-hot-toast'
import { LoaderFunctionArgs, redirect } from 'react-router-dom'

import { TicketPriority, TicketStatus } from '@/constants/ticket'
import { createTicket, updateTicket } from '@/apis/ticket'
import { queryClient } from '@/configs/query'
import { ticketSchema } from '@/schemas/ticket'

export const ticketAction = async ({ request }: LoaderFunctionArgs) => {
  if (request.method.toLowerCase() === 'post') {
    const formData = await request.formData()
    const title = (formData.get('title') as string) || undefined
    const content = (formData.get('content') as string) || undefined
    const priority = (formData.get('priority') as string) || undefined

    // Validate our form inputs and return validation errors via useActionData()
    const validate = ticketSchema.safeParse({ title, content, priority })
    if (!validate.success) {
      return { errors: validate.error.formErrors.fieldErrors }
    }

    try {
      await createTicket({
        title: title as string,
        content: content as string,
        priority: priority as TicketPriority,
      })
    } catch (error) {
      if (error instanceof Error) {
        return {
          errors: {
            title: [error.message],
            content: [error.message],
            priority: [error.message],
          },
        }
      }
      console.error(error)
    }

    queryClient.invalidateQueries({ queryKey: ['ticket_list'] })
    toast.success('Ticket created successfully')
    return { errors: null }
  }

  if (request.method.toLowerCase() === 'patch') {
    const formData = await request.formData()
    const status = (formData.get('status') as string) || undefined
    const ticketId = (formData.get('ticketId') as string) || undefined

    await updateTicket(ticketId as string, status as TicketStatus)
    toast.success('Ticket updated successfully')

    queryClient.invalidateQueries({ queryKey: ['ticket_list'] })
    return redirect('/ticket')
  }

  return null
}
