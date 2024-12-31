import { Router } from 'express'
import { expressAdapter } from '../../adapters/ExpressAdapter'
import { makeCreateUserController } from '../../factory/CreateUserFactory'
const userRoutes = Router()

userRoutes.post('/users', expressAdapter(makeCreateUserController()))

export default userRoutes
