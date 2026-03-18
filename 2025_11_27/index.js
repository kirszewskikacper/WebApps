const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const { MongoClient, ServerApiVersion } = require('mongodb');

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());


async function start(){
  const client= new MongoClient(process.env.MONGO_URL);
  await client.connect();
  app.locals.db = client.db();

  const server = app.listen(3001, () => {
    console.log('Server running on https://localhost:3001');
  })
}


const mongoClient = new MongoClient(mongoUri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

app.use(async (req, res, next) => {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("Cluster");

        await db.collection("accessLogs").insertOne({
            timestamp: new Date(),
            method: req.method,
            path: req.originalUrl,
            payload: req.body
        });
    } catch (e) {
        
    }
    next();
});

app.get('/wpisy', async (req, res) => {
    try {
        const result = await prisma.wpis.findMany({
            include: { kategoria: true, komentarz: true }
        });
        res.json(result);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.get('/wpis/:id', async (req, res) => {
    try {
        const wpis = await prisma.wpis.findUnique({
            where: { id: Number(req.params.id) },
            include: { kategoria: true, komentarz: true }
        });
        res.json(wpis);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/wpis', async (req, res) => {
    const { uzytkownik, zawartosc, id_kategorii } = req.body;

    try {
        const created = await prisma.wpis.create({
            data: { uzytkownik, zawartosc, id_kategorii },
            include: { kategoria: true, komentarz: true }
        });
        res.json(created);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.put('/wpis/:id', async (req, res) => {
    const { uzytkownik, zawartosc, id_kategorii } = req.body;

    try {
        const updated = await prisma.wpis.update({
            where: { id: Number(req.params.id) },
            data: { uzytkownik, zawartosc, id_kategorii },
            include: { kategoria: true, komentarz: true }
        });
        res.json(updated);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.delete('/wpis/:id', async (req, res) => {
    try {
        const removed = await prisma.wpis.delete({
            where: { id: Number(req.params.id) }
        });
        res.json(removed);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.get('/kategorie', async (req, res) => {
    try {
        const list = await prisma.kategoria.findMany({
            include: { wpis: true }
        });
        res.json(list);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/kategoria', async (req, res) => {
    try {
        const created = await prisma.kategoria.create({
            data: { kategoria: req.body.kategoria }
        });
        res.json(created);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/komentarz', async (req, res) => {
    const { id_wpisu, uzytkownik, zawartosc } = req.body;

    try {
        const created = await prisma.komentarz.create({
            data: { id_wpisu, uzytkownik, zawartosc }
        });
        res.json(created);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.delete('/komentarz/:id', async (req, res) => {
    try {
        const removed = await prisma.komentarz.delete({
            where: { id: Number(req.params.id) }
        });
        res.json(removed);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.use(async (err, req, res, next) => {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("Cluster");

        await db.collection("errorLogs").insertOne({
            timestamp: new Date(),
            message: err.message,
            path: req.originalUrl,
            method: req.method,
            payload: req.body
        });
    } catch (e) {}

    res.json({ error: "error" });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
