import * as https from 'https';

import { Log } from './rz-logger';

require('dotenv').config();

export const uploadToFacebook = (data: any, onFinish?: Function) => {
    const tokenFB = process.env.FB_TOKEN;
    const facebookPageID = process.env.FB_PAGEID;
    const requestURL = `https://graph.facebook.com/${facebookPageID}/photos?method=POST&url=${data.link}&access_token=${tokenFB}`;

    let result = '';
    https.get(requestURL, async resp => {
        resp.on('data', (chunk) => { result += chunk });
        resp.on('end', async () => {
            const json = JSON.parse(result);
            if ('error' in json) {
                Log('Can\'t upload image to FB :(\n[JSON_DUMP]:' + JSON.stringify(json.error));
            } else {
                Log(`Posted to FB with ID: ${json.id}!`);
                addComment(json.id, data);
                if(typeof onFinish !== 'undefined') {
                    onFinish();
                }
            }
        });
    }).on('error', (err) => {
        Log('Can\'t upload image to FB :(\n[REASON]:' + err);
    });
};

const addComment = (postID: string, data: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const tokenFB = process.env.FB_TOKEN;
            const facebookPageID = process.env.FB_PAGEID;
            const link: string = data.word;
            const comment = `https://kbbi.web.id/${link.toLowerCase().replace(' ', '_')}\n\nWarna Latar Belakang: ${data.bg}\nKata Tersisa: ${data.remainings}`;
            let requestURL = `https://graph.facebook.com/${facebookPageID}_${postID}/comments?method=POST&message=${encodeURIComponent(comment)}&access_token=${tokenFB}`;

            let result = '';
            https.get(requestURL, async resp => {
                resp.on('data', (chunk) => {
                    result += chunk;
                });
                resp.on('end', async () => {
                    const json = JSON.parse(result);
                    if ('error' in json) {
                        throw new Error(`Can't post comment on picture. [JSON_DUMP]: + ${JSON.stringify(json.error)}`);
                    } else {
                        Log(`Comment added!`);
                        resolve({ status: 'SUCCESS' });
                    }
                });
            });
        } catch (error) {
            reject({ status: 'ERR', error });
        }
    });
}
