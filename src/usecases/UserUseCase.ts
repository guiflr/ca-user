import { User } from '../domain/User'

export interface CreateUserUseCase {
  execute(input: { name: string; email: string; password: string }): Promise<{
    id: string
    name: string
    email: string
  }>
}

interface GetUserInput {
  id: string
}

interface GetUserOutput {
  user: User | null
}

export interface GetUserUseCase {
  execute(input: GetUserInput): Promise<GetUserOutput>
}
