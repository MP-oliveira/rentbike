/**
 * Backend RentBike - servidor local.
 * Variáveis de ambiente: .env (SUPABASE_*, MERCADOPAGO_ACCESS_TOKEN, FRONTEND_URL, PORT)
 */
import 'dotenv/config'
import app from './app.js'

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`RentBike API rodando em http://localhost:${PORT}`)
})
