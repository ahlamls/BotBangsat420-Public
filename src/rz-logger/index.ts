// tslint:disable

class RZLog {
    constructor(logs: any) {
        const date = new Date();
        date.setHours(date.getHours()+7);
        const logDate = `[${date.toUTCString()}+7]`;

        const first = logs.shift();
        console.log(logDate, first, ...logs);
    }
}

class RZErrorLog {
    constructor(logs: any) {
        const date = new Date();
        date.setHours(date.getHours()+7);
        const logDate = `[${date.toUTCString()}+7]`;

        const first = logs.shift();
        console.error(logDate, first, ...logs);
    }
}

export const Log = (...logs: any) => new RZLog(logs);
export const ErrorLog = (...logs: any) => new RZErrorLog(logs);
