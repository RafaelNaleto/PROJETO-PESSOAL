var database = require("../database/config");

function cadastrar(nome, email, senha){
    var instrucao = `
        INSERT INTO usuario (nome, email, senha) values
            (${nome}, ${email}, ${senha});
    `
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};