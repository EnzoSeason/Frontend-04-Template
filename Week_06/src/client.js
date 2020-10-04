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
        return `${this.method} ${this.path} HTTP/1.1\r\n${Object.keys(this.header)
            .map(key => `${key}: ${this.header[key]}`)
            .join('\r\n')}\r\n\r\n${this.bodyText}`;
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
                reject(error);
                connection.end();
            })
        });
    }
}

class ResponseParser {
    constructor() { 
        this.WAITING_STATUS_LINE = 0
		this.WAITING_STATUS_LINE_END = 1
		this.WAITING_HEADER_NAME = 2
		this.WAITING_HEADER_SPACE = 3
		this.WAITING_HEADER_VALUE = 4
		this.WAITING_HEADER_LINE_END = 5
		this.WAITING_HEADER_BLOCK_END = 6
		this.WAITING_BODY = 7

		this.current = this.WAITING_STATUS_LINE
		this.statusLine = ''
		this.headers = {}
		this.headerName = ''
		this.headerValue = ''
		this.bodyParser = null
    }
    
    receive(string) {
        for (let i = 0; i < string.length; i++) {
            this.receiveChar(string.charAt(i));
        }
    }

    /**
     * use finite-state-machine to read the response
     * @param {string} char 
     */
    receiveChar(char) {
        if (this.current === this.WAITING_STATUS_LINE) {
			if (char === '\r') {
				this.current = this.WAITING_STATUS_LINE_END
			} else {
				this.statusLine += char
			}
		} else if (this.current === this.WAITING_STATUS_LINE_END) {
			if (char === '\n') {
				this.current = this.WAITING_HEADER_NAME
			}
		} else if (this.current === this.WAITING_HEADER_NAME) {
			if (char === ':') {
				this.current = this.WAITING_HEADER_SPACE
			} else if (char === '\r') {
				this.current = this.WAITING_HEADER_BLOCK_END
			} else {
				this.headerName += char
			}
		} else if (this.current === this.WAITING_HEADER_SPACE) {
			if (char === ' ') {
				this.current = this.WAITING_HEADER_VALUE
			}
		} else if (this.current === this.WAITING_HEADER_VALUE) {
			if (char === '\r') {
				this.current = this.WAITING_HEADER_LINE_END
				this.headers[this.headerName] = this.headerValue
				this.headerName = ''
				this.headerValue = ''
			} else {
				this.headerValue += char
			}
		} else if (this.current === this.WAITING_HEADER_LINE_END) {
			if (char === '\n') {
				this.current = this.WAITING_HEADER_NAME
			}
		} else if (this.current === this.WAITING_HEADER_BLOCK_END) {
			if (char === '\n') {
				this.current = this.WAITING_BODY
			}
		} else if (this.current === this.WAITING_BODY) {
            console.log(char)
		}
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