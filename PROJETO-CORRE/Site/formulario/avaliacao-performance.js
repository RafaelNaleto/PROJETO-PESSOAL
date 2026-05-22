const listaDeQuestoes = [

    {
        pergunta: "A quanto tempo você corre?",
        alternativaA: "Nunca corri",
        pontosA: 1,

        alternativaB: "3 a 6 meses",
        pontosB: 2,

        alternativaC: "6 meses a 1 ano",
        pontosC: 3,

        alternativaD: "mais de 1 ano",
        pontosD: 4
    },

    {
        pergunta: "Quantos quilômetros você consegue correr sem parar?",
        alternativaA: "até 5Km",
        pontosA: 1,

        alternativaB: "5Km",
        pontosB: 2,

        alternativaC: "10Km",
        pontosC: 3,

        alternativaD: "+21Km",
        pontosD: 4
    },

    {
        pergunta: "Quantos dias por semana você treina corrida?",
        alternativaA: "0-1 dia(s)",
        pontosA: 1,

        alternativaB: "2-3 dias",
        pontosB: 2,

        alternativaC: "4-5 dias",
        pontosC: 3,

        alternativaD: "6+ dias",
        pontosD: 4

    },

    {
        pergunta: "Qual seu objetivo na corrida?",
        alternativaA: "Começar a correr",
        pontosA: 1,

        alternativaB: "Melhorar o meu condicionamento",
        pontosB: 2,

        alternativaC: "Melhorar o meu pace",
        pontosC: 3,

        alternativaD: "Competir",
        pontosD: 4
    }

]

// variáveis globais    
let numeroDaQuestaoAtual = 0
let pontuacaoFinal = 0
let quantidadeDeQuestoes = listaDeQuestoes.length

var tempExpMeses = ""
var maxDistancia = ""
var freqSemanal = ""
var objetivo = ""
var fkUsuario = ""

let perfil = ""

let respostas = []
// let isUltima = numeroDaQuestaoAtual == quantidadeDeQuestoes-1 ? true : false

function onloadEsconder() {
    document.getElementById('pontuacao').style.display = "none"
    document.getElementById('jogo').style.display = "none"
}

function iniciarQuiz() {
    document.getElementById('pontuacao').style.display = "none"
    document.getElementById('jogo').style.display = "flex"
    document.getElementById('btnIniciarQuiz').style.display = "none"

    document.getElementById('qtdQuestoes').innerHTML = quantidadeDeQuestoes

    preencherHTMLcomQuestaoAtual(0)

    //btnSubmeter.disabled = false
    btnProx.disabled = true
    // btnConcluir.disabled = true
    btnTentarNovamente.disabled = true
}

function preencherHTMLcomQuestaoAtual(index) {
    habilitarAlternativas(true)
    const questaoAtual = listaDeQuestoes[index]
    numeroDaQuestaoAtual = index
    console.log("questaoAtual")
    console.log(questaoAtual)
    document.getElementById("spanNumeroDaQuestaoAtual").innerHTML = Number(index) + 1 // ajustando porque o index começa em 0
    document.getElementById("spanQuestaoExibida").innerHTML = questaoAtual.pergunta;
    document.getElementById("labelOpcaoUm").innerHTML = questaoAtual.alternativaA;
    document.getElementById("labelOpcaoDois").innerHTML = questaoAtual.alternativaB;
    document.getElementById("labelOpcaoTres").innerHTML = questaoAtual.alternativaC;
    document.getElementById("labelOpcaoQuatro").innerHTML = questaoAtual.alternativaD;
}

/*function submeter() {
    const options = document.getElementsByName("option"); // recupera alternativas no html

    let hasChecked = false
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            hasChecked = true
            break
        }
    }

    if (!hasChecked) {
        alert("Não há alternativas escolhidas. Escolha uma opção.")
    } else {
        btnSubmeter.disabled = true
        btnProx.disabled = false

        habilitarAlternativas(false)

        checarResposta()
    }
}*/
function responder(){
    btnProx.disabled = false
}

function habilitarAlternativas(trueOrFalse) {
    let opcaoEscolhida = trueOrFalse ? false : true

    primeiraOpcao.disabled = opcaoEscolhida
    segundaOpcao.disabled = opcaoEscolhida
    terceiraOpcao.disabled = opcaoEscolhida
    quartaOpcao.disabled = opcaoEscolhida

}

function avancar() {
    btnProx.disabled = false
    //btnSubmeter.disabled = false

    checarResposta()

    desmarcarRadioButtons()


    if (numeroDaQuestaoAtual < quantidadeDeQuestoes) {
        setTimeout(() => {preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual)}, 300)
    }

    else {
        setTimeout(() => {finalizarJogo()}, 300)
    }
    limparCoresBackgroundOpcoes()

}

function tentarNovamente() {
    // atualiza a página
    window.location.reload()
}

function checarResposta() {
    const questaoAtual = listaDeQuestoes[numeroDaQuestaoAtual] // questão atual 

    const options = document.getElementsByName("option"); // recupera alternativas no html


    options.forEach((option) => {
        if (option.checked) {

            respostas[numeroDaQuestaoAtual] = option.value

            //questão 1 - tempo de experiencia
            if (numeroDaQuestaoAtual == 0) {
                if(option.value == "alternativaA"){
                    tempExpMeses = 0
                    pontuacaoFinal += questaoAtual.pontosA
                }

                else if(option.value == "alternativaB"){
                    tempExpMeses = 6
                    pontuacaoFinal += questaoAtual.pontosB
                }

                else if(option.value == "alternativaC"){
                    tempExpMeses = 12
                    pontuacaoFinal += questaoAtual.pontosC
                }

                else if(option.value == "alternativaD"){
                    tempExpMeses = 24
                    pontuacaoFinal += questaoAtual.pontosD
                }
            }

            //questão 2 - disância máxima
            if (numeroDaQuestaoAtual == 1) {
                if(option.value == "alternativaA"){
                    maxDistancia = 3
                    pontuacaoFinal += questaoAtual.pontosA
                }

                else if(option.value == "alternativaB"){
                    maxDistancia = 5
                    pontuacaoFinal += questaoAtual.pontosB
                }

                else if(option.value == "alternativaC"){
                    maxDistancia = 10
                    pontuacaoFinal += questaoAtual.pontosC
                }

                else if(option.value == "alternativaD"){
                    maxDistancia = 21
                    pontuacaoFinal += questaoAtual.pontosD
                }
            }

            //questão 3 - frequencia
            if (numeroDaQuestaoAtual == 2) {
                if(option.value == "alternativaA"){
                    freqSemanal = 1
                    pontuacaoFinal += questaoAtual.pontosA
                }

                else if(option.value == "alternativaB"){
                    freqSemanal = 3
                    pontuacaoFinal += questaoAtual.pontosB
                }

                else if(option.value == "alternativaC"){
                    freqSemanal = 5
                    pontuacaoFinal += questaoAtual.pontosC
                }

                else if(option.value == "alternativaD"){
                    freqSemanal = 6
                    pontuacaoFinal += questaoAtual.pontosD
                }
            }

            //questão 4 - objetivo
            if (numeroDaQuestaoAtual == 3) {
                if(option.value == "alternativaA"){
                    objetivo = "Começar a correr"
                    pontuacaoFinal += questaoAtual.pontosA
                }

                else if(option.value == "alternativaB"){
                    objetivo = "Melhorar o meu condicionamento"
                    pontuacaoFinal += questaoAtual.pontosB
                }

                else if(option.value == "alternativaC"){
                    objetivo = "Melhorar o meu pace"
                    pontuacaoFinal += questaoAtual.pontosC
                }

                else if(option.value == "alternativaD"){
                    objetivo = "Competir"
                    pontuacaoFinal += questaoAtual.pontosD
                }
            }
            numeroDaQuestaoAtual++ 

        }

    })
}

function limparCoresBackgroundOpcoes() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).classList.remove("text-danger-with-bg")
        document.getElementById(option.labels[0].id).classList.remove("text-success-with-bg")
    })
}

function desmarcarRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function finalizarJogo() {
    /*let textoParaMensagemFinal = null
    let classComCoresParaMensagemFinal = null
    */
   
   let mensagem = ""

    if(pontuacaoFinal <= 6){
        perfil = "Iniciante"
        mensagem = "Seu perfil é de iniciante, comece com treinos leves e foque na constância."
    } 
    else if(pontuacaoFinal <= 11){
        perfil = "Intermediário"
        mensagem = "Você já tem uma boa base. Agora foque em melhorar pace, aumentar distância e manter uma rotina semanal."
    }
    else{
        perfil = "Avançado"
        mensagem = "Você tem um perfil competitivo. Pode focar em metas como baixar tempo nos 5km, 10km ou meia maratona."
    }

    //textoParaMensagemFinal += "<br> Você acertou " + Math.round((porcentagemFinalDeAcertos) * 100) + "% das questões."


    //document.getElementById('msgFinal').innerHTML = textoParaMensagemFinal
    //document.getElementById('msgFinal').classList.add(classComCoresParaMensagemFinal)
    //document.getElementById('spanPontuacaoFinal').innerHTML = pontuacaoFinal

    document.getElementById('msgFinal').innerHTML = `
        Seu Perfil é: ${perfil} <br>
        ${mensagem} 
    `
    
    document.getElementById('jogo').style.display = "none"
    document.getElementById('pontuacao').style.display = "flex"

    btnProx.disabled = true
    //btnSubmeter.disabled = true
    // btnConcluir.disabled = true
    btnTentarNovamente.disabled = false

    salvarResposta()

}

var distancia = ipt_distancia.value;
var tempo = ipt_tempo.value;

function salvarResposta(){
    var idUsuario = sessionStorage.ID_USUARIO

    fetch("/formulario/salvarQuestionario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tempExpMesesServer: tempExpMeses,
            maxDistanciaServer: maxDistancia,
            freqSemanalServer: freqSemanal,
            objetivoServer: objetivo,
            fkUsuarioServer: idUsuario,
            perfilServer: perfil
        })
        
    })

    /*
    setTimeout(() => {
        window.location = "../dashboard/dashboard.html";
    }, 1000);
    */
}


