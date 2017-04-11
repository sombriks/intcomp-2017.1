
const estado_inicial = { m1: { m: 3, c: 3 }, m2: { m: 0, c: 0 }, b: 'e' }

const solucao = []

const eh_solucao = (s) => s.m2.m == 3 && s.m2.c == 3

const eh_valido = (s) => {
  let valido = true
  if ((s.m1.m != 0 && s.m1.m < s.m1.c) || (s.m2.m != 0 && s.m2.m < s.m2.c) ||
    (s.m1.m > 3) || (s.m1.c > 3) || (s.m2.m > 3) || (s.m2.c > 3) || (s.m1.m < 0) ||
    (s.m1.c < 0) || (s.m2.m < 0) || (s.m2.c < 0))
    valido = false
  return valido
}
const move = (s, v1m, v2m, v1c, v2c, b) => {
  let n = JSON.parse(JSON.stringify(s))
  n.m1.m += v1m
  n.m2.m += v2m
  n.m1.c += v1c
  n.m2.c += v2c
  n.b = b
  return n
}

const e_mm = (s) => move(s, -2, 2, 0, 0, 'd')

const e_cc = (s) => move(s, 0, 0, -2, 2, 'd')

const e_mc = (s) => move(s, -1, 1, -1, 1, 'd')

const d_m = (s) => move(s, 1, -1, 0, 0, 'e')

const d_c = (s) => move(s, 0, 0, 1, -1, 'e')

const d_mc = (s) => move(s,1, -1, 1, -1, 'e')

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
    // barco na direita, traz um ou dois
    let novo = d_m(s)
    if (eh_valido(novo)) estados.push(novo)
    novo = d_c(s)
    if (eh_valido(novo)) estados.push(novo)
    novo = d_mc(s)
    if (eh_valido(novo)) estados.push(novo)
  }
  return estados
}

const solucao_tem = (e) => solucao.filter(s => JSON.stringify(s) == JSON.stringify(e)).length > 0

const busca_solucao = (estado) => {

  solucao.push(estado)

  if (eh_solucao(estado)) {
    console.log("Solucao encontrada:")
    console.log(solucao)
    process.exit(0)
  }

  let seguintes = cria_estados_validos(estado)
  seguintes.map(e => busca_solucao(e))

  if (!eh_solucao(estado)) {
    solucao.pop()
  }
}

busca_solucao(estado_inicial)
