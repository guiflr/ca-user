import { UpdateUserController } from '../controllers/UpdateUserController'
import PrismaUserRepository from '../infra/repositories/PrismaUserRepository'
import { UpdateUser } from '../usecases/UpdateUser'

export function makeUpdateUserController(): UpdateUserController {
  const userRepository = PrismaUserRepository
  const updateUserUseCase = new UpdateUser(userRepository)
  return new UpdateUserController(updateUserUseCase)
}
