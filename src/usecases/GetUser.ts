import { User } from '../domain/User'
import { UserRepository } from '../repositories/UserRepository'
import { GetUserUseCase } from './UserUseCase'

interface GetUserInput {
  id: string
}

interface GetUserOutput {
  user: User | null
}

export class GetUser implements GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: GetUserInput): Promise<GetUserOutput> {
    const user = await this.userRepository.findById(input.id)
    if (!user) {
      throw new Error('User not found')
    }
    return { user }
  }
}
