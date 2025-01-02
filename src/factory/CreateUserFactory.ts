import { CreateUser } from '../usecases/CreateUser'
import { CreateUserController } from '../controllers/CreateUserController'
import PrismaUserRepository from '../infra/repositories/PrismaUserRepository'
import { UuidGenerator } from '../adapters/uuid/UUIDGenerator'
import { BcryptPasswordHasher } from '../adapters/bcrypt/BcryptHasher'

export function makeCreateUserController(): CreateUserController {
  const userRepository = PrismaUserRepository
  const idGenerator = new UuidGenerator()
  const passwordHasher = new BcryptPasswordHasher()

  const createUser = new CreateUser(userRepository, idGenerator, passwordHasher)

  return new CreateUserController(createUser)
}
