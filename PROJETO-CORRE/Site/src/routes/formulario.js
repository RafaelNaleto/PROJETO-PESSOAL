var express = require("express");
var router = express.Router();

var formularioController = require("../controllers/formularioController");

router.post("/salvarQuestionario", function (req, res) {
    formularioController.salvarQuestionario(req, res);
});

module.exports = router;