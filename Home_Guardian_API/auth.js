const { API_KEYS } = require("./constants");

function validateApiKey(req, res) {
    const clientKey = req.headers["x-api-key"];

    // Si no envía llave → error
    if (!clientKey) {
        console.log("Intento fallido: no se envió API Key.");
        res.status(401).json({ status: "error", message: "Falta API Key" });
        return false;
    }

    // Si la llave no está en la lista → error
    if (!API_KEYS.includes(clientKey)) {
        console.log("Intento fallido: API Key inválida →", clientKey);
        res.status(401).json({ status: "error", message: "API Key inválida" });
        return false;
    }

    // Si todo bien → permiso
    return true;
}

module.exports = { validateApiKey };