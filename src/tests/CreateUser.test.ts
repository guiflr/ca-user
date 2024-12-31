import { CreateUser } from '../usecases/CreateUser'
import { IdGenerator } from '../IdGenerator'
import { PasswordHasher } from '../PasswordHasher'
import { UserRepository } from '../repositories/UserRepository'

describe('CreateUser Use Case', () => {
  const mockUserRepository: jest.Mocked<UserRepository> = {
    findByEmail: jest.fn(),
    save: jest.fn()
  } as unknown as jest.Mocked<UserRepository>

  const mockIdGenerator: jest.Mocked<IdGenerator> = {
    generate: jest.fn(() => 'mocked-id')
  }

  const mockPasswordHasher: jest.Mocked<PasswordHasher> = {
    hash: jest.fn(async (password) => `hashed-${password}`),
    compare: jest.fn()
  }

  const createUser = new CreateUser(
    mockUserRepository,
    mockIdGenerator,
    mockPasswordHasher
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should throw an error if input data is invalid', async () => {
    const input = {
      name: '',
      email: 'invalid-email',
      password: '123'
    }

    await expect(createUser.execute(input)).rejects.toThrow()

    expect(mockUserRepository.findByEmail).toHaveBeenCalled()
    expect(mockUserRepository.save).not.toHaveBeenCalled()
  })

  it('should create a user', async () => {
    mockUserRepository.findByEmail.mockResolvedValueOnce(null)
    mockUserRepository.save.mockResolvedValueOnce(undefined)

    const input = {
      name: 'Juca',
      email: 'juca@example.com',
      password: '123456'
    }

    const user = await createUser.execute(input)

    expect(user.id).toBe('mocked-id')
    expect(user.name).toBe(input.name)
    expect(user.email).toBe(input.email)
    expect(user.password).toBe('hashed-123456')

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(input.email)
    expect(mockUserRepository.save).toHaveBeenCalledWith(user)
    expect(mockIdGenerator.generate).toHaveBeenCalledTimes(1)
    expect(mockPasswordHasher.hash).toHaveBeenCalledWith(input.password)
  })

  it('should throw an error if email is already exists', async () => {
    mockUserRepository.findByEmail.mockResolvedValueOnce({
      id: 'existing-id',
      name: 'Jane',
      email: 'juca@example.com',
      password: 'hashed-123456'
    })

    const input = {
      name: 'Juca',
      email: 'juca@example.com',
      password: '123456'
    }

    await expect(createUser.execute(input)).rejects.toThrow(
      'Email already in use'
    )

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(input.email)
    expect(mockUserRepository.save).not.toHaveBeenCalled()
  })
})
