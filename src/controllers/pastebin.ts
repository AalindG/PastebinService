import { Request, Response, NextFunction } from 'express'
import * as Pastebin from '../models/pastebin'

async function getPastebin(request: Request, response: Response, next: NextFunction) {
  const { pasteName } = request.params
  // const { apiKey } = request.headers
  // const apiKey = request.get('apiKey')

  const result = await Pastebin.getPastebin({ pasteName })


  response.status(200).json(result)
}

async function generatePastebin(request: Request, response: Response, next: NextFunction) {
  const { body } = request

  const result = await Pastebin.createPasteBin(body)

  response.status(200).json(result)
}

export {
  getPastebin,
  generatePastebin,
}
