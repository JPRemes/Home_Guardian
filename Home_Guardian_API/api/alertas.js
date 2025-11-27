// Archivo que maneja las peticiones relacionadas con las lecturas.
const mysql = require("../database/MySQLMngr");
const constants = require("../constants");
const { validateApiKey } = require("../auth");


/**
 * Método que responde a la petición GET para obtener todas las alertas.
 * @param {Object} req Request Object
 * @param {Object} res Response to the client.
 */
async function getLogAlertas(req,res) {
    if (!validateApiKey(req, res)) return;
    try{

        let query = constants.selectAlertas; //busca el query de temperaturas
        let qResult = await mysql.getData(query); // ejecuta el query con la librería proporcionada

        res.status(200); //regresa el resultado en formato JSON
        console.log("getLogAlertas");
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
 * Método básico que permite insertar una nueva alerta en la base de datos.
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function insertNewAlerta(req,res){
    if (!validateApiKey(req, res)) return;
    try{
        //later: validate session and find users tasks
        let query = constants.insertAlerta;
        var id_lectura = req.body.id_lectura;
        let params = [id_lectura];

        let qResult = await mysql.getDataWithParams(query, params);

        res.status(200);
        console.log("insertNewAlerta");
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
    getLogAlertas,
    insertNewAlerta
};