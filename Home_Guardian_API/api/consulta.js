const mysql = require("../database/MySQLMngr");
const constants = require("../constants");
const { get } = require("../router");

/**
 * @param {Object} req Request Object
 * @param {Object} res Response to the client.
 */
async function getConsulta(req,res) {
    try{

        let query = constants.selectConsulta; 
        let qResult = await mysql.getData(query);

        res.status(200);
        console.log("getConsulta");
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

const fs = require("fs");
const path = require("path");

async function getConsultaHTML(req, res) {
  try {
    let qResult = await mysql.getData(constants.selectConsulta);
    const rows = qResult.getRows ? qResult.getRows() : qResult.rows || [];

    const tableRows = rows.map(r => `
      <tr>
        <td>${r.id_lectura}</td>
        <td>${r.nombre}</td>
        <td>${r.valor}</td>
        <td>${r.unidad}</td>
        <td>${r.hora}</td>
      </tr>
    `).join("");

    const filePath = path.join(__dirname, "..", "views", "consulta.html");
    let html = fs.readFileSync(filePath, "utf8");

    // Reemplazar placeholder
    html = html.replace("{{DATA_ROWS}}", tableRows);

    res.status(200).send(html);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error: " + error.message);
  }
}

module.exports = {
    getConsulta,
    getConsultaHTML
};