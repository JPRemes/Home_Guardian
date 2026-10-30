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



// Carga las variables de entorno desde .env (ver .env.example)
require('dotenv').config();

/*
 * Configuración local de la Base de Datos MySQL
 */
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || "3306";
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME || "Home_Guardian";

// LLaves: lista separada por comas en la variable API_KEYS
const API_KEYS = (process.env.API_KEYS || "")
   .split(",")
   .map(k => k.trim())
   .filter(k => k.length > 0);


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
const getLastLectura = "/getLastLectura";

// SQL QUERIES
const selectLecturas = 'SELECT * FROM lecturas';
const selectLecturasByDate = 'SELECT * FROM lecturas WHERE fecha between ? and ?';
const insertLectura = 'INSERT INTO lecturas (id_sensor, valor) values (?,?)';
const selectLastLectura = 'SELECT id_lectura FROM lecturas WHERE id_sensor = ? ORDER BY id_lectura DESC LIMIT 1';

// ---- Tabla Alerta ----
// URLs
const getAlertas = "/getAlertas";
const postAlertas = "/insertAlerta";

// SQL QUERIES
const selectAlertas = 'SELECT * FROM alerta';
const insertAlerta = 'INSERT INTO alerta (id_lectura) values (?)';

// ---- Consultas ---
// URLs
const getConsulta = "/getConsulta";
const getConsultaHTML = "/getConsultaHTML";
const getConsultaAlertas = "/getConsultaAlertasHTML";

// SQL QUERIES
const selectConsulta = 'SELECT l.id_lectura, s.tipo, l.valor, s.unidad, l.hora FROM lecturas l JOIN sensores s ON l.id_sensor = s.id_sensor ORDER BY l.id_lectura;';
const selectConsultaAlertas = 'SELECT a.id_alerta, s.tipo, l.valor, s.unidad, l.hora FROM alerta a JOIN lecturas l ON a.id_lectura = l.id_lectura JOIN sensores s ON l.id_sensor = s.id_sensor ORDER BY a.id_alerta;';



module.exports= {
   dbHost,dbPort,dbUser,dbPass,dbName,serverPort, contextURL,api,
   API_KEYS,
   getLecturas, getLecturasByDate, postLecturas, getLastLectura, selectLecturas, selectLecturasByDate, insertLectura, selectLastLectura,
   getAlertas, postAlertas, selectAlertas, insertAlerta,
   getConsulta, selectConsulta, getConsultaHTML, getConsultaAlertas, selectConsultaAlertas
}