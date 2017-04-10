
const estado_inicial = { m1: { m: 3, c: 3 }, m2: { m: 0, c: 0 }, b: 'e' }

const solucao = []

const eh_solucao = (s) => s.m2.m == 3

const eh_valido = (s) => {
  return s.m1.m >= s.m1.c && s.m2.m >= s.m2.c
}

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
  if (s.b == 'e') {
    // barco na esquerda, leva dois
    let novo = e_mm(s)
    if (eh_valido(novo)) estados.push(novo)
    novo = e_cc(s)
    if (eh_valido(novo)) estados.push(novo)
    novo = e_mc(s)
    if (eh_valido(novo)) estados.push(novo)
  } else {
    // barco na direita, traz um
    let novo = d_m(s)
    if (eh_valido(novo)) estados.push(novo)
    novo = d_c(s)
    if (eh_valido(novo)) estados.push(novo)
  }
  return estados
}



busca_solucao(estado_inicial)
