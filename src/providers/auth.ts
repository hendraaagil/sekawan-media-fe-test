import { getUser, login } from '@/apis/auth'

export interface AuthProvider {
  email: string | null
  token: string | null
  name: string | null
  pictureUrl: string | null
  role: string | null

  login(email: string, password: string): Promise<void>
  logout(): Promise<void>
}

/**
 * This represents some generic auth provider API
 */
export const authProvider: AuthProvider = {
  email: localStorage.getItem('email') || null,
  token: localStorage.getItem('token') || null,
  name: localStorage.getItem('name') || null,
  pictureUrl: localStorage.getItem('pictureUrl') || null,
  role: localStorage.getItem('role') || null,

  async login(email: string, password: string) {
    const { token } = await login(email, password)
    authProvider.email = email
    authProvider.token = token
    localStorage.setItem('email', email)
    localStorage.setItem('token', token)

    const { name, pictureUrl, role } = await getUser()
    authProvider.name = name
    authProvider.pictureUrl = pictureUrl
    authProvider.role = role
    localStorage.setItem('name', name)
    localStorage.setItem('pictureUrl', pictureUrl)
    localStorage.setItem('role', role)
  },
  async logout() {
    await new Promise((r) => setTimeout(r, 1000)) // fake delay
    authProvider.email = null
    authProvider.token = null
    authProvider.name = null
    authProvider.pictureUrl = null
    authProvider.role = null

    localStorage.removeItem('email')
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('pictureUrl')
    localStorage.removeItem('role')
  },
}
