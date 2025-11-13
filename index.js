




/*class ServicoCalculoFatura {

   calcularCredito(pecas, apre) {
    let creditos = Math.max(apre.audiencia - 30, 0);
    if (pecas[apre.id].tipo === "comedia")
      creditos += Math.floor(apre.audiencia / 5);
    return creditos;
   }
   
   calcularTotalCreditos(pecas, apresentacoes) {
      let total = 0;
      for (let apre of apresentacoes)
      total += this.calcularCredito(pecas, apre);
    return total;

   }
   
   calcularTotalApresentacao(pecas, apre) {
      const peca = pecas[apre.id];
      let total = 0;
      switch (peca.tipo) {
        case "tragedia":
        total = 40000;
         if (apre.audiencia > 30)
          total += 1000 * (apre.audiencia - 30);
        break;
        case "comedia":
        total = 30000;
         if (apre.audiencia > 20)
          total += 10000 + 500 * (apre.audiencia - 20);
        total += 300 * apre.audiencia;
        break;
      default:
        throw new Error(`Peça desconhecida: ${peca.tipo}`);
    }
    return total;
   }
   
   calcularTotalFatura(pecas, apresentacoes) {
      let total = 0;
      for (let apre of apresentacoes)
      total += this.calcularTotalApresentacao(pecas, apre);
    return total;
   }
}
*/




const { readFileSync } = require('fs');

class Repositorio {
  constructor() {
    this.pecas = JSON.parse(readFileSync('./pecas.json'));
  }

  getPeca(apre) {
    return this.pecas[apre.id];
  }
}

class ServicoCalculoFatura {

   constructor(repo) {
     this.repo = repo;
  }
  
 calcularCredito(apre) {
    let creditos = Math.max(apre.audiencia - 30, 0);
    if (this.repo.getPeca(apre).tipo === "comedia")
      creditos += Math.floor(apre.audiencia / 5);
    return creditos;
  }

  calcularTotalCreditos(apresentacoes) {
    let total = 0;
    for (let apre of apresentacoes)
      total += this.calcularCredito(apre);
    return total;
  }

  calcularTotalApresentacao(apre) {
    const peca = this.repo.getPeca(apre);
    let total = 0;
    switch (peca.tipo) {
      case "tragedia":
        total = 40000;
        if (apre.audiencia > 30)
          total += 1000 * (apre.audiencia - 30);
        break;
      case "comedia":
        total = 30000;
        if (apre.audiencia > 20)
          total += 10000 + 500 * (apre.audiencia - 20);
        total += 300 * apre.audiencia;
        break;
      default:
        throw new Error(`Peça desconhecida: ${peca.tipo}`);
    }
    return total;
  }

  calcularTotalFatura(apresentacoes) {
    let total = 0;
    for (let apre of apresentacoes)
      total += this.calcularTotalApresentacao(apre);
    return total;
  }
} 
// commit 2
//function getPeca(pecas, apre) {
  //return pecas[apre.id];
//}


// commit 1
/*function calcularTotalApresentacao(pecas, apre) {
  const peca = getPeca(pecas, apre);
  let total = 0;
  switch (peca.tipo) {
    case "tragedia":
      total = 40000;
      if (apre.audiencia > 30) {
        total += 1000 * (apre.audiencia - 30);
      }
      break;
    case "comedia":
      total = 30000;
      if (apre.audiencia > 20) {
        total += 10000 + 500 * (apre.audiencia - 20);
      }
      total += 300 * apre.audiencia;
      break;
    default:
      throw new Error(`Peça desconhecida: ${peca.tipo}`);
  }
  return total;
}

// commit 3
function calcularCredito(pecas, apre) {
  let creditos = 0;
  creditos += Math.max(apre.audiencia - 30, 0);
  if (getPeca(pecas, apre).tipo === "comedia")
    creditos += Math.floor(apre.audiencia / 5);
  return creditos;
}
*/
function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  }).format(valor / 100);
}

/*function calcularTotalFatura(pecas, apresentacoes) {
  let total = 0;
  for (let apre of apresentacoes) {
    total += calcularTotalApresentacao(pecas, apre);
  }
  return total;
}

function calcularTotalCreditos(pecas, apresentacoes) {
  let total = 0;
  for (let apre of apresentacoes) {
    total += calcularCredito(pecas, apre);
  }
  return total;
}
*/

function gerarFaturaStr(fatura, calc) {
  let faturaStr = `Fatura ${fatura.cliente}\n`;

  for (let apre of fatura.apresentacoes) {
    faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
  }

  faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))}\n`;
  faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)}\n`;

  return faturaStr;
}

//commit 6
/*function gerarFaturaHTML(fatura, pecas) {
  let faturaHTML = `<html>\n`;
  faturaHTML += `<p> Fatura ${fatura.cliente} </p>\n`;
  faturaHTML += `<ul>\n`;

  for (let apre of fatura.apresentacoes) {
    faturaHTML += `<li> ${getPeca(pecas, apre).nome}: ${formatarMoeda(calcularTotalApresentacao(pecas, apre))} (${apre.audiencia} assentos) </li>\n`;
  }

  faturaHTML += `</ul>\n`;
  faturaHTML += `<p> Valor total: ${formatarMoeda(calcularTotalFatura(pecas, fatura.apresentacoes))} </p>\n`;
  faturaHTML += `<p> Créditos acumulados: ${calcularTotalCreditos(pecas, fatura.apresentacoes)} </p>\n`;
  faturaHTML += `</html>`;

  return faturaHTML;

}
*/

//const faturas = JSON.parse(readFileSync('./faturas.json'));
//const pecas = JSON.parse(readFileSync('./pecas.json'));
//const faturaStr = gerarFaturaStr(faturas, pecas);
//console.log(gerarFaturaHTML(faturas, pecas));
//const calc = new ServicoCalculoFatura();
//const faturaStr = gerarFaturaStr(faturas, pecas, calc);
//console.log(faturaStr);
const faturas = JSON.parse(readFileSync('./faturas.json'));
const calc = new ServicoCalculoFatura(new Repositorio());
const faturaStr = gerarFaturaStr(faturas, calc);
console.log(faturaStr);

