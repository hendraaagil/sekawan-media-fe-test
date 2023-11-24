import { useTranslation } from 'react-i18next'
import { ZodError } from 'zod'
import { Form, useActionData, useNavigation } from 'react-router-dom'
import { Button, TextInput } from '@tremor/react'

import { AuthSchema } from '@/schemas/auth'

export const LoginForm = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const isLoggingIn =
    navigation.formData?.get('email') != null &&
    navigation.formData?.get('password') != null

  const actionData = useActionData() as
    | { errors: ZodError<AuthSchema>['formErrors']['fieldErrors'] }
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
          placeholder={t('login.email.placeholder')}
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
          placeholder={t('login.password.placeholder')}
          errorMessage={
            actionData?.errors.password ? actionData?.errors.password[0] : ''
          }
          error={!!actionData?.errors.password}
        />
      </div>
      <Button className="w-full" loading={isLoggingIn}>
        {t('login.submit')}
      </Button>
    </Form>
  )
}
