import { GetUserController } from '../controllers/GetUserController'
import UserRepositoryInMemory from '../infra/repositories/MemoryUserRepository'
import { GetUser } from '../usecases/GetUser'

export function makeGetUserController(): GetUserController {
  const userRepository = UserRepositoryInMemory
  const getUserUseCase = new GetUser(userRepository)
  return new GetUserController(getUserUseCase)
}
