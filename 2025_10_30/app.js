const express = require('express')
const { join } = require('node:path')
const bodyParser = require('body-parser')

const app = express()
app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
})

app.get('/o-nas', (req, res) => {
    res.sendFile(join(__dirname, 'o-nas.html'))
})

app.get('/oferta', (req, res) => {
    res.sendFile(join(__dirname, 'oferta.html'))
})

app.get('/kontakt', (req, res) => {
    res.sendFile(join(__dirname, 'kontakt.html'))
})

app.post('/kontakt', (req, res) => {
    console.log('Imie:', req.body.name)
    console.log('Nazwisko:', req.body.surname)
    console.log('Email:', req.body.email)
    console.log('Wiadomość:', req.body.message)
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})
