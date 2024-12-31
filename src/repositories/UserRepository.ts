import { User } from '../domain/User'

export interface UserRepository {
  save(user: User): Promise<void>
  findByEmail(id: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}
