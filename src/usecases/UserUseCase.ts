import { User } from '../domain/User'

export interface CreateUserUseCase {
  execute(input: {
    name: string
    email: string
    password: string
  }): Promise<User>
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

export interface UpdateUserInput {
  id: string
  name: string
  email: string
}
export interface UpdateUserUseCase {
  execute(input: UpdateUserInput): Promise<void>
}

export interface UpdateUserPasswordInput {
  id: string
  password: string
}
export interface UpdateUserPassowrdUseCase {
  execute(input: UpdateUserPasswordInput): Promise<void>
}
