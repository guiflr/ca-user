import { UpdateUser } from '../usecases/UpdateUser'
import { Controller, HttpRequest, HttpResponse } from './Controller'

export class UpdateUserController implements Controller {
  constructor(private readonly updateUser: UpdateUser) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params
      const { name, email } = request.body

      await this.updateUser.execute({ id, name, email })

      return {
        statusCode: 200,
        body: { message: 'User updated successfully' }
      }
    } catch (error: any) {
      return {
        statusCode: error.message === 'User not found' ? 404 : 500,
        body: { message: error.message || 'Unexpected error' }
      }
    }
  }
}
