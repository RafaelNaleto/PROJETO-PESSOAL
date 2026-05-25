var database = require("../database/config");

function buscarDistancia(idUsuario){
    var instrucaoSql = `
    SELECT distancia, 
    DATE_FORMAT(dtCorrida, '%d/%m')
        FROM corrida where fkUsuario = ${idUsuario};
    `

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
} 

function salvarMetricas(distanciaKm, tempHoras, tempMin, tempSeg, fkUsuario){
    var instrucaoSql = `
    INSERT INTO corrida (distancia, tempHoras, tempMin, tempSeg, dtCorrida, fkUsuario) VALUES
	    (${distanciaKm}, ${tempHoras}, ${tempMin}, ${tempSeg}, NOW(), ${fkUsuario});
    `

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}

module.exports = {
    buscarDistancia,
    salvarMetricas
}