app.get('/corridas/:idUsuario', (req, res) => {
    const idUsuario = req.params.idUsuario;

    const sql = `

    `;

    conexao.query(sql, [idUsuario], (erro, resultado) => {
        if (erro) {
            res.status(500).json(erro);
        } else {
            res.json(resultado);
        }
    });
});