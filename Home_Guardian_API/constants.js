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
const dbPass = "*****";
const dbName = "Home_Guardian";


/*
 * Server General Configuration
 */
const serverPort = 3000 // puerto de ejecución del servidor web
const contextURL = '/iot'; //Contexto del proyecto
const api = '/api'; // Contexto del API

// ---- Tabla Lecturas ----
// URLs
const getLecturas = "/getLecturas";
const getLecturasByDate = "/getLecturasBetweenDates";
const postLecturas = "/insertLectura";

// SQL QUERIES
const selectLecturas = 'SELECT * FROM lecturas';
const selectLecturasByDate = 'SELECT * FROM lecturas WHERE fecha between ? and ?';
const insertLectura = 'INSERT INTO lecturas (id_sensor, valor) values (?,?)';

// ---- Tabla Alerta ----
// URLs
const getAlertas = "/getAlertas";
const postAlertas = "/insertAlerta";

// SQL QUERIES
const selectAlertas = 'SELECT * FROM alerta';
const insertAlerta = 'INSERT INTO alerta (id_lectura) values (?)';

module.exports= {
   dbHost,dbPort,dbUser,dbPass,dbName,serverPort, contextURL,api,
   getLecturas, getLecturasByDate, postLecturas, selectLecturas, selectLecturasByDate, insertLectura,
   getAlertas, postAlertas, selectAlertas, insertAlerta
}