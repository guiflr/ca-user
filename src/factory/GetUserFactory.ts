import { GetUserController } from '../controllers/GetUserController'
import PrismaUserRepository from '../infra/repositories/PrismaUserRepository'
import { GetUser } from '../usecases/GetUser'

export function makeGetUserController(): GetUserController {
  const userRepository = PrismaUserRepository
  const getUserUseCase = new GetUser(userRepository)
  return new GetUserController(getUserUseCase)
}
