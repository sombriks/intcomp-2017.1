/**
 * Missionários e canibais
 * 
 * Características:
 * - temos um rio
 * - duas margens
 * - um barco para até duas pessoas
 * - três missionários
 * - três canibais
 * 
 * Regras:
 * - o barco só leva duas pessoas
 * - o barco se encontra em uma margem do rio apenas
 * - barco vazio não anda
 * - de modo algum pode haver mais canibais que missionários em uma das margens
 * - o estado de sucesso é mover todos os missionários e canibais de uma margem para outra
 * 
 * Implementação:
 */

const estado_icial = {
  margemA: { missionarios: 3, canibais: 3 },
  margemB: { missionarios: 0, canibais: 0 },
  valido: true, solucao: false
}

const solucao = []

let solucionado = false

const solucao_contem = (estado) =>
  solucao.filter(e =>
    JSON.stringify(e) == JSON.stringify(estado)).length > 0

const avalia_margem = (margem) => {
  let ret = false;
  if (margem.missionarios == 0)
    ret = margem.canibais <= 3 && margem.canibais >= 0
  else {
    ret = margem.missionarios - margem.canibais >= 0 &&
      margem.missionarios <= 3 && margem.canibais <= 3 &&
      margem.missionarios >= 0 && margem.canibais >= 0
  }
  return ret
}

const avalia_estado = (estado, filhos) => {
  // guess phase
  estado.valido = avalia_margem(estado.margemA) && avalia_margem(estado.margemB)
  estado.solucao = (estado.margemB.missionarios + estado.margemB.canibais == 6)
  if (estado.valido && !solucao_contem(estado))
    filhos.push(estado)
}

const leva_canibal_canibal_traz_canibal = (pai, filhos) => {
  const filho = JSON.parse(JSON.stringify(pai))
  filho.margemA.canibais -= 1
  filho.margemB.canibais += 1
  avalia_estado(filho, filhos)
}

const leva_canibal_canibal_traz_missionario = (pai, filhos) => {
  const filho = JSON.parse(JSON.stringify(pai))
  filho.margemA.canibais -= 2
  filho.margemA.missionarios += 1
  filho.margemB.canibais += 2
  filho.margemB.missionarios -= 1
  avalia_estado(filho, filhos)
}

const leva_missionario_missionario_traz_missionario = (pai, filhos) => {
  const filho = JSON.parse(JSON.stringify(pai))
  filho.margemA.missionarios -= 1
  filho.margemB.missionarios += 1
  avalia_estado(filho, filhos)
}

const leva_missionario_missionario_traz_canibal = (pai, filhos) => {
  const filho = JSON.parse(JSON.stringify(pai))
  filho.margemA.missionarios -= 2
  filho.margemA.canibais += 1
  filho.margemB.missionarios += 2
  filho.margemB.canibais -= 1
  avalia_estado(filho, filhos)
}

const leva_canibal_missionario_traz_canibal = (pai, filhos) => {
  const filho = JSON.parse(JSON.stringify(pai))
  filho.margemA.missionarios -= 1
  filho.margemB.missionarios += 1
  avalia_estado(filho, filhos)
}

const leva_canibal_missionario_traz_missionario = (pai, filhos) => {
  const filho = JSON.parse(JSON.stringify(pai))
  filho.margemA.canibais -= 1
  filho.margemB.canibais += 1
  avalia_estado(filho, filhos)
}

const gera_filhos = (estado) => {
  const filhos = []
  leva_canibal_canibal_traz_canibal(estado, filhos)
  leva_canibal_canibal_traz_missionario(estado, filhos)
  leva_missionario_missionario_traz_missionario(estado, filhos)
  leva_missionario_missionario_traz_canibal(estado, filhos)
  leva_canibal_missionario_traz_canibal(estado, filhos)
  leva_canibal_missionario_traz_missionario(estado, filhos)
  return filhos
}

const busca_solucao = () => busca_solucao_rec(estado_icial)

const busca_solucao_rec = (estado) => {

  if (!estado.valido || solucionado)
    return

  solucao.push(estado)

  if (estado.solucao) {
    solucionado = true
    return
  }

  const filhos = gera_filhos(estado)

  while (filhos.length)
    busca_solucao_rec(filhos.pop())

}

busca_solucao()

console.log("***\nsolução %s encontrada\n***", solucionado ? "" : "não")
console.log(solucao)
