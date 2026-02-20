/**
 * Regras de marcação: cálculo de end_at e valor por tipo de aluguel.
 */
const PRICES = {
  avulso: 25,
  diaria: 80,
  mensal: 200,
}

/**
 * Dada a data/hora de início e o tipo, retorna end_at e amount.
 */
export function getRentalEndAndAmount(rentalType, startAt) {
  const start = new Date(startAt)
  let end
  switch (rentalType) {
    case 'avulso':
      end = new Date(start.getTime() + 30 * 60 * 1000)
      break
    case 'diaria':
      end = new Date(start)
      end.setUTCDate(end.getUTCDate() + 1)
      end.setUTCHours(0, 0, 0, 0)
      break
    case 'mensal':
      end = new Date(start)
      end.setUTCMonth(end.getUTCMonth() + 1)
      end.setUTCHours(0, 0, 0, 0)
      break
    default:
      end = new Date(start.getTime() + 30 * 60 * 1000)
  }
  const amount = PRICES[rentalType] ?? PRICES.avulso
  return { end_at: end.toISOString(), amount }
}

export { PRICES }
