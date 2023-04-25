export class ConsoleLog {

    // log = (...data: any[]) => {
    //     return console.log('\x1b[36m%s\x1b[0m', ...data);
    // };

    static log(...data: any[]) {
        return console.log('\x1b[36m%s\x1b[0m', ...data);
      }

    info = (...data: string[]) => {
        return console.log('\x1b[36m%s', ...data)
    };

    warn = (...data: string[]) => {
        return console.log('\x1b[33m%s', ...data)
    };

    errorLog = (...data: string[]) => {
        return console.log('\x1b[31m%s', ...data)
    };

}