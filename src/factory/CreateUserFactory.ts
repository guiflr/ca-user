import { BcryptPasswordHasher } from '../BcryptHasher'
import { CreateUser } from '../CreateUser'
import { CreateUserController } from '../CreateUserController'
import { UserRepositoryInMemory } from '../infra/repositories/MemoryUserRepository'
import { UuidGenerator } from '../UUIDGenerator'

export function makeCreateUserController(): CreateUserController {
  const userRepository = new UserRepositoryInMemory()
  const idGenerator = new UuidGenerator()
  const passwordHasher = new BcryptPasswordHasher()

  const createUser = new CreateUser(userRepository, idGenerator, passwordHasher)

  return new CreateUserController(createUser)
}