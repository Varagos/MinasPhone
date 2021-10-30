"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var logging_1 = __importDefault(require("./config/logging"));
var config_1 = __importDefault(require("./config/config"));
var sample_1 = __importDefault(require("./routes/sample"));
var NAMESPACE = 'Server';
var router = (0, express_1.default)();
/** Logging the request */
router.use(function (req, res, next) {
    logging_1.default.info(NAMESPACE, "METHOD - [" + req.method + "], URL - [" + req.url + "], IP - [" + req.socket.remoteAddress + "]");
    res.on('finish', function () {
        logging_1.default.info(NAMESPACE, "METHOD - [" + req.method + "], URL - [" + req.url + "], IP - [" + req.socket.remoteAddress + "], STATUS - [" + res.statusCode + "]");
    });
    next();
});
// Body-parser injections
router.use(express_1.default.json()); // Not have to call json.parse
router.use(express_1.default.urlencoded({ extended: false })); // Allows us to send nests json in the API
/** Rules of our API */
router.use(function (req, res, next) {
    // Should be changed in Production with specific IPs
    res.header('Access-Control-Allow-Origin', '*'); // our request can come from anywhere
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});
/** Routes */
router.use('/sample', sample_1.default);
/** Error Handling */
router.use(function (req, res, next) {
    var error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});
/**Create the server */
var httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, function () {
    logging_1.default.info(NAMESPACE, "Server running on http://" + config_1.default.server.hostname + ":" + config_1.default.server.port);
});
