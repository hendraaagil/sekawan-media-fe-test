import { t } from 'i18next'
import { z } from 'zod'

export const authSchema = z
  .object({
    email: z
      .string({ required_error: t('login.email.required') })
      .email(t('login.email.invalid')),
    password: z
      .string({ required_error: t('login.password.required') })
      .min(8, t('login.password.invalid')),
  })
  .required()

export type AuthSchema = z.infer<typeof authSchema>
