const expressWinston = require("express-winston");
const winston = require("winston");
require("winston-loggly-bulk");

const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.Console()]
});

module.exports = errorLogger;
