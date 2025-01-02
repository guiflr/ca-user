import { User } from '../domain/User'
import { PasswordHasher } from '../PasswordHasher'
import { UserRepository } from '../repositories/UserRepository'
import { UpdateUser } from '../usecases/UpdateUser'

jest.mock('../domain/User')

describe('UpdateUser Use Case', () => {
  let mockUserRepository: jest.Mocked<UserRepository>
  let updateUser: UpdateUser
  let mockPasswordHasher: jest.Mocked<PasswordHasher>

  beforeEach(() => {
    mockUserRepository = {
      findById: jest.fn(),
      update: jest.fn()
    } as unknown as jest.Mocked<UserRepository>

    mockPasswordHasher = {
      hash: jest.fn(async (password) => `hashed-${password}`),
      compare: jest.fn()
    }

    updateUser = new UpdateUser(mockUserRepository)
  })

  it('should call the update method on the User entity', async () => {
    const user = {
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      password: '123'
    }

    mockUserRepository.findById.mockResolvedValueOnce(user)

    const updateSpy = jest.spyOn(User, 'update')

    await updateUser.execute({
      id: '123',
      name: 'Jane Doe',
      email: 'john@example.com'
    })

    expect(updateSpy).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'john@example.com'
    })
    expect(mockUserRepository.update).toHaveBeenCalledWith(user)
  })

  it('should throw an error if the user is not found', async () => {
    mockUserRepository.findById.mockResolvedValueOnce(null)

    await expect(
      updateUser.execute({
        id: '123',
        name: 'Jane Doe',
        email: 'john@example.com'
      })
    ).rejects.toThrow('User not found')
    expect(mockUserRepository.update).not.toHaveBeenCalled()
  })
})
