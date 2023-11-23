import { faker } from '@faker-js/faker'
import { Ticket as ITicket } from '@/interfaces/ticket'

interface Ticket extends ITicket {
  subRows?: Ticket[]
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newTicket = (): Ticket => {
  return {
    title: faker.lorem.sentence(4),
    content: faker.lorem.paragraph(10),
    pictureUrl: faker.image.avatar(),
    customerName: faker.person.fullName(),
    updatedAt: faker.date
      .between({
        from: '2023-07-01T00:00:00.000Z',
        to: '2024-01-01T00:00:00.000Z',
      })
      .toISOString(),
    createdAt: faker.date
      .between({
        from: '2023-01-01T00:00:00.000Z',
        to: '2023-06-30T00:00:00.000Z',
      })
      .toISOString(),
    priority: faker.helpers.shuffle<Ticket['priority']>([
      'low',
      'medium',
      'high',
    ])[0]!,
    status: faker.helpers.shuffle<Ticket['status']>([
      'pending',
      'approved',
      'rejected',
    ])[0]!,
  }
}

export function makeTickets(...lens: number[]) {
  const makeTicketLevel = (depth = 0): Ticket[] => {
    const len = lens[depth]!
    return range(len).map(() => {
      return {
        ...newTicket(),
        subRows: lens[depth + 1] ? makeTicketLevel(depth + 1) : undefined,
      }
    })
  }

  return makeTicketLevel()
}
