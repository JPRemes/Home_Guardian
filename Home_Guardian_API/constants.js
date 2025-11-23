/**
 * Archivo de constantes del proyecto.
 * 
 * Aquí se configuran las constantes generales del proyecto, tales como:
 *   - Configuración de la base de datos.
 *  - Configuración del servidor.
 *  - URLs de los endpoints.
 *  - Queries SQL.
 * 
 * Ernesto Cantú
 */



/*
 * Configuración local de la Base de Datos MySQL
 */
const dbHost = "localhost";
const dbPort = "3306";
const dbUser = "root";
const dbPass = "****";
const dbName = "iot";


/*
 * Server General Configuration
 */
const serverPort = 3000 // puerto de ejecución del servidor web
const contextURL = '/iot'; //Contexto del proyecto
const api = '/api'; // Contexto del API

// ----- SENSOR DE TEMPERATURA -----
// Temperature Sensor URLs
const getTemperatureSensor = '/getTemperatures'
const getTemperatureSensorByDate = '/getTemperaturesBetweenDates'
const postTemperatureSensor = '/insertTemperature'; //Implemented Endpoint URL

// SQL QUERIES
const selectTemperature = 'SELECT * FROM temps';
const selectTemperatureByDate = 'SELECT * FROM temps WHERE fecha between ? and ?';
const insertTemperature = 'INSERT INTO temps (valor) values (?)';

// ----- SENSOR DE LUZ -----
// SENSOR DE LUZ URLS:
const getLightSensor = '/getLight'
const getLightSensorByDate = '/getLightBetweenDates'
const postLightSensor = '/insertLight';

// SQL QUERIES
const selectLight = 'SELECT * FROM luz';
const selectLightByDate = 'SELECT * FROM luz WHERE fecha between ? and ?';
const insertLight = 'INSERT INTO luz (valor) values (?)';


module.exports= {
   dbHost,dbPort,dbUser,dbPass,dbName,serverPort, contextURL,api,
   getTemperatureSensor,getTemperatureSensorByDate,postTemperatureSensor,selectTemperature,selectTemperatureByDate,insertTemperature,
   getLightSensor,getLightSensorByDate,postLightSensor,selectLight,selectLightByDate,insertLight
}