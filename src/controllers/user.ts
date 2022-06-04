import { Request, Response, NextFunction } from 'express'
import * as UserModel from '../models/user'

async function createUser(request: Request, response: Response, next: NextFunction) {
  const { userName } = request.body

  const result = await UserModel.createUser({ userName })
  response.status(200).json(result)
}

export {
  createUser
}
