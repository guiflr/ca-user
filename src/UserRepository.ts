import { User } from './User'

export interface UserRepository {
  save(user: User): Promise<void>
  findByEmail(id: string): Promise<User | null>
}
