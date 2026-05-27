var express = require("express");
var router = express.Router();

var distanciaController = require("../controllers/distanciaController");

router.get("/buscarDistancia/:idUsuario",function(req, res) {
    distanciaController.buscarDistancia(req, res)
});

router.post("/salvarMetricas", function(req, res) {
    distanciaController.salvarMetricas(req, res)
});

router.get("/buscarHistorico/:idUsuario", function(req, res) {
    distanciaController.buscarHistorico(req, res)
});

router.get("/buscarKPI/:idUsuario", function(req, res) {
    distanciaController.buscarKPI(req, res)
});

module.exports = router;