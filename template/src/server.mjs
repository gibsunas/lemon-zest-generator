//@flow
import socket from 'socket.io';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes/index.mjs';

import http from 'http';
import type {DataProvider} from "./services/data/dataProvider.mjs";
import dataProvider from "./services/data/dataProvider.mjs";
import PROVIDERS from "./services/data/providers/providerEnum.mjs";

const debug = console.log;

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
const start = (dataProvider:DataProvider) => {
    var app = express();
    app.use(logger('dev'));
    app.use(cors(corsOptions));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use((req, res, next) => {
        req.custom = {
            dataProvider,
        };
        next();
    });

    app.use('/', routes);

    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        next(err);
    });
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500); //$ExpectedFlowError
            res.json({
                message: err.message, //$ExpectedFlowError
                error: err
            });
        });
    }
    app.use(function(err, req, res) {
        res.status(err.status || 500);//$ExpectedFlowError
        res.json({
            message: err.message,//$ExpectedFlowError
            error: {}
        });
    });

    var port = 3000;
    app.set('port', port);

    var server = http.createServer(app);

    server.listen(port);
    server.on('error', console.log);
    server.on('listening', onListening(server));

    debug('Installing express server to dataProvider');
    dataProvider.set({key:PROVIDERS.EXPRESS, service: app});

    debug('Installing http server to dataProvider');
    dataProvider.set({key:PROVIDERS.HTTP, service:server})

    debug('Installing socket server to dataProvider');
    dataProvider.set({key:PROVIDERS.SOCKETIO, service:socket(server)})

    return app;
};

const onListening = (server:*) => () =>{
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
};

class Server {
    constructor(dataProvider:DataProvider) {
        return start(dataProvider);
    }
}

export default Server;