import { IdGenerator } from '../IdGenerator'
import { PasswordHasher } from '../PasswordHasher'

export type UserUpdate = {
  name: string
  email: string
}

export class User {
  private constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password: string
  ) {}

  static async create(
    props: { name: string; email: string; password: string },
    idGenerator: IdGenerator,
    passwordHasher: PasswordHasher
  ): Promise<User> {
    User.validate(props)

    const id = idGenerator.generate()
    const hashedPassword = await passwordHasher.hash(props.password)

    return new User(id, props.name, props.email, hashedPassword)
  }

  private static validate(props: {
    name: string
    email: string
    password: string
  }) {
    if (!props.name) throw new Error('Name is required')
    if (!props.email || !props.email.includes('@'))
      throw new Error('Invalid email')
    if (!props.password || props.password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }
  }

  private static validateUpdate(props: { name: string; email: string }) {
    if (!props.name) throw new Error('Name is required')
    if (!props.email || !props.email.includes('@'))
      throw new Error('Invalid email')
  }

  static async update(props: {
    name: string
    email: string
  }): Promise<UserUpdate> {
    User.validateUpdate(props)

    const { email, name } = props

    return { name, email }
  }
}
