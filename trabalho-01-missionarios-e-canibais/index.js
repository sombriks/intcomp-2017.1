
const estado_inicial = { m1: { m: 3, c: 3 }, m2: { m: 0, c: 0 }, barco: "m1" }

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
  let novo = mm_m(s)
  if (eh_valido(novo))
    estados.push(novo)
  novo = mm_c(s)
  if (eh_valido(novo))
    estados.push(novo)
  novo = mc_m(s)
  if (eh_valido(novo))
    estados.push(novo)
  novo = mc_c(s)
  if (eh_valido(novo))
    estados.push(novo)
  novo = cc_m(s)
  if (eh_valido(novo))
    estados.push(novo)
  novo = cc_c(s)
  if (eh_valido(novo))
    estados.push(novo)
  return estados
}

const mm_m = (s) => {
  let novo = JSON.parse(JSON.stringify(s))
  novo.m1.m -= 1
  novo.m2.m += 1
  return novo
}

const mm_c = (s) => {
  let novo = JSON.parse(JSON.stringify(s))
  novo.m1.m -= 2
  novo.m1.c += 1
  novo.m2.m += 2
  novo.m2.c -= 1
  return novo
}

const mc_m = (s) => {
  let novo = JSON.parse(JSON.stringify(s))
  novo.m1.c -= 1
  novo.m2.c += 1
  return novo
}

const mc_c = (s) => {
  let novo = JSON.parse(JSON.stringify(s))
  novo.m1.m -= 1
  novo.m2.m += 1
  return novo
}

const cc_m = (s) => {
  let novo = JSON.parse(JSON.stringify(s))
  novo.m1.m += 1
  novo.m1.c -= 2
  novo.m2.m -= 1
  novo.m2.c += 2
  return novo
}

const cc_c = (s) => {
  let novo = JSON.parse(JSON.stringify(s))
  novo.m1.c -= 1
  novo.m2.c += 1
  return novo
}

busca_solucao(estado_inicial)
