import { User } from '../domain/User'
import { PasswordHasher } from '../adapters/PasswordHasher'
import { UserRepository } from '../repositories/UserRepository'
import { UpdateUserPassword } from '../usecases/UpdateUserPassword'

describe('UpdateUserPassword Use Case', () => {
  let mockUserRepository: jest.Mocked<UserRepository>
  let updateUserPassword: UpdateUserPassword
  let mockPasswordHasher: jest.Mocked<PasswordHasher>
  const user = {
    id: '123',
    name: 'Gui',
    email: 'gui@example.com',
    password: '123'
  }

  beforeEach(() => {
    mockUserRepository = {
      findById: jest.fn(),
      update: jest.fn()
    } as unknown as jest.Mocked<UserRepository>

    mockPasswordHasher = {
      hash: jest.fn(async (password) => `hashed-${password}`),
      compare: jest.fn()
    }

    updateUserPassword = new UpdateUserPassword(
      mockUserRepository,
      mockPasswordHasher
    )
  })

  it("should successfully update the user's password", async () => {
    const userSpy = jest.spyOn(User, 'updatePassword')
    mockUserRepository.findById.mockResolvedValueOnce(user)

    await updateUserPassword.execute({
      id: '123',
      password: 'new_password'
    })

    expect(userSpy).toHaveBeenCalledWith('new_password', mockPasswordHasher)
    expect(mockUserRepository.update).toHaveBeenCalledWith(user)
  })

  it('should throw an error if the user is not found', async () => {
    mockUserRepository.findById.mockResolvedValueOnce(null)

    await expect(
      updateUserPassword.execute({ id: '123', password: 'new_password' })
    ).rejects.toThrow('User not found')

    expect(mockUserRepository.update).not.toHaveBeenCalled()
  })

  it('should throw an error if the password is less than 6 characters', async () => {
    mockUserRepository.findById.mockResolvedValueOnce(user)

    await expect(
      updateUserPassword.execute({ id: '123', password: '123' })
    ).rejects.toThrow('Password must be at least 6 characters')

    expect(mockUserRepository.update).not.toHaveBeenCalled()
  })
})
