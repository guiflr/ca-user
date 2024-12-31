import { Controller } from './Controller'
import { CreateUserUseCase } from '../usecases/UserUseCase'

export interface HttpRequest {
  body: Record<string, any>
}

export interface HttpResponse {
  statusCode: number
  body: any
}

export class CreateUserController implements Controller {
  constructor(private createUser: CreateUserUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password } = request.body

      const user = await this.createUser.execute({ name, email, password })

      return {
        statusCode: 201,
        body: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
    } catch (error: any) {
      return {
        statusCode: 400,
        body: {
          message: error.message || 'Unexpected error'
        }
      }
    }
  }
}
