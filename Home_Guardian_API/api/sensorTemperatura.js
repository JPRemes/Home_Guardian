/**
 * Archivo que maneja las peticiones relacionadas con el sensor de temperatura.
 * Aquí se definen las funciones que procesan las peticiones web (endpoints)
 * relacionadas con el sensor de temperatura.
 * 
 * Ernesto Cantú
 */
const mysql = require("../database/MySQLMngr");
const constants = require("../constants")



/**
 * Método que responde a la petición GET para obtener todos los registros de temperatura.
 * @param {Object} req Request Object
 * @param {Object} res Response to the client.
 */
async function getLogTemperatures(req,res){
    try{
        
        let query = constants.selectTemperature; //busca el query de temperaturas
        let qResult = await mysql.getData(query); // ejecuta el query con la librería proporcionada

        res.status(200);
        res.json(qResult); //regresa el resultado en formato JSON
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
 * Método que permite realizar una consulta de temperaturas entre dos fechas.
 * Su comportamiento es tipo GET pero, al enviarse datos al server, se utiliza POST.
 * 
 * Puede ser Util para realizar analíticas de datos.
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function getTemperaturesBetweenDates(req,res){
    try{
        //later: validate session and find users tasks
        let query = constants.selectTemperatureByDate;
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
 * Método básico que permite insertar un nuevo valor de temperatura en la base de datos.
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function insertNewTemperature(req,res){
    try{
        //later: validate session and find users tasks
        let query = constants.insertTemperature;
        var temp = req.body.valor;
        let params = [temp];

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

module.exports = {getLogTemperatures,getTemperaturesBetweenDates,insertNewTemperature};
