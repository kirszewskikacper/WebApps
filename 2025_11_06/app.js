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
app.get('/api/contact-messages', (req, res) => {
    db.query('SELECT * FROM messages', (err, results) => {
        if (err) {
            console.error('Błąd podczas pobierania danych: ', err)
            res.status(500).json('Blad serwera')
        } 
        else {
            res.json(results)
        }
    })
})
app.get('/api/contact-messages/:id', (req, res) => {
    const id = req.params.id
    db.query('SELECT * FROM messages WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Błąd podczas pobierania danych: ', err)
            res.status(500).json({ error: 'Blad serwera'})
        } 
        if (results.length === 0) {
            res.status(404).json('Wiadomosc nie znaleziona')
        }
        else {
        res.json(results[0])
        }
    })
})
app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})
