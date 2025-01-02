import { User } from '../domain/User'
import { UserRepository } from '../repositories/UserRepository'
import { UpdateUserInput, UpdateUserUseCase } from './UserUseCase'

export class UpdateUser implements UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: UpdateUserInput): Promise<void> {
    const user = await this.userRepository.findById(input.id)

    if (!user) {
      throw new Error('User not found')
    }

    const newData = await User.update({ name: input.name, email: input.email })

    const data = Object.assign(user, { ...newData })

    await this.userRepository.update(data)
  }
}
