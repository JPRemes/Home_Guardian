const crypto = require("crypto");
const { API_KEYS } = require("./constants");

function hash(value) {
    return crypto.createHash("sha256").update(String(value)).digest();
}

function isValidKey(clientKey) {
    const clientHash = hash(clientKey);
    let valid = false;
    for (const key of API_KEYS) {
        if (crypto.timingSafeEqual(clientHash, hash(key))) valid = true;
    }
    return valid;
}

function validateApiKey(req, res, allowQuery = false) {
    const clientKey = req.headers["x-api-key"] || (allowQuery ? req.query.api_key : undefined);

    // Si no envía llave → error
    if (!clientKey) {
        console.log("Intento fallido: no se envió API Key.");
        res.status(401).json({ status: "error", message: "Falta API Key" });
        return false;
    }

    // Si la llave no está en la lista → error
    if (!isValidKey(clientKey)) {
        console.log("Intento fallido: API Key inválida.");
        res.status(401).json({ status: "error", message: "API Key inválida" });
        return false;
    }

    // Si todo bien → permiso
    return true;
}

module.exports = { validateApiKey };