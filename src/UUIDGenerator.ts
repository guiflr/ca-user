import { randomUUID } from 'crypto'
import { IdGenerator } from './IdGenerator'

export class UuidGenerator implements IdGenerator {
  generate(): string {
    return randomUUID()
  }
}
