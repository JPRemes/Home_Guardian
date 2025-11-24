// Archivo que maneja las peticiones relacionadas con las lecturas.
const mysql = require("../database/MySQLMngr");
const constants = require("../constants");
const { get } = require("../router");


/**
 * Método que responde a la petición GET para obtener todos los registros.
 * @param {Object} req Request Object
 * @param {Object} res Response to the client.
 */
async function getLogLecturas(req,res) {
    try{

        let query = constants.selectLecturas; //busca el query de temperaturas
        let qResult = await mysql.getData(query); // ejecuta el query con la librería proporcionada

        res.status(200); //regresa el resultado en formato JSON
        res.json(qResult);
    } catch(error) {
        let jsonError = {
            "status" : "error",
            "message" : error.message
        };
        console.log(error);
        res.status(500);
        res.send(jsonError);
    }
}


/**
 * Metodo que permite realizar una consulta de las lecturas entre dos fechas.
 * Su comportamiento es tipo GET pero, al enviarse datos al server, se utiliza POST.
 * 
 * Puede ser Util para realizar analíticas de datos.
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function getLecturasBetweenDates(req,res){
    try{
        //later: validate session and find users tasks
        let query = constants.selectLecturasByDate;
        var date_one = req.body.date_one;
        var date_two = req.body.date_two;
        let params = [date_one, date_two];

        let qResult = await mysql.getDataWithParams(query, params);

        res.status(200);
        res.json(qResult);
    }catch(error){
        let jsonError = {
            "status"  : "error",
            "message" : error.message
        };
        console.log(error);
        res.status(500);
        res.send(jsonError);
    }
}

/**
 * Método básico que permite insertar una nueva lectura en la base de datos.
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function insertNewLectura(req,res){
    try{
        //later: validate session and find users tasks
        let query = constants.insertLectura;
        var id_sensor = req.body.id_sensor;
        var valor = req.body.valor;
        let params = [id_sensor, valor];

        let qResult = await mysql.getDataWithParams(query, params);

        res.status(200);
        res.json(qResult);
    }catch(error){
        let jsonError = {
            "status"  : "error",
            "message" : error.message
        };
        console.log(error);
        res.status(500);
        res.send(jsonError);
    }
}

/**
 * Metodo que permite realizar un GET del ultimo registro de un sensor en especifico.
 * Su comportamiento es tipo GET pero, al enviarse datos al server, se utiliza POST.
 * 
 * 
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function getLastLectura(req,res){
    try{
        let query = constants.selectLastLectura;
        var id_sensor = req.body.id_sensor;
        let params = [id_sensor];

        let qResult = await mysql.getDataWithParams(query, params);

        res.status(200);
        res.json(qResult);
    }catch(error){
        let jsonError = {
            "status"  : "error",
            "message" : error.message
        };
        console.log(error);
        res.status(500);
        res.send(jsonError);
    }
}

module.exports = {
    getLogLecturas,
    getLecturasBetweenDates,
    insertNewLectura,
    getLastLectura
};