var express = require("express");
var router = express.Router();

var distanciaController = require("../controllers/distanciaController");

router.get("/buscarDistancia",function(req, res) {
    distanciaController.buscarDistancia(req, res)
});

module.exports = router;