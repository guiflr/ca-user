import { UpdateUserPassword } from '../usecases/UpdateUserPassword'
import { UpdateUserPasswordController } from '../controllers/UpdateUserPasswordController'
import PrismaUserRepository from '../infra/repositories/PrismaUserRepository'
import { BcryptPasswordHasher } from '../adapters/bcrypt/BcryptHasher'

export const makeUpdateUserPasswordController =
  (): UpdateUserPasswordController => {
    const userRepository = PrismaUserRepository
    const passwordHasher = new BcryptPasswordHasher()
    const updateUserPassword = new UpdateUserPassword(
      userRepository,
      passwordHasher
    )
    return new UpdateUserPasswordController(updateUserPassword)
  }
