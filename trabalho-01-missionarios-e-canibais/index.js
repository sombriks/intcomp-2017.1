
const estado_inicial = { m1: { m: 3, c: 3 }, m2: { m: 0, c: 0 } }

const solucao = []

const eh_solucao = (s) => s.m2.m == 3

const busca_solucao = (estado) => {

  solucao.push(estado)

  if (eh_solucao(estado)) {
    console.log("Solucao encontrada:")
    console.log(solucao)
    proccess.exit(0)
  }

  estado.seguintes = cria_estados_validos(estado)
  estado.seguintes.map(e => busca_solucao(e))
}

const cria_estados_validos = (s) => {
  let estados = []
  pode_mm_m(s) && estados.push(mm_m(s))
  pode_mm_c(s) && estados.push(mm_c(s))
  pode_mc_m(s) && estados.push(mc_m(s))
  pode_mc_c(s) && estados.push(mc_c(s))
  pode_cc_m(s) && estados.push(cc_m(s))
  pode_cc_c(s) && estados.push(cc_c(s))
  return estados
}

const pode_mm_m = (s) => s.m1.m - 2 >= s.m1.c
const pode_mm_c = (s) => s.m1.m - 2 > s.m1.c
const pode_mc_m = (s) => s.m2.m > s.m2.c
const pode_mc_c = (s) => s.m1.m > s.m1.c
const pode_cc_m = (s) => s.m2.m - 1 > s.m2.c
const pode_cc_c = (s) => s.m2.m >= s.m2.c + 2

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

console.log(solucao)