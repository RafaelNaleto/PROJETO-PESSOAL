var database = require("../database/config");

function buscarDistancia(idUsuario){
    var instrucaoSql = `
SELECT 
    fkUsuario, 
    SUM(distancia) AS total_distancia, 
    DATE_FORMAT(dtCorrida, '%d/%m') AS data_formatada 
        FROM corrida 
            WHERE fkUsuario = ${idUsuario} 
            GROUP BY fkUsuario, DATE_FORMAT(dtCorrida, '%d/%m')
            ORDER BY MIN(dtCorrida) DESC;
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

function buscarHistorico(idUsuario){
    var instrucaoSql = `
    SELECT distancia, tempHoras, tempMin, tempSeg, 
        DATE_FORMAT(dtCorrida, '%d/%m/%Y %H:%i') AS dtCorrida 
        FROM corrida WHERE fkUsuario = ${idUsuario}
        ORDER BY DATE_FORMAT(dtCorrida, '%d/%m/%Y %H:%i');
    `

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}

function buscarKPI(idUsuario){
    var instrucaoSql = `
    SELECT 
        SUM(distancia) AS distanciaTotal, 
        SUM(tempHoras) AS tempHoras, 
        SUM(tempMin) AS tempMin, 
        SUM(tempSeg) AS tempSeg
            FROM corrida 
            WHERE fkUsuario = ${idUsuario};
    `

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}
module.exports = {
    buscarDistancia,
    salvarMetricas,
    buscarHistorico,
    buscarKPI
}