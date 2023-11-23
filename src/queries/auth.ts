import { UseQueryOptions } from '@tanstack/react-query'

import { getUser } from '@/apis/auth'
import { User } from '@/interfaces/user'

export const userQuery = (): UseQueryOptions<User> => ({
  queryKey: ['user'],
  queryFn: async () => getUser(),
})
