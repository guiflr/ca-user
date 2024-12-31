import { HttpRequest } from '../controllers/Controller'
import { GetUserController } from '../controllers/GetUserController'
import { GetUser } from '../usecases/GetUser'

describe('GetUserController', () => {
  let mockGetUser: jest.Mocked<GetUser>
  let controller: GetUserController

  beforeEach(() => {
    mockGetUser = {
      execute: jest.fn()
    } as unknown as jest.Mocked<GetUser>

    controller = new GetUserController(mockGetUser)
  })

  it('should return user and status 200', async () => {
    const user = {
      id: '123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'hashed_password'
    }

    mockGetUser.execute.mockResolvedValueOnce({ user })

    const httpRequest: HttpRequest = {
      params: { id: '123' }
    }

    const httpResponse = await controller.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(user)
    expect(mockGetUser.execute).toHaveBeenCalledWith({ id: '123' })
  })

  it('should return status 404 is user not found', async () => {
    mockGetUser.execute.mockRejectedValueOnce(new Error('User not found'))

    const httpRequest: HttpRequest = {
      params: { id: '123' }
    }

    const httpResponse = await controller.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse.body).toEqual({ message: 'User not found' })
    expect(mockGetUser.execute).toHaveBeenCalledWith({ id: '123' })
  })
})
