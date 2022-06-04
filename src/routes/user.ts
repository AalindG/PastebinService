import express from 'express'

const userRouter = express.Router()

import * as UserController from '../controllers/user'

userRouter.post('/create', UserController.createUser)

export default userRouter
