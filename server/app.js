/**
 * App Express - exportado para uso local (index.js) e serverless (Vercel api/index.js).
 */
import express from 'express'
import cors from 'cors'
import { createPayment, webhook } from './routes/payment.js'

const app = express()

app.use(cors({ origin: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/api/create-payment', createPayment)
app.post('/api/webhook', express.json(), webhook)

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'rentbike-api' })
})

export default app
