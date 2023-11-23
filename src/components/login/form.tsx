import { ZodError, z } from 'zod'
import { Form, useActionData, useNavigation } from 'react-router-dom'
import { Button, TextInput } from '@tremor/react'

import { authSchema } from '@/schemas/auth'

export const LoginForm = () => {
  const navigation = useNavigation()
  const isLoggingIn =
    navigation.formData?.get('email') != null &&
    navigation.formData?.get('password') != null

  const actionData = useActionData() as
    | {
        errors: ZodError<
          z.infer<typeof authSchema>
        >['formErrors']['fieldErrors']
      }
    | undefined

  return (
    <Form method="post" className="space-y-4 sm:min-w-[24rem]">
      <div className="w-full">
        <label htmlFor="email" className="text-sm text-tremor-content-subtle">
          Email
        </label>
        <TextInput
          id="email"
          type="email"
          name="email"
          placeholder="Email Address"
          errorMessage={
            actionData?.errors.email ? actionData?.errors.email[0] : ''
          }
          error={!!actionData?.errors.email}
        />
      </div>
      <div className="w-full">
        <label
          htmlFor="password"
          className="text-sm text-tremor-content-subtle"
        >
          Password
        </label>
        <TextInput
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          errorMessage={
            actionData?.errors.password ? actionData?.errors.password[0] : ''
          }
          error={!!actionData?.errors.password}
        />
      </div>
      <Button className="w-full" loading={isLoggingIn}>
        Log In
      </Button>
    </Form>
  )
}
