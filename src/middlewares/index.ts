import { NextFunction, Response, Request } from "express";
import User from '../schema/user'

async function verifyUser(request: Request, response: Response, next: NextFunction) {
  // await client.connect()
  const apiKey = request.get('apiKey')

  const user = await User.findOne({ apiKey })

  const { userId } = user

  if (!userId) {
    const error = new Error('Client not authorised')
    next(error)
  }

  request.body.userId = userId
  request.body.apiKey = apiKey
  next()
}

export { verifyUser }
