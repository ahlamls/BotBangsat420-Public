import {
    Canvas,
    createCanvas,
    registerFont
} from 'canvas';

import { Color } from './ColorManager';
import { Log } from './rz-logger';

class DrawToCanvasClass {
    private canvas: Canvas = createCanvas(512, 128);
    private context: CanvasRenderingContext2D = this.canvas.getContext('2d');
    private bgColor: any;
    private initialFontSize: number = 60;

    public async drawTextToCanvas(text: string): Promise<void> {
        return new Promise((res) => {
            Log('Generating Image...');

            this.bgColor = Color.randomRGBColor();

            this.initialFontSize = 60;

            this.context.textAlign = 'center';
            this.context.textBaseline = 'middle';
            this.context.font = `${this.initialFontSize}px Arial`;

            let decrease = 0;
            while (this.context.measureText(text).width > (this.canvas.width * 0.8)) {
                this.context.font = `${this.initialFontSize - decrease}px Arial`;
                decrease++;
            }

            this.context.fillStyle = Color.parseRGB(this.bgColor);
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.context.fillStyle = Color.getBrightness(this.bgColor) > 0.5 ? '#000' : '#fff';
            this.context.fillText(text, this.canvas.width / 2, this.canvas.height / 2);

            res();
        });
    }

    public async uploadToImgur(): Promise<any> {
        return new Promise((res, rej) => {
            Log('Uploading to Imgur');

            let link = '';

            const imgur = require('imgur');
            imgur.setAPIUrl('https://api.imgur.com/3/');
            imgur.getAPIUrl();
            imgur.uploadBase64(this.canvas.toDataURL().replace(/^data:image\/png;base64,/, ''))
                .then((json: any) => {
                    link = json.data.link;
                    res({
                        link,
                        bg: Color.rgbToHex(this.bgColor),
                        remainings: 0,
                    });
                })
                .catch((err: any) => {
                    link = '';
                    Log(`Fail... ${JSON.stringify(err)}`);
                    rej(`Fail... ${JSON.stringify(err)}`);
                });
        });
    }
}

export const DrawToCanvas = (() => new DrawToCanvasClass())();
