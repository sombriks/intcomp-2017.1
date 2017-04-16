
const estado_inicial = { 
  a: 8, b: 2, c: 3, 
  d: 1, e: 0, f: 4, 
  g: 7, h: 6, i: 5 
}

const estado_solucao = { 
  a: 1, b: 2, c: 3, 
  d: 4, e: 5, f: 6, 
  g: 7, h: 8, i: 0 
}

const eh_solucao = (s) => JSON.stringify(s) == JSON.stringify(estado_solucao)

const gera_proximos = (s) => {
  const lista = []
  can_zero_esquerda(s) && lista.push(zero_esquerda(s))
  can_zero_cima(s) && lista.push(zero_cima(s))
  can_zero_direita(s) && lista.push(zero_direita(s))
  can_zero_baixo(s) && lista.push(zero_baixo(s))
  return lista
}