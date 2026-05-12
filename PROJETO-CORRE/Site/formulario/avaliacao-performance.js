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
    // let isUltima = numeroDaQuestaoAtual == quantidadeDeQuestoes-1 ? true : false

    function onloadEsconder() {
        document.getElementById('pontuacao').style.display = "none"
        document.getElementById('jogo').style.display = "none"
    }

    function iniciarQuiz() {
        document.getElementById('pontuacao').style.display = "flex"
        document.getElementById('jogo').style.display = "flex"
        document.getElementById('btnIniciarQuiz').style.display = "none"

        document.getElementById('qtdQuestoes').innerHTML = quantidadeDeQuestoes

        preencherHTMLcomQuestaoAtual(0)

        //btnSubmeter.disabled = false
        btnProx.disabled = true
        // btnConcluir.disabled = true
        //btnTentarNovamente.disabled = true
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

function responder() {

    checarResposta()

    setTimeout(() => {avancar()}, 300)

}

    function habilitarAlternativas(trueOrFalse) {
        let opcaoEscolhida = trueOrFalse ? false : true

        primeiraOpcao.disabled = opcaoEscolhida
        segundaOpcao.disabled = opcaoEscolhida
        terceiraOpcao.disabled = opcaoEscolhida
        quartaOpcao.disabled = opcaoEscolhida

    }

function avancar() {
    btnProx.disabled = true
    //btnSubmeter.disabled = false

    desmarcarRadioButtons()

    if (numeroDaQuestaoAtual < quantidadeDeQuestoes) {
        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual)
    } else {
        finalizarJogo()
    }


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

                if(option.value == "alternativaA"){
                    pontuacaoFinal += questaoAtual.pontosA
                }

                else if(option.value == "alternativaB"){
                    pontuacaoFinal += questaoAtual.pontosB
                }

                else if(option.value == "alternativaC"){
                    pontuacaoFinal += questaoAtual.pontosC
                }

                else if(option.value == "alternativaD"){
                    pontuacaoFinal += questaoAtual.pontosD
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
    let perfil = ""
    let mensagem = ""

    if (pontuacaoFinal <= 6) {
        perfil = "Iniciante"
        mensagem = "Comece com treinos leves, foque em constância e tente evoluir até correr 5km sem parar."
    } else if (pontuacaoFinal <= 11) {
        perfil = "Intermediário"
        mensagem = "Você já tem uma boa base. Agora foque em melhorar pace, aumentar distância e manter uma rotina semanal."
    } else {
        perfil = "Avançado"
        mensagem = "Você tem um perfil competitivo. Pode focar em metas como baixar tempo nos 5km, 10km ou meia maratona."
    }

    msgFinal.innerHTML = `
        Seu perfil de corredor é: <b>${perfil}</b><br><br>
        Pontuação final: ${pontuacaoFinal}<br><br>
        ${mensagem}
    `

    spanPontuacaoFinal.innerHTML = pontuacaoFinal

    btnProx.disabled = true
    //btnSubmeter.disabled = true
    //btnTentarNovamente.disabled = false
}