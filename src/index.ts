import express, { Express } from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRouter from './routes/user'
import pastebinRouter from './routes/pastebin'

dotenv.config()

const app: Express = express()

app.use(helmet())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT

app.use('/pastebin', pastebinRouter)
app.use('/user', userRouter)
// app.use('/', redirectToRouter)

app.listen(PORT, async () => {
  const { MONGO_DBNAME, MONGO_HOSTS } = process.env
  await mongoose.connect(`mongodb://${MONGO_HOSTS}/${MONGO_DBNAME}`)
    .then(() => {
      console.log('Connected to DB.');
    })

  console.log(`Server started at ${PORT}`);
})
