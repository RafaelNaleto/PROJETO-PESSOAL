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

module.exports = {
    salvarQuestionario
}