import { Router } from 'express'
import { expressAdapter } from '../../adapters/ExpressAdapter'
import { makeCreateUserController } from '../../factory/CreateUserFactory'
import { makeGetUserController } from '../../factory/GetUserFactory'
const userRoutes = Router()

userRoutes.post('/users', expressAdapter(makeCreateUserController()))
userRoutes.get('/users/:id', expressAdapter(makeGetUserController()))

export default userRoutes
