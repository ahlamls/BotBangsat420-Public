import express from 'express';

import { Log } from './rz-logger';

const port = process.env.PORT || 4040;

class BotBangsatAPI {
    // tslint:disable:no-empty
    // tslint:disable:max-line-length
    constructor() {
        const exp = express();
        exp.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        exp.get('/', (req, res) => {
            Log('Accesed!');
            res.send('<h3>Bot Bangsat 420 API</h3><p>I made this to keep bot awake by accesing this page from bot.</p>');
            res.end();
        });
        exp.listen(port, () => {
            Log('API Server started!');
        });
    }
}

/**
 * RZFury's Awaker
 *
 * I make this to make app stay awake on heroku by creating http server and access it every given minutes
 * @param {string} url
 * URL of The APP SERVER
 * @param {string} number
 * Array on numbers
 */
export const ActivateAPIServer = () => new BotBangsatAPI();
