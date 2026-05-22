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

//function cadastrarCorrida(req, res){
  //  var 
//}

module.exports = {
    buscarDistancia
}