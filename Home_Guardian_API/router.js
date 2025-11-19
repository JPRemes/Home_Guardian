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
const sensorTemp = require('./api/sensorTemperatura'); // import del archivo que tiene la lógica de manejo de peticiones

//Al router le damos todas las urls y los métodos que van a procesar las peticiones web.
router.get(constants.contextURL + constants.api + constants.getTemperatureSensor, sensorTemp.getLogTemperatures);
router.post(constants.contextURL + constants.api + constants.getTemperatureSensorByDate, sensorTemp.getTemperaturesBetweenDates);
router.post(constants.contextURL + constants.api + constants.postTemperatureSensor, sensorTemp.insertNewTemperature);

//le decimos a Node que queremos hacer uso de nuestro router en otros archivos (como por ejemplo, app.js)
module.exports = router;