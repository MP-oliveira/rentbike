/**
 * Backend RentBike - servidor local.
 * Variáveis de ambiente: .env (SUPABASE_*, MERCADOPAGO_ACCESS_TOKEN, FRONTEND_URL, PORT)
 */
import 'dotenv/config'
import app from './app.js'

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`RentBike API rodando em http://localhost:${PORT}`)
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Porta ${PORT} já está em uso. Feche o processo que a usa ou defina PORT no .env.`)
  } else {
    console.error('Erro ao iniciar o servidor:', err.message)
  }
  process.exit(1)
})
