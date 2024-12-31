import { CreateUser } from '../CreateUser'
import { CreateUserController } from '../CreateUserController'

describe('CreateUserController', () => {
  const mockCreateUser: jest.Mocked<CreateUser> = {
    execute: jest.fn()
  } as unknown as jest.Mocked<CreateUser>

  const controller = new CreateUserController(mockCreateUser)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 201 when user is created successfully', async () => {
    mockCreateUser.execute.mockResolvedValueOnce({
      id: '1',
      name: 'Juca',
      email: 'juca@example.com',
      password: 'hashed-password'
    })

    const request = {
      body: {
        name: 'Juca',
        email: 'juca@example.com',
        password: '123456'
      }
    }

    const response = await controller.handle(request)

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      id: '1',
      name: 'Juca',
      email: 'juca@example.com'
    })
  })

  it('should return 400 when an error occurs', async () => {
    mockCreateUser.execute.mockRejectedValueOnce(
      new Error('Email already in use')
    )

    const request = {
      body: {
        name: 'Juca',
        email: 'juca@example.com',
        password: '123456'
      }
    }

    const response = await controller.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      message: 'Email already in use'
    })
  })
})
