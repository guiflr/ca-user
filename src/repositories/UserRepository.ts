import { User } from '../domain/User'
import { UpdateUser } from '../usecases/UpdateUser'

export interface UserRepository {
  save(user: User): Promise<void>
  findByEmail(id: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  update(user: User): Promise<void>
}
