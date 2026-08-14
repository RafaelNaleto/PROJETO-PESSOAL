// const ctx = document.getElementById('grafico');

// const meuGrafico = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5', 'Dia 6', 'Dia 7'],
//         datasets: [{
//             label: 'Distância (km)',
//             data: [],
//             borderColor: 'orangered',
//             backgroundColor: 'rgba(214, 57, 0, 0.4)',
//             borderWidth: 3,
//             fill: true
//         }]
//     },
//     options: {
//         responsive: true,
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     },

// }); 

// O gráfico é construído com três funções:
    // 1. obterDadosGrafico -> Traz dados do Banco de Dados para montar o gráfico da primeira vez
    // 2. plotarGrafico -> Monta o gráfico com os dados trazidos e exibe em tela
    // 3. atualizarGrafico -> Atualiza o gráfico, trazendo novamente dados do Banco

    // Esta função *obterDadosGrafico* busca os últimos dados inseridos em tabela de medidas.
    // para, quando carregar o gráfico da primeira vez, já trazer com vários dados.
    // A função *obterDadosGrafico* também invoca a função *plotarGrafico*

    //     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
    //     Para ajustar o "select", ajuste o comando sql em src/models



function obterDadosGrafico( ) {
    //alterarTitulo(idUsuario)
    var idUsuario = sessionStorage.ID_USUARIO
    
    console.log(idUsuario)
    //perfilH2.innerHTML = `${perfil}`
/*
if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao);
}
*/

    fetch(`/distancia/buscarDistancia/${idUsuario}`, { cache: 'no-store' })
    
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta, idUsuario);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGrafico(resposta, idUsuario) {

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Distância (km)',
            data: [],
            borderColor: 'orangered',
            backgroundColor: 'rgba(214, 57, 0, 0.4)',
            borderWidth: 3,
            fill: true
        }]

    };

    console.log('iniciando plotagem do gráfico...');
    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)
    //zerando os dados antigos
    labels.length = 0;
    dados.datasets[0].data.length = 0;
    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (let i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.data_formatada);
        dados.datasets[0].data.push(registro.total_distancia);
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'line',
        data: dados,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };
    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById(`grafico`),
        config
    );

    //setTimeout(() => atualizarGrafico(idUsuario, dados, myChart), 200);
}



// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models

/*
function atualizarGrafico(idUsuario, dados, myChart) {
    


fetch(`/distancia/buscarDistancia/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
        response.json().then(function (novoRegistro) {
            
        //obterdados(idUsuario);
        // alertar(novoRegistro, idAquario);
        console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
        console.log(`Dados atuais do gráfico:`);
        console.log(dados);
        
        //let avisoCaptura = document.getElementById(`avisoCaptura${idUsuario}`)
        //avisoCaptura.innerHTML = ""
        
        
        if (novoRegistro[0].dtCorrida == dados.labels[dados.labels.length - 1]) {
            console.log("---------------------------------------------------------------")
            console.log("Como não há dados novos para captura, o gráfico não atualizará.")
            //avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
            console.log("Horário do novo dado capturado:")
            console.log(novoRegistro[0].dtCorrida)
            console.log("Horário do último dado capturado:")
            console.log(dados.labels[dados.labels.length - 1])
            console.log("---------------------------------------------------------------")
            } else {
                // tirando e colocando valores no gráfico
            //dados.labels.shift(); // apagar o primeiro
            //dados.labels.push(novoRegistro[0].dtCorrida); // incluir um novo momento
            
            //dados.datasets[0].data.shift();  // apagar o primeiro de umidade
            //dados.datasets[0].data.push(novoRegistro[0].distancia); // incluir uma nova medida de umidade
            
            //dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
            //dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura
            obterDadosGrafico();
            //myChart.update();
        }
        
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        
        //proximaAtualizacao = setTimeout(() => atualizarGrafico(idUsuario, dados, myChart), 2000);
    });
} else {
    console.error('Nenhum dado encontrado ou erro na API');
// Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
//proximaAtualizacao = setTimeout(() => atualizarGrafico(idUsuario, dados, myChart), 2000);
}
})
.catch(function (error) {
    console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
});

}
*/




function salvarMetricas(){
    var idUsuario = sessionStorage.ID_USUARIO;

    var distanciaKm = Number(ipt_distancia.value);
    var tempoHoras = Number(ipt_horas.value);
    var tempoMin = Number(ipt_minutos.value);
    var tempoSeg = Number(ipt_segundos.value);

    fetch("/distancia/salvarMetricas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            distanciaServer: distanciaKm,
            tempoHorasServer: tempoHoras,
            tempoMinServer: tempoMin,
            tempoSegServer: tempoSeg,
            fkUsuarioServer: idUsuario
        })
    })
    .then(function (response){
        if (response.ok) {
            alert("Métricas salvas com sucesso...")
            setTimeout(() => {
                window.location.href = "../dashboard/dashboard.html"
            }, 200)
        } 
    })
    .catch(function (error){
        console.log("Erro ao salvar!")
    });


}

function buscarHistorico(){
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/distancia/buscarHistorico/${idUsuario}`, {cache: 'no-store'})
    .then(function (response) {
        if (response.status == 200) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                converterTempo(resposta, idUsuario);
            });
        } else if(response.status == 204) {
            historicoDeCorrida.innerHTML = `
            
            <hr>
            <br><br>
            <b>Sem corridas salvas... <br>
            Corra e salve seus resultados!<b>
            `
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        })
}

function converterTempo(resposta) {

    for (let i = 0; i < resposta.length; i++) {

        var tempoHoras = resposta[i].tempHoras * 60;
        var tempoMinutos = resposta[i].tempMin;
        var tempoSegundos = resposta[i].tempSeg / 60;

        let tempoMinTotal = tempoHoras + tempoMinutos + tempoSegundos;

        let paceDecimal = tempoMinTotal / Number(resposta[i].distancia);

        let paceMin = Math.floor(paceDecimal);
        let paceSeg = Math.round((paceDecimal - paceMin) * 60);

        let pace = `${paceMin}:${String(paceSeg).padStart(2, '0')}/km`;

        resposta[i].pace = pace;
    }

    exibirHistorico(resposta);
}

function exibirHistorico(resposta) {

    historicoDeCorrida.innerHTML = "";

    for (let i = 0; i < resposta.length; i++) {
        var registro = resposta[i];

        historicoDeCorrida.innerHTML += `
            <b>DATA:</b> ${registro.dtCorrida} |
            <b>DISTÂNCIA:</b> ${registro.distancia} km |
            <b>PACE:</b> ${registro.pace}
            <br>
        `;
    }
}

const metas = [{
    perfil: "Iniciante",
    tempo5k: "30 min",
    distanciaMax: "5km",
    frequencia: "2 vezes",
    ritmo: "6:30/km"
},
{
    perfil: "Intermediário",
    tempo5k: "25 min",
    distanciaMax: "15km",
    frequencia: "4 vezes",
    ritmo: "5:30/km"
},
{
    perfil: "Avançado",
    tempo5k: "20 min",
    distanciaMax: "25km",
    frequencia: "5 vezes",
    ritmo: "4:30/km"
}]

function buscarKPI(){
var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/distancia/buscarKPI/${idUsuario}`, {cache: 'no-store'})
    .then(function (response) {
        if (response.status == 200) {
            response.json().then(function (resposta) {
                    
                resposta.reverse();

                somarTempo(resposta, idUsuario);
                
                if (Number(resposta[0].distanciaTotal) != 0) {
                    distanciaTotal.innerHTML = `
                    ${Number(resposta[0].distanciaTotal).toFixed(0)}Km 
                    `
                } else {
                    distanciaTotal.innerHTML = `-`
                }

                if (Number (resposta[0].tempo != 0)) {
                    tempo.innerHTML = resposta[0].tempoTotal;
                } else {
                    tempo.innerHTML = `-`
                }


            });
        } else if(response.status == 204) {
            metricaTotal.innerHTML = `
            -
            `
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        })
}

function somarTempo(resposta){
    let horas = Number(resposta[0].tempHoras);
    let minutos = Number(resposta[0].tempMin);
    let segundos = Number(resposta[0].tempSeg);

    let tempo = horas + (minutos / 60) + (segundos / 3600);
    let horasTotal = Math.floor(tempo);
    let tempoTotalMin = (tempo - horasTotal) * 60;

    let tempoTotal = `${horasTotal}h${tempoTotalMin.toFixed(0)}`;

    console.log(`${horasTotal}h${tempoTotalMin.toFixed(0)}`)

    resposta[0].tempoTotal = tempoTotal;
}

function iniciarPagina(){
    obterDadosGrafico();
    buscarKPI();
    exibirMetas();
}

function exibirMetas(){
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/formulario/verificarQuestionario/${idUsuario}`, {cache: 'no-cache'})
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta){
                if (resposta[0].perfil == 'Iniciante'){
                    metaPerfil.innerHTML = `${metas[0].perfil}`

                    meta5k.innerHTML = `${metas[0].tempo5k}`
                    metaDistancia.innerHTML = `${metas[0].distanciaMax}`
                    metaFreq.innerHTML = `${metas[0].frequencia}`
                    metaRitmo.innerHTML = `${metas[0].ritmo}`
                }

                else if (resposta[0].perfil == 'Intermediário'){
                    metaPerfil.innerHTML = `${metas[1].perfil}`

                    meta5k.innerHTML = `${metas[1].tempo5k}`
                    metaDistancia.innerHTML = `${metas[1].distanciaMax}`
                    metaFreq.innerHTML = `${metas[1].frequencia}`
                    metaRitmo.innerHTML = `${metas[1].ritmo}`
                }

                else if (resposta[0].perfil == 'Avançado'){
                    metaPerfil.innerHTML = `${metas[2].perfil}`

                    meta5k.innerHTML = `${metas[2].tempo5k}`
                    metaDistancia.innerHTML = `${metas[2].distanciaMax}`
                    metaFreq.innerHTML = `${metas[2].frequencia}`
                    metaRitmo.innerHTML = `${metas[2].ritmo}`
                }
            })
        }
    })
    .catch(function(error){
        console.error(`Erro na obtenção dos dados p/ metas: ${error.message}`);
    })
    
}

