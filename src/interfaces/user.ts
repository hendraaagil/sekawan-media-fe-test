export interface User {
  email: string
  name: string
  pictureUrl: string
  role: 'admin' | 'guest'
}
