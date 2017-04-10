
const estado_inicial = { m1: { m: 3, c: 3 }, m2: { m: 0, c: 0 }, barco: { m: 0, c: 0, l: 'e' } }

const solucao = []

const eh_solucao = (s) => s.m2.m == 3

const eh_valido = (s) => s.m1.m >= s.m1.c && s.m2.m >= s.m2.c ||
  (s.m1.m == 0 && s.m2.m >= s.m2.c) ||
  (s.m2.m == 0 && s.m1.m >= s.m1.c)

const busca_solucao = (estado) => {

  solucao.push(estado)

  if (eh_solucao(estado)) {
    console.log("Solucao encontrada:")
    console.log(solucao)
    process.exit(0)
  }

  estado.seguintes = cria_estados_validos(estado)
  estado.seguintes.map(e => busca_solucao(e))

  if (!eh_solucao(estado))
    solucao.pop()
}

const cria_estados_validos = (s) => {
  let estados = []

  return estados
}

busca_solucao(estado_inicial)
