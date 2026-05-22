var database = require("../database/config");

function buscarDistancia(idUsuario){
    var instrucaoSql = `
    SELECT distancia, tempMinutos, dtCorrida 
        FROM corrida where fkUsuario = ${idUsuario};
    `

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
} 

module.exports = {
    buscarDistancia
}