import { UpdateUserPassowrdUseCase } from '../usecases/UserUseCase'
import { Controller, HttpRequest } from './Controller'

export class UpdateUserPasswordController implements Controller {
  constructor(private readonly updateUserPassword: UpdateUserPassowrdUseCase) {}

  async handle(request: HttpRequest): Promise<any> {
    try {
      const { id } = request.params
      const { password } = request.body
      console.log(request.params)
      console.log(request.body)
      if (!id || !password) {
        return {
          statusCode: 400,
          body: { error: 'ID and Password are required' }
        }
      }

      await this.updateUserPassword.execute({ id, password })

      return {
        statusCode: 200,
        body: { message: 'Password updated successfully' }
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        body: { error: error.message }
      }
    }
  }
}
