var database = require("../database/config");

function salvarQuestionario(tempExpMeses, maxDistancia, freqSemanal , objetivo, fkUsuario, perfil){
    var instrucaoSql = `
        INSERT INTO questionario (tempExpMeses, maxDistancia, freqSemanal, objetivo, fkUsuario, perfil) VALUES
            (${tempExpMeses}, ${maxDistancia}, ${freqSemanal}, '${objetivo}', ${fkUsuario}, '${perfil}');
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function verificarQuestionario(idUsuario){
    var instrucaoSql = `
        SELECT id, perfil FROM questionario where fkUsuario = ${idUsuario};
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

    module.exports = {
        salvarQuestionario,
        verificarQuestionario
    }