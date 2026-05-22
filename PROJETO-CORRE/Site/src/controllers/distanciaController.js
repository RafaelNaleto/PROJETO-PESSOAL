var distanciaModel = require("../models/distanciaModel")

function buscarDistancia(req, res) {
    var idUsuario = req.params.idUsuario

    distanciaModel.buscarDistancia(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas disâncias.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function salvarMetricas(req, res) {

    var distanciaKm = req.body.distanciaServer;
    var tempoHoras = req.body.tempoHorasServer;
    var tempoMin = req.body.tempoMinServer;
    var tempoSeg = req.body.tempoSegServer;
    var fkUsuario = req.body.fkUsuarioServer;

    distanciaModel.salvarMetricas(
        distanciaKm,
        tempoHoras,
        tempoMin,
        tempoSeg,
        fkUsuario
    )
    .then(function(resultado){
        res.status(200).json(resultado);
    })
    .catch(function(erro){
        console.log("Erro ao salvar questionário!");
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarDistancia,
    salvarMetricas
}