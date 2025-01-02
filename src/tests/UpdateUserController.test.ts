import { UpdateUserController } from '../controllers/UpdateUserController'
import { UpdateUser } from '../usecases/UpdateUser'

jest.mock('../usecases/UpdateUser')

describe('UpdateUserController', () => {
  let mockUpdateUser: jest.Mocked<UpdateUser>
  let controller: UpdateUserController

  beforeEach(() => {
    mockUpdateUser = {
      execute: jest.fn()
    } as unknown as jest.Mocked<UpdateUser>

    controller = new UpdateUserController(mockUpdateUser)
  })

  it('should return 200 if user update', async () => {
    const request = {
      body: {
        name: 'Jane Doe',
        email: 'email@email.com'
      },
      params: { id: '123' }
    }

    const response = await controller.handle(request)

    expect(mockUpdateUser.execute).toHaveBeenCalledWith({
      id: '123',
      name: 'Jane Doe',
      email: 'email@email.com'
    })
    expect(response).toEqual({
      statusCode: 200,
      body: { message: 'User updated successfully' }
    })
  })

  it('should return 500 if the use case throws an error', async () => {
    mockUpdateUser.execute.mockRejectedValueOnce(
      new Error('Something went wrong')
    )

    const request = {
      body: {
        name: 'Jane Doe',
        email: 'email@email.com'
      },
      params: { id: '123' }
    }

    const response = await controller.handle(request)

    expect(mockUpdateUser.execute).toHaveBeenCalledWith({
      id: '123',
      name: 'Jane Doe',
      email: 'email@email.com'
    })
    expect(response).toEqual({
      statusCode: 500,
      body: { message: 'Something went wrong' }
    })
  })
})
