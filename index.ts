import { BotBangsat } from  './src/BotBangsat';
import { ActivateAPIServer } from './src/BotBangsatAPI';

async function app() {
    ActivateAPIServer();
    Upload();
}

function Upload() {
    const timer = [15, 20, 25, 30, 35, 40];
    const timer2 = [1, 1, 1, 2, 2, 2, 3];
    BotBangsat().upload(timer);
}

app();