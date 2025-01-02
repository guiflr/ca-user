import { Router } from 'express'
import { expressAdapter } from '../../adapters/ExpressAdapter'
import { makeCreateUserController } from '../../factory/CreateUserFactory'
import { makeGetUserController } from '../../factory/GetUserFactory'
import { makeUpdateUserController } from '../../factory/UpdateUserFactory'
const userRoutes = Router()

userRoutes.post('/users', expressAdapter(makeCreateUserController()))
userRoutes.get('/users/:id', expressAdapter(makeGetUserController()))
userRoutes.put('/users/:id', expressAdapter(makeUpdateUserController()))

export default userRoutes
