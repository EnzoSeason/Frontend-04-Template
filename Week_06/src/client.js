const net = require('net');

class Resquest {
    constructor(options) {
        this.method = options.method || 'GET';
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || '/';
        this.body = options.body || {};
        this.header = options.header || {};
        if (!this.header['Content-Type']) {
            this.header['Content-Type'] = "application/json";
        }

        if (this.header['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body);
        }

        if (this.header['Content-Type'] === 'application/x-www-form-urlencoded') {
            this.bodyText = Object.keys(this.body)
                .map(key => `${key}=${encodeURIComponent(this.body[key])}`)
                .join('&');
        }

        this.header['Content-Length'] = this.bodyText.length;
    }

    toString() {
        return `${this.method} ${this.path} HTTP/1.1\n${Object.keys(this.header)
            .map(key => `${key}: ${this.header[key]}`)
            .join('\n')}\n\n${this.bodyText}`;
    }

    send(connection) {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser;
            if (connection) {
                connection.write(this.toString());
            } else {
                // create TCP connection
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.toString());
                });
            }
            connection.on('data', (data) => {
                console.log(data.toString());
                parser.receive(data);
                if (parse.isFinished) {
                    resolve(parser.response);
                    connection.end()
                }
            });
            connection.on('error', (error) => {
                console.log(error);
                connection.end();
            })
        });
    }
}

class ResponseParser {
    constructor() { }
    receive(string) {

    }
}

void async function (){
    let req = new Resquest({
        method: "POST",
        host: "127.0.0.1",
        port: 8088,
        path: "/",
        haeder: {
            foo: 'test' 
        },
        body: {
            name: 'test'
        }
    });

    let res = await req.send();

    console.log(res);
}()