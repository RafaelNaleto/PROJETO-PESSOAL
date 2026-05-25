var express = require("express");
var router = express.Router();

var formularioController = require("../controllers/formularioController");

router.post("/salvarQuestionario", function (req, res) {
    formularioController.salvarQuestionario(req, res);
});

router.get("/verificarQuestionario/:idUsuario", function (req, res) {
    formularioController.verificarQuestionario (req,res)
})

module.exports = router;