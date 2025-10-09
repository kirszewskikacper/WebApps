let http = require('http');
const { readFile } = require('fs/promises');
const url = require('url');
const srv = http.createServer(async(req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    switch (pathname) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end('<h1>TEST</h1>')
            break
        case '/file':
            const file = await readFile('file.html', 'utf8')
            res.end(file.toString())
            break
        case '/json':
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify("siema"))
            break
        case '/tekst':
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.end('coswypisz')
            break
        case "/get_params":
            res.writeHead(200, { 'Content-Type': 'application/json' })
            const params = parsedUrl.query;
            res.end(JSON.stringify({ 'ok': 'ok' }))
            console.log("Parametry:", params)
            console.log(JSON.stringify(params))
            break
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end('Error: Not Found!')


    }
}).listen(8080);