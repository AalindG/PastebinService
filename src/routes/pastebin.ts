import express from 'express'

const pastebinRouter = express.Router()

import * as PastebinController from '../controllers/pastebin'
import { verifyUser } from '../middlewares'

pastebinRouter.get('/get/:pasteName', PastebinController.getPastebin)
pastebinRouter.post('/generate', verifyUser, PastebinController.generatePastebin)

export default pastebinRouter
