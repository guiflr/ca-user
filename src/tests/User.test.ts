import { IdGenerator } from '../adapters/IdGenerator'
import { PasswordHasher } from '../adapters/PasswordHasher'
import { User } from '../domain/User'

describe('User Domain', () => {
  const mockIdGenerator: IdGenerator = {
    generate: jest.fn(() => 'mocked-id')
  }

  const mockPasswordHasher: PasswordHasher = {
    hash: jest.fn(async (password) => `hashed-${password}`),
    compare: jest.fn()
  }

  it('should create a valid user', async () => {
    const user = await User.create(
      { name: 'Juca', email: 'juca@example.com', password: '123456' },
      mockIdGenerator,
      mockPasswordHasher
    )

    expect(user.id).toBe('mocked-id')
    expect(user.name).toBe('Juca')
    expect(user.email).toBe('juca@example.com')
    expect(user.password).toBe('hashed-123456')
    expect(mockIdGenerator.generate).toHaveBeenCalledTimes(1)
    expect(mockPasswordHasher.hash).toHaveBeenCalledWith('123456')
  })

  it('should throw an error if name is missing', async () => {
    await expect(
      User.create(
        { name: '', email: 'juca@example.com', password: '123456' },
        mockIdGenerator,
        mockPasswordHasher
      )
    ).rejects.toThrow('Name is required')
  })

  it('should throw an error if email is invalid', async () => {
    await expect(
      User.create(
        { name: 'Juca', email: 'invalid-email', password: '123456' },
        mockIdGenerator,
        mockPasswordHasher
      )
    ).rejects.toThrow('Invalid email')
  })

  it('should throw an error if password is too short', async () => {
    await expect(
      User.create(
        { name: 'Juca', email: 'juca@example.com', password: '123' },
        mockIdGenerator,
        mockPasswordHasher
      )
    ).rejects.toThrow('Password must be at least 6 characters')
  })

  it('should hash the password', async () => {
    const user = await User.create(
      { name: 'Jane Doe', email: 'jane@example.com', password: 'mypassword' },
      mockIdGenerator,
      mockPasswordHasher
    )

    expect(user.password).toBe('hashed-mypassword')
    expect(user.password).not.toBe('mypassword')
  })
})
