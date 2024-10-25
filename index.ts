import express from 'express'
import loginController from './controllers/login-controller'

const app = express()
const port = 3100

app.get('/api', loginController.request)

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
