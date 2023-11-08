const { Router } = require("express");
const { buscar } = require("../controllers/buscar");

const router = Router();

router.get('/:colleccion/:busqueda', buscar);

module.exports = router;