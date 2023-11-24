import { LoaderFunctionArgs, redirect } from 'react-router-dom'

import { TicketPriority } from '@/constants/ticket'
import { createTicket } from '@/apis/ticket'
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
    return redirect('/ticket')
  }

  return null
}
