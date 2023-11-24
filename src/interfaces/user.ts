export interface Menu {
  label: string
  path: string
  borderTop?: boolean
}

export interface User {
  email: string
  name: string
  pictureUrl: string
  role: 'admin' | 'guest'
  menus: Array<Menu>
}
