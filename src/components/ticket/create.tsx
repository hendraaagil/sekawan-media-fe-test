import clsx from 'clsx'
import { useState } from 'react'
import { ZodError } from 'zod'
import { Form, useActionData, useNavigation, useSubmit } from 'react-router-dom'
import { Button, Select, SelectItem, TextInput, Textarea } from '@tremor/react'

import { TicketPriority } from '@/constants/ticket'
import { TicketSchema } from '@/schemas/ticket'
import { Heading, PriorityChip } from '@/components/ui'

export const CreateTicket = ({ closeFn }: { closeFn: () => void }) => {
  const [priority, setPriority] = useState('')
  const navigation = useNavigation()
  const submit = useSubmit()

  const isSubmitting =
    navigation.formData?.get('title') != null &&
    navigation.formData?.get('content') != null
  const actionData = useActionData() as
    | { errors: ZodError<TicketSchema>['formErrors']['fieldErrors'] }
    | undefined

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    formData.append('priority', priority)
    submit(formData, { method: 'post' })

    setTimeout(() => {
      closeFn()
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <Heading size="h3">Create Ticket</Heading>
      <Form method="post" className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label
            htmlFor="priority"
            className="text-sm text-tremor-content-subtle"
          >
            Priority
          </label>
          <Select
            id="priority"
            placeholder="Select Priority"
            value={priority}
            onValueChange={setPriority}
            className={clsx({
              'rounded-tremor-default border border-rose-500':
                !!actionData?.errors.priority,
            })}
          >
            {['low', 'medium', 'high'].map((item) => (
              <SelectItem key={item} value={item}>
                <PriorityChip priority={item as TicketPriority} />
              </SelectItem>
            ))}
          </Select>
          {!!actionData?.errors.priority && (
            <p className="text-sm text-rose-500">
              {actionData?.errors.priority
                ? actionData?.errors.priority[0]
                : ''}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <label htmlFor="title" className="text-sm text-tremor-content-subtle">
            Title
          </label>
          <TextInput
            id="title"
            type="text"
            name="title"
            placeholder="Ticket Title"
            errorMessage={
              actionData?.errors.title ? actionData?.errors.title[0] : ''
            }
            error={!!actionData?.errors.title}
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="content"
            className="text-sm text-tremor-content-subtle"
          >
            Description
          </label>
          <Textarea
            id="content"
            name="content"
            placeholder="Write your ticket description here ..."
            errorMessage={
              actionData?.errors.content ? actionData?.errors.content[0] : ''
            }
            error={!!actionData?.errors.content}
          />
        </div>
        <Button className="w-full" type="submit" loading={isSubmitting}>
          Create Ticket
        </Button>
      </Form>
    </div>
  )
}
