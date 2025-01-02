import { User } from '../domain/User'
import { PasswordHasher } from '../adapters/PasswordHasher'
import { UserRepository } from '../repositories/UserRepository'

interface UpdateUserPasswordInput {
  id: string
  password: string
}

export class UpdateUserPassword {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async execute(input: UpdateUserPasswordInput): Promise<void> {
    const user = await this.userRepository.findById(input.id)

    if (!user) {
      throw new Error('User not found')
    }

    const newPassword = await User.updatePassword(
      input.password,
      this.passwordHasher
    )

    const updatedPassword: User = Object.assign(user, { password: newPassword })

    await this.userRepository.update(updatedPassword)
  }
}
