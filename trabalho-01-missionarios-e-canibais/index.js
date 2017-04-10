
const estado_inicial = { m1: { m: 3, c: 3 }, m2: { m: 0, c: 0 }, b: 'e' }

const solucao = []

const eh_solucao = (s) => s.m2.m == 3

// XXX otimizar
const eh_valido = (s) => {
  let valido = true
  if (s.m1.m != 0 && s.m1.m < s.m1.c)
    valido = false
  if (s.m2.m != 0 && s.m2.m < s.m2.c)
    valido = false
  if (s.m1.m > 3)
    valido = false
  if (s.m1.c > 3)
    valido = false
  if (s.m2.m > 3)
    valido = false
  if (s.m2.c > 3)
    valido = false
  if (s.m1.m < 0)
    valido = false
  if (s.m1.c < 0)
    valido = false
  if (s.m2.m < 0)
    valido = false
  if (s.m2.c < 0)
    valido = false
  return valido
}

const busca_solucao = (estado) => {

  solucao.push(estado)

  console.log("parcial:")
  console.log(solucao)

  if (eh_solucao(estado)) {
    console.log("Solucao encontrada:")
    console.log(solucao)
    process.exit(0)
  }

  // TODO não precisamos dos seguintes aqui
  // falta verificar se os validos criados não contém algum estado pai
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

const e_mm = (s) => {
  let n = JSON.parse(JSON.stringify(s))
  n.m1.m -= 2
  n.m2.m += 2
  n.b = 'd'
  return n
}

const e_cc = (s) => {
  let n = JSON.parse(JSON.stringify(s))
  n.m1.c -= 2
  n.m2.c += 2
  n.b = 'd'
  return n
}

const e_mc = (s) => {
  let n = JSON.parse(JSON.stringify(s))
  n.m1.m -= 1
  n.m2.m += 1
  n.m1.c -= 1
  n.m2.c += 1
  n.b = 'd'
  return n
}

const d_m = (s) => {
  let n = JSON.parse(JSON.stringify(s))
  n.m2.m -= 1
  n.m1.m += 1
  n.b = 'e'
  return n
}

const d_c = (s) => {
  let n = JSON.parse(JSON.stringify(s))
  n.m2.c -= 1
  n.m1.c += 1
  n.b = 'e'
  return n
}

busca_solucao(estado_inicial)
