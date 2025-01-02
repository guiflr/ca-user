import { PrismaClient } from '@prisma/client'
import { UserRepository } from '../../repositories/UserRepository'
import { User } from '../../domain/User'

const prisma = new PrismaClient()

export class PrismaUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password
      }
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    const userRecord = await prisma.user.findUnique({
      where: { email }
    })

    if (!userRecord) return null

    const { id, name, password } = userRecord
    return { id, name, email, password }
  }

  async findById(id: string): Promise<User | null> {
    const userRecord = await prisma.user.findUnique({
      where: { id }
    })

    if (!userRecord) return null

    const { name, email, password } = userRecord
    return { id, name, email, password }
  }

  async update(user: User): Promise<void> {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        password: user.password
      }
    })
  }
}

export default new PrismaUserRepository()
