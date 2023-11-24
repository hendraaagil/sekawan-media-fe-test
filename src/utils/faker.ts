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
  const createdAt = faker.date
    .between({
      from: '2023-01-01T00:00:00.000Z',
      to: new Date().toISOString(),
    })
    .toISOString()

  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(4),
    content: faker.lorem.paragraph(10),
    pictureUrl: faker.image.avatar(),
    customerName: faker.person.fullName(),
    updatedAt: faker.date
      .between({
        from: createdAt,
        to: new Date().toISOString(),
      })
      .toISOString(),
    createdAt: createdAt,
    priority: faker.helpers.shuffle([
      'low',
      'medium',
      'high',
    ])[0]! as Ticket['priority'],
    status: faker.helpers.shuffle([
      'pending',
      'approved',
      'rejected',
    ])[0]! as Ticket['status'],
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
