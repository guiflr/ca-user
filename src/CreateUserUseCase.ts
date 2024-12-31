export interface CreateUserUseCase {
  execute(input: { name: string; email: string; password: string }): Promise<{
    id: string
    name: string
    email: string
  }>
}
