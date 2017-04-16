
const solucao = [] // array de estados com o caminho de solucoes

const estado_inicial = { m1: { m: 3, c: 3 }, m2: { m: 0, c: 0 }, b: 'e' }

const eh_solucao = (s) => s.m2.m == 3 && s.m2.c == 3 // pra saber se resolveu

const eh_valido = (s) => {
  let valido = true
  if ((s.m1.m != 0 && s.m1.m < s.m1.c) || (s.m2.m != 0 && s.m2.m < s.m2.c) ||
    (s.m1.m > 3) || (s.m1.c > 3) || (s.m2.m > 3) || (s.m2.c > 3) || 
    (s.m1.m < 0) || (s.m1.c < 0) || (s.m2.m < 0) || (s.m2.c < 0))
    valido = false // todos os casos invalidos
  return valido
}

const move = (s, v1m, v2m, v1c, v2c, b) => {
  let n = JSON.parse(JSON.stringify(s))
  n.m1.m += v1m
  n.m2.m += v2m
  n.m1.c += v1c
  n.m2.c += v2c
  n.b = b
  return n // regra generica de movimento entre as margens
}

const cria_estados_validos = (s) => {
  let estados = [] // aqui a inteligencia pra criar estados a partir de um recebido
  if (s.b == 'e') {
    // barco na esquerda, leva dois
    let novo = move(s, -2, 2, 0, 0, 'd')
    if (eh_valido(novo)) estados.push(novo)
    novo = move(s, 0, 0, -2, 2, 'd')
    if (eh_valido(novo)) estados.push(novo)
    novo = move(s, -1, 1, -1, 1, 'd')
    if (eh_valido(novo)) estados.push(novo)
  } else {
    // barco na direita, traz um ou dois
    let novo = move(s, 1, -1, 0, 0, 'e')
    if (eh_valido(novo)) estados.push(novo)
    novo = move(s, 0, 0, 1, -1, 'e')
    if (eh_valido(novo)) estados.push(novo)
    novo = move(s,1, -1, 1, -1, 'e')
    if (eh_valido(novo)) estados.push(novo)
  }
  return estados
}

// hora de ser recursivo
const busca_solucao = (estado) => {

  solucao.push(estado)

  if (eh_solucao(estado)) {
    console.log("Solucao encontrada:")
    console.log(solucao)
    process.exit(0) // aborta pra findar a recursao
  }
  
  // para cada estado possivel a partir do atual, buscar solucao para eles
  cria_estados_validos(estado).map(e => busca_solucao(e))

  if (!eh_solucao(estado)) 
    solucao.pop()
}

// bootstrap aqui mesmo
busca_solucao(estado_inicial)
