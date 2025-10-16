const express = require('express')
const fs = require('fs');
const mime = require('mime-types')
const {join} = require("node:path");
const app = express()
const port = 3000

app.get('/main', (req, res) => {
    res.send('Hello World!')
})

app.get('/htmli', (req, res) =>{
    res.send('<h1>HTML napisany bezpośrednio w node</h1>')
})

app.get('/json', (req, res) => {
    res.json({
        Weekday: "Thursday",
        Mood: "Great"
    })
})

app.get('/html', (req, res) => {
    res.sendFile(join(__dirname, 'html.html'))
})

app.get('/get_params', (req, res) => {
    res.json({
        ok: "ok"
    })

    let timestamp = Date.now();
    const fileJson = 'params_'+timestamp+'.json'
    fs.writeFile(fileJson, JSON.stringify(req.query), (err) => {});
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname , 'assets'+req.url), err => {
        if (err) {
            res.json({
                error: 404
            })
        }
        else {
            console.log(mime.lookup(req.url))
        }
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})