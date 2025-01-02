import { CreateUser } from '../usecases/CreateUser'
import { CreateUserController } from '../controllers/CreateUserController'
import UserRepositoryInMemory from '../infra/repositories/MemoryUserRepository'
import { UuidGenerator } from '../adapters/uuid/UUIDGenerator'
import { BcryptPasswordHasher } from '../adapters/bcrypt/BcryptHasher'

export function makeCreateUserController(): CreateUserController {
  const userRepository = UserRepositoryInMemory
  const idGenerator = new UuidGenerator()
  const passwordHasher = new BcryptPasswordHasher()

  const createUser = new CreateUser(userRepository, idGenerator, passwordHasher)

  return new CreateUserController(createUser)
}
