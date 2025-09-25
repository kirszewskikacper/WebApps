let http = require("http");
let fs = require('fs/promises');
const { readFile } = require('fs/promises')
http.createServer(async(req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });

    const pathname = req.url
    switch (true) {
        case pathname === '/main':
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
            res.end('Strona główna')
            break
        case pathname === '/json':
            const json = { Month: "November", Day: "13th" };
            const dane = JSON.stringify(json);
            res.write(dane);
            break
        case pathname === '/file':
            const file = await readFile('file.html', 'utf8');
            res.end(file.toString())
            break
        case pathname === '/htmlfile':
            res.end("<h1>Zadanie ukończone</h1>");
            break
        default:
            res.status = 404;
            res.end('Error: Not Found!');

    }

}).listen(8080);