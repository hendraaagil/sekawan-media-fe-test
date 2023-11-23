import { getUser, login } from '@/apis/auth'

export interface User {
  email: string
  name: string
  pictureUrl: string
  role: 'admin' | 'guest'
  token: string
}

export interface AuthProvider {
  email: string | null
  token: string | null

  getUser(token: string): Promise<User>
  login(email: string, password: string): Promise<void>
  logout(): Promise<void>
}

/**
 * This represents some generic auth provider API
 */
export const authProvider: AuthProvider = {
  email: localStorage.getItem('email') || null,
  token: localStorage.getItem('token') || null,

  async getUser(token: string) {
    return getUser(token)
  },
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
