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
            this.bodyText = JSON.parse(this.body);
        }

        if (this.header['Content-Type'] === 'application/x-www-form-urlencoded') {
            this.bodyText = Object.keys(this.body)
                .map(key => `${key}=${encodeURIComponent(this.body[key])}`)
                .join('&');
        }

        this.header['Content-Length'] = this.bodyText.length;
    }

    send() {
        return new Promise((resolve, reject) => {

        });
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
            name: test
        }
    });

    let res = await req.send();

    console.log(res);
}()