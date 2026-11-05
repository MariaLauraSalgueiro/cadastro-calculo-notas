
const formulario = document.querySelector("#form-aluno");
const campoNome = document.querySelector("#nome");
const campoIdade = document.querySelector("#idade");
const campoNota1 = document.querySelector("#nota1");
const campoNota2 = document.querySelector("#nota2");
const campoNota3 = document.querySelector("#nota3");
const btnLimpar = document.querySelector("#btn-limpar");

const mensagemErro = document.querySelector("#mensagem-erro");
const areaResultado = document.querySelector("#area-resultado");

const resNome = document.querySelector("#res-nome");
const resIdade = document.querySelector("#res-idade");
const resNotas = document.querySelector("#res-notas");
const resMedia = document.querySelector("#res-media");
const resSituacao = document.querySelector("#res-situacao");

const resMaiorNota = document.querySelector("#res-maior-nota");
const resMenorNota = document.querySelector("#res-menor-nota");
const resPontosInfo = document.querySelector("#res-pontos-info");
const resMensagemCustom = document.querySelector("#res-mensagem-custom");


function exibirErro(mensagem) {
  mensagemErro.textContent = mensagem;
  mensagemErro.classList.remove("oculta");
  areaResultado.classList.add("oculta");
}


function limparErro() {
  mensagemErro.textContent = "";
  mensagemErro.classList.add("oculta");
}


formulario.addEventListener("submit", function (evento) {
 
  evento.preventDefault();
  limparErro();


  const nomeTratado = campoNome.value.trim();
  const textoIdade = campoIdade.value.trim();
  const textoNota1 = campoNota1.value.trim();
  const textoNota2 = campoNota2.value.trim();
  const textoNota3 = campoNota3.value.trim();


  if (nomeTratado === "") {
    exibirErro("Erro: Por favor, informe um nome válido (não pode ficar em branco).");
    return;
  }

  if (textoIdade === "") {
    exibirErro("Erro: Por favor, informe a idade do aluno.");
    return;
  }

  const idadeVal = Number(textoIdade);

  if (!Number.isFinite(idadeVal) || !Number.isInteger(idadeVal) || idadeVal <= 0) {
    exibirErro("Erro: A idade deve ser um número inteiro maior que zero.");
    return;
  }

  if (textoNota1 === "" || textoNota2 === "" || textoNota3 === "") {
    exibirErro("Erro: Todas as três notas devem ser preenchidas.");
    return;
  }

  const n1 = Number(textoNota1);
  const n2 = Number(textoNota2);
  const n3 = Number(textoNota3);

  if (!Number.isFinite(n1) || n1 < 0 || n1 > 10) {
    exibirErro("Erro: A primeira nota deve ser um número válido entre 0 e 10.");
    return;
  }

  if (!Number.isFinite(n2) || n2 < 0 || n2 > 10) {
    exibirErro("Erro: A segunda nota deve ser um número válido entre 0 e 10.");
    return;
  }

  if (!Number.isFinite(n3) || n3 < 0 || n3 > 10) {
    exibirErro("Erro: A terceira nota deve ser um número válido entre 0 e 10.");
    return;
  }

  const media = (n1 + n2 + n3) / 3;

  let situacao = "";
  let classeCSS = "";
  let mensagemCustomizada = "";

  if (media >= 7) {
    situacao = "Aprovado";
    classeCSS = "aprovado";
    mensagemCustomizada = `Parabéns, ${nomeTratado}! Você teve um excelente desempenho!`;
  } else if (media >= 5) {
    situacao = "Recuperação";
    classeCSS = "recuperacao";
    mensagemCustomizada = `Atenção, ${nomeTratado}! Você está de recuperação, estude para a prova final.`;
  } else {
    situacao = "Reprovado";
    classeCSS = "reprovado";
    mensagemCustomizada = `Infelizmente, ${nomeTratado}, você foi reprovado. Não desista e se dedique no próximo ciclo.`;
  }

  const maiorNota = Math.max(n1, n2, n3);
  const menorNota = Math.min(n1, n2, n3);
  const somaPontos = n1 + n2 + n3;
  const pontosNecessarios = 21; 

  let textoPontos = "";
  if (somaPontos >= pontosNecessarios) {
    textoPontos = `Pontuação total: ${somaPontos.toFixed(1)} pts. Você atingiu a meta para aprovação (21 pts)!`;
  } else {
    const faltam = pontosNecessarios - somaPontos;
    textoPontos = `Pontuação total: ${somaPontos.toFixed(1)} pts. Faltaram ${faltam.toFixed(1)} pontos para atingir a meta de aprovação.`;
  }

  resNome.textContent = nomeTratado;
  resIdade.textContent = idadeVal;
  resNotas.textContent = `${n1.toFixed(1)} | ${n2.toFixed(1)} | ${n3.toFixed(1)}`;
  resMedia.textContent = media.toFixed(2);
  resSituacao.textContent = situacao;

  
  resMaiorNota.textContent = maiorNota.toFixed(1);
  resMenorNota.textContent = menorNota.toFixed(1);
  resPontosInfo.textContent = textoPontos;
  resMensagemCustom.textContent = mensagemCustomizada;


  areaResultado.classList.remove("aprovado", "recuperacao", "reprovado", "oculta");
  areaResultado.classList.add(classeCSS);
});


btnLimpar.addEventListener("click", function () {
  
  formulario.reset();


  limparErro();


  areaResultado.classList.add("oculta");
  areaResultado.classList.remove("aprovado", "recuperacao", "reprovado");


  campoNome.focus();

  
});