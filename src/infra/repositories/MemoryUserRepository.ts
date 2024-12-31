import { User } from '../../domain/User'
import { UserRepository } from '../../repositories/UserRepository'

export class UserRepositoryInMemory implements UserRepository {
  private users: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null
  }

  async save(user: User): Promise<void> {
    this.users.push(user)
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null
  }
}
