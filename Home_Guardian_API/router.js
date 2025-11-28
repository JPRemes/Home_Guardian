/**
 * Archivo que configura todas las rutas del proyecto.
 * Aquí se configuran las URLs y los métodos HTTP (GET, POST, PUT, DELETE)
 * que van a procesar las peticiones web.
 * 
 * Ernesto Cantú
 */

//Importa a tu archivo route.js las dependencias que se requieren
const express = require('express');
const router = express.Router();
const constants =  require('./constants');
const alertas = require('./api/alertas');
const lecturas = require('./api/lecturas');
const consultas = require('./api/consulta');

//Al router le damos todas las urls y los métodos que van a procesar las peticiones web.

// --- Lecturas ---

router.get(constants.contextURL + constants.api + constants.getLecturas, lecturas.getLogLecturas);
router.post(constants.contextURL + constants.api + constants.getLecturasByDate, lecturas.getLecturasBetweenDates);
router.post(constants.contextURL + constants.api + constants.postLecturas, lecturas.insertNewLectura);
router.post(constants.contextURL + constants.api + constants.getLastLectura, lecturas.getLastLectura);

// --- Alertas ---

router.get(constants.contextURL + constants.api + constants.getAlertas, alertas.getLogAlertas);
router.post(constants.contextURL + constants.api + constants.postAlertas, alertas.insertNewAlerta);

// --- Consultas ---

router.get(constants.contextURL + constants.api + constants.getConsulta, consultas.getConsulta);
router.get(constants.contextURL + constants.api + constants.getConsultaHTML, consultas.getConsultaHTML);


//le decimos a Node que queremos hacer uso de nuestro router en otros archivos (como por ejemplo, app.js)
module.exports = router;