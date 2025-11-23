/**
 * Archivo que maneja las peticiones relacionadas con el sensor de luz.
 * Aquí se definen las funciones que procesan las peticiones web (endpoints)
 * relacionadas con el sensor de luz.
 */

const mysql = require("../database/MySQLMngr");
const constants = require("../constants")


/**
 * Método que responde a la petición GET para obtener todos los registros de luz.
 * @param {Object} req Request Object
 * @param {Object} res Response to the client.
 */
async function getLogLight(req,res) {
    try{

        let query = constants.selectLight; //busca el query de temperaturas
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
 * Método que permite realizar una consulta de luz entre dos fechas.
 * Su comportamiento es tipo GET pero, al enviarse datos al server, se utiliza POST.
 * 
 * Puede ser Util para realizar analíticas de datos.
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function getLightBetweenDates(req,res){
    try{
        //later: validate session and find users tasks
        let query = constants.selectLightByDate;
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
 * Método básico que permite insertar un nuevo valor de luz en la base de datos.
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function insertNewLight(req,res){
    try{
        //later: validate session and find users tasks
        let query = constants.insertLight;
        var luz = req.body.valor;
        let params = [luz];

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

module.exports = {getLogLight, getLightBetweenDates, insertNewLight};