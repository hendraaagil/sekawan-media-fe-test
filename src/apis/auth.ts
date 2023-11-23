import { User } from '@/providers/auth'

// This is the API that we will use to mock the authentication process.
export const login = async (email: string, password: string) => {
  await new Promise((r) => setTimeout(r, 1000)) // fake delay

  // Fake authentication check
  if (
    !['admin@agil.dev', 'guest@agil.dev'].includes(email) ||
    password !== 'hendra123'
  ) {
    throw new Error('Invalid email or password!')
  }

  const token = '1234567890'
  return { token }
}

export const getUser = async (): Promise<User> => {
  await new Promise((r) => setTimeout(r, 1000)) // fake delay

  const email = localStorage.getItem('email') || ''
  const role = email === 'admin@agil.dev' ? 'admin' : 'guest'
  const name = role === 'admin' ? 'Hendra Agil' : 'Guest Agil'
  const pictureUrl =
    role === 'admin'
      ? 'https://randomuser.me/api/portraits/lego/0.jpg'
      : 'https://randomuser.me/api/portraits/lego/1.jpg'

  return { email, name, pictureUrl, role }
}
