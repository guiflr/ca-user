import { CreateUserUseCase } from './UserUseCase'
import { IdGenerator } from '../IdGenerator'
import { PasswordHasher } from '../PasswordHasher'
import { User } from '../domain/User'
import { UserRepository } from '../repositories/UserRepository'

export class CreateUser implements CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private idGenerator: IdGenerator,
    private passwordHasher: PasswordHasher
  ) {}

  async execute(input: { name: string; email: string; password: string }) {
    const existingUser = await this.userRepository.findByEmail(input.email)
    if (existingUser) {
      throw new Error('Email already in use')
    }

    const { email, name, password } = input

    const user = await User.create(
      { name, email, password },
      this.idGenerator,
      this.passwordHasher
    )

    await this.userRepository.save(user)
    return user
  }
}
