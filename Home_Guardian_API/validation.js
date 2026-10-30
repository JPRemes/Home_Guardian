function isPositiveInt(value) {
    return Number.isInteger(value) && value > 0;
}

function isNumber(value) {
    return typeof value === "number" && Number.isFinite(value);
}

function isDate(value) {
    return typeof value === "string" && !isNaN(Date.parse(value));
}

function badRequest(res, message) {
    res.status(400).json({ status: "error", message: message });
}

module.exports = { isPositiveInt, isNumber, isDate, badRequest };
