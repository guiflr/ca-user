import { GetUser } from '../usecases/GetUser'
import { Controller, HttpRequest, HttpResponse } from './Controller'

export class GetUserController implements Controller {
  constructor(private readonly getUser: GetUser) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params

      const result = await this.getUser.execute({ id })

      return {
        statusCode: 200,
        body: result.user
      }
    } catch (error: any) {
      return {
        statusCode: 404,
        body: { message: error.message || 'User not found' }
      }
    }
  }
}
