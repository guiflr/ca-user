import { UpdateUserController } from '../controllers/UpdateUserController'
import MemoryUserRepository from '../infra/repositories/MemoryUserRepository'
import { UpdateUser } from '../usecases/UpdateUser'

export function makeUpdateUserController(): UpdateUserController {
  const userRepository = MemoryUserRepository
  const updateUserUseCase = new UpdateUser(userRepository)
  return new UpdateUserController(updateUserUseCase)
}
