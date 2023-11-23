import { login } from '@/apis/auth'

export interface AuthProvider {
  email: string | null
  token: string | null

  login(email: string, password: string): Promise<void>
  logout(): Promise<void>
}

/**
 * This represents some generic auth provider API
 */
export const authProvider: AuthProvider = {
  email: localStorage.getItem('email') || null,
  token: localStorage.getItem('token') || null,

  async login(email: string, password: string) {
    const { token } = await login(email, password)

    authProvider.email = email
    authProvider.token = token

    localStorage.setItem('email', email)
    localStorage.setItem('token', token)
  },
  async logout() {
    await new Promise((r) => setTimeout(r, 1000)) // fake delay
    authProvider.email = null
    authProvider.token = null

    localStorage.removeItem('email')
    localStorage.removeItem('token')
  },
}
