import { User } from '../domain/User'
import { UserRepository } from '../repositories/UserRepository'
import { GetUser } from '../usecases/GetUser'

describe('GetUser Use Case', () => {
  let mockUserRepository: jest.Mocked<UserRepository>
  let getUser: GetUser

  beforeEach(() => {
    mockUserRepository = {
      findById: jest.fn()
    } as unknown as jest.Mocked<UserRepository>

    getUser = new GetUser(mockUserRepository)
  })

  it('should return an user', async () => {
    const user: User = {
      id: '123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'hashed_password'
    }

    mockUserRepository.findById.mockResolvedValueOnce(user)

    const result = await getUser.execute({ id: '123' })

    expect(result.user).toEqual(user)
    expect(mockUserRepository.findById).toHaveBeenCalledWith('123')
  })

  it('should trown an error when user not found', async () => {
    mockUserRepository.findById.mockResolvedValueOnce(null)

    await expect(getUser.execute({ id: '123' })).rejects.toThrow(
      'User not found'
    )
    expect(mockUserRepository.findById).toHaveBeenCalledWith('123')
  })

  it('should trown an error when repository fails', async () => {
    mockUserRepository.findById.mockRejectedValueOnce(
      new Error('Repository error')
    )

    await expect(getUser.execute({ id: '123' })).rejects.toThrow(
      'Repository error'
    )
    expect(mockUserRepository.findById).toHaveBeenCalledWith('123')
  })
})
