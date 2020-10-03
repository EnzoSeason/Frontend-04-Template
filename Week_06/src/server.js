const http = require('http');

http.createServer((req, res) => {
    let body = [];
    req.on('error', err => {
        console.log(err);
    }).on('data', (chunk) => {
        body.push(chunk.toString());
    }).on('end', () => {
        body = body.join('&');
        console.log("Body:", body);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Hello World');
    });
}).listen(8088);

console.log("server start");