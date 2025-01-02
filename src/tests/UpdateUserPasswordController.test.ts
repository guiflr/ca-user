import { UpdateUserPasswordController } from '../controllers/UpdateUserPasswordController'
import { UpdateUserPassword } from '../usecases/UpdateUserPassword'

jest.mock('../usecases/UpdateUserPassword')

describe('UpdateUserPasswordController', () => {
  let mockUpdateUserPassword: jest.Mocked<UpdateUserPassword>
  let controller: UpdateUserPasswordController

  const request = {
    body: {
      password: 'new_secure_password'
    },
    params: { id: '123' }
  }

  beforeEach(() => {
    mockUpdateUserPassword = {
      execute: jest.fn()
    } as unknown as jest.Mocked<UpdateUserPassword>

    controller = new UpdateUserPasswordController(mockUpdateUserPassword)
  })

  it('should return 200 if the password is successfully updated', async () => {
    const response = await controller.handle(request)

    expect(mockUpdateUserPassword.execute).toHaveBeenCalledWith({
      id: '123',
      password: 'new_secure_password'
    })
    expect(response).toEqual({
      statusCode: 200,
      body: { message: 'Password updated successfully' }
    })
  })

  it('should return 400 if the ID or password is not provided', async () => {
    const request = {
      body: {
        password: 'new_secure_password'
      },
      params: {}
    }

    const response = await controller.handle(request)

    expect(mockUpdateUserPassword.execute).not.toHaveBeenCalled()
    expect(response).toEqual({
      statusCode: 400,
      body: { error: 'ID and Password are required' }
    })
  })

  it('should return 500 if the use case throws an error', async () => {
    mockUpdateUserPassword.execute.mockRejectedValueOnce(
      new Error('Something went wrong')
    )

    const response = await controller.handle(request)

    expect(mockUpdateUserPassword.execute).toHaveBeenCalledWith({
      id: '123',
      password: 'new_secure_password'
    })
    expect(response).toEqual({
      statusCode: 500,
      body: { error: 'Something went wrong' }
    })
  })
})
