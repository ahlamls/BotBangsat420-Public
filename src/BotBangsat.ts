import * as mysql from 'mysql';

import { RandomKata } from './RandomKata';
import { DrawToCanvas } from './DrawToCanvas';
import { uploadToFacebook } from './FBUploader';
import { Log } from './rz-logger';

require('dotenv').config();

class BotBangsatClass {
    constructor() { }
    private specialWord = 'bangsat';
    private kata: any[] = [];

    public async upload(timer: any[]): Promise<void> {
        await this.getKata()
            .then((kata) => {
                this.kata = kata;
            });

        const selectedKata: string = RandomKata(this.kata);
        
        let sentence = selectedKata.includes(' -- ') ? ` ${selectedKata.split(' -- ').join(this.specialWord)}` : ` ${selectedKata} ${this.specialWord}`;
        if(selectedKata === 'bapak') {
            sentence = `bapak kau ${this.specialWord}`
        }

        await DrawToCanvas.drawTextToCanvas(selectedKata, sentence);
        await DrawToCanvas.uploadToImgur()
            .then((res) => {
                Log('Uploaded to imgur: ' + res.link);
                uploadToFacebook({...res, word: selectedKata, remainings: this.kata.length - 1}, () => {
                    this.removeKata(selectedKata, () => {
                        this.updateKata(this.kata);
                    });

                    const timeout = Math.floor(Math.random() * timer.length);
                    Log(`Will upload again after ${timer[timeout]} minutes`);

                    setTimeout(() => {
                        this.upload(timer);
                    }, timer[timeout] * 60000);
                });
            })
            .catch((err) => {
                Log(err);
            });
    }

    private removeKata(kata: string, callback?: Function): void {
        const indexOfKata = this.kata.indexOf(kata);
        if (typeof this.kata[indexOfKata] !== 'undefined') {
            this.kata.splice(indexOfKata, 1);
            callback && callback();
        }
        else {
            callback && callback();
        }
    }

    private getKata(): Promise<string[]> {
        return new Promise((res, rej) => {
            const connection = mysql.createConnection({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE
            });

            connection.connect();
            connection.query('SELECT kata FROM `kata` WHERE `id` = 1', (error, results, fields) => {
                if(error !== null) {
                    rej(error.code);
                }
                res(results[0].kata.split(','));
            });
            connection.end();
        })
    }

    private updateKata(kata: string[]): Promise<any> {
        const stringOfKata = kata.join(',');
        return new Promise((res, rej) => {
            const connection = mysql.createConnection({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE
            });
            
            connection.query(`UPDATE kata SET kata = "${stringOfKata}"`, (error, results, fields) => {
                if(error !== null) {
                    rej(error.code);
                }
                Log(`Database updated!`);
                connection.end();
                res();
            });
        });
    }

}

export const BotBangsat = (() => new BotBangsatClass());
