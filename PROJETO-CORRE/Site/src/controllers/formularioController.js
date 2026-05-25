var formularioModel = require("../models/formularioModel");

function salvarQuestionario(req, res) {

    var tempExpMeses = req.body.tempExpMesesServer;
    var maxDistancia = req.body.maxDistanciaServer;
    var freqSemanal = req.body.freqSemanalServer;
    var objetivo = req.body.objetivoServer;
    var fkUsuario = req.body.fkUsuarioServer;
    var perfil = req.body.perfilServer;

    formularioModel.salvarQuestionario(
        tempExpMeses,
        maxDistancia,
        freqSemanal,
        objetivo,
        fkUsuario,
        perfil
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

function verificarQuestionario(req, res){
        var idUsuario = req.params.idUsuario
    
        formularioModel.verificarQuestionario(idUsuario).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as resposta do questionário.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    salvarQuestionario,
    verificarQuestionario
}