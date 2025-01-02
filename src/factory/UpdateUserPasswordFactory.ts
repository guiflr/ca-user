import { UpdateUserPassword } from '../usecases/UpdateUserPassword'
import { UpdateUserPasswordController } from '../controllers/UpdateUserPasswordController'
import MemoryUserRepository from '../infra/repositories/MemoryUserRepository'
import { BcryptPasswordHasher } from '../adapters/bcrypt/BcryptHasher'

export const makeUpdateUserPasswordController =
  (): UpdateUserPasswordController => {
    const userRepository = MemoryUserRepository
    const passwordHasher = new BcryptPasswordHasher()
    const updateUserPassword = new UpdateUserPassword(
      userRepository,
      passwordHasher
    )
    return new UpdateUserPasswordController(updateUserPassword)
  }
