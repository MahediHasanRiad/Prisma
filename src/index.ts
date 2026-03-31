import express from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })
import cookieParser from 'cookie-parser'
import { CreateController } from './controller/create.controller.js'
import { CreatePostController } from './controller/create-post.controller.js'
import { loginController } from './controller/login.controller.js'
import { AuthVerity } from './utils/auth-verity.js'

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.post('/login', loginController)
app.post('/create', CreateController)
app.post('/create-post', AuthVerity, CreatePostController)


app.listen(3000, () => {
  console.log('server is on..')
})
