import http from 'http';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import bookRoutes from './routes/book';
import mongoose from 'mongoose';

const NAMESPACE = 'Server';
const router = express();
console.log(config.mongo.url);

/** Conntect to Mongo */
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        logging.info(NAMESPACE, 'Connected to mongoDB!');
    })
    .catch((error) => logging.error(NAMESPACE, error.message, error));

/** Logging the request */

router.use((req, res, next) => {
    /** Log the req */
    logging.info(
        NAMESPACE,
        `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
    );

    res.on('finish', () => {
        /** Log the res */
        logging.info(
            NAMESPACE,
            `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
        );
    });

    next();
});

// Body-parser injections
router.use(express.json()); // Not have to call json.parse
router.use(express.urlencoded({ extended: false })); // Allows us to send nests json in the API

/** Rules of our API */
router.use((req, res, next) => {
    // Should be changed in Production with specific IPs
    res.header('Access-Control-Allow-Origin', '*'); // our request can come from anywhere
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
router.use('/api/books', bookRoutes);

/** Error Handling */
router.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });
});

/**Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => {
    logging.info(
        NAMESPACE,
        `Server running on http://${config.server.hostname}:${config.server.port}`
    );
});
