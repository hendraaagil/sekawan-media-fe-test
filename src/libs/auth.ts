import { LoaderFunctionArgs, redirect } from 'react-router-dom'

import { authSchema } from '@/schemas/auth'
import { authProvider } from '@/providers/auth'

export const loginAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData()
  const email = (formData.get('email') as string) || undefined
  const password = (formData.get('password') as string) || undefined

  // Validate our form inputs and return validation errors via useActionData()
  const validate = authSchema.safeParse({ email, password })
  if (!validate.success) {
    return { errors: validate.error.formErrors.fieldErrors }
  }

  try {
    await authProvider.login(email as string, password as string)
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { email: [error.message], password: [error.message] } }
    }
    console.error(error)
  }

  if (authProvider.role !== 'admin') {
    return redirect('/ticket')
  }
  return redirect('/overview')
}

export const logoutAction = async () => {
  await authProvider.logout()
  return redirect('/')
}

export const loginLoader = () => {
  if (authProvider.token) {
    if (authProvider.role !== 'admin') {
      return redirect('/ticket')
    }
    return redirect('/overview')
  }

  return null
}

export const protectedLoader = async (allowedRoles: string[]) => {
  if (!authProvider.token) {
    return redirect('/login')
  }

  if (!allowedRoles.includes(authProvider.role || '')) {
    return redirect('/not-found')
  }

  return null
}
