var express = require("express");
var router = express.Router();

var distanciaController = require("../controllers/distanciaController");

router.get("/buscarDistancia/:idUsuario",function(req, res) {
    distanciaController.buscarDistancia(req, res)
});

router.post("/cadastrarCorrida")

module.exports = router;