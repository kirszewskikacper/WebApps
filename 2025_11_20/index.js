
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post('/wpisy', async (req, res) => {
    try {
        const { Autor, Tytul, Zawartosc, KatId } = req.body;
        const result = await prisma.wpis.create({ data: { Autor, Tytul, Zawartosc, KatId } });
        res.json(result);
    } catch {
        res.status(500).json({ error: 'Wystapil blad podczas tworzenia wpisu.' });
    }
});

app.get('/wpisy', async (req, res) => {
    try {
        const items = await prisma.wpis.findMany({ include: { Kategoria: true, Komentarz: true } });
        if (!items || items.length === 0) return res.status(404).json({ error: 'Nie znaleziono wpisu' });
        res.json(items);
    } catch {
        res.status(500).json({ error: 'Wystapil blad podczas pobierania wpisow.' });
    }
});

app.get('/wpisy/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const item = await prisma.wpis.findUnique({
            where: { id_wpis: id },
            include: { Kategoria: true, Komentarz: true },
        });
        if (!item) return res.status(404).json({ error: 'Nie znaleziono wpisu' });
        res.json(item);
    } catch {
        res.status(500).json({ error: 'Wystapil blad podczas pobierania wpisu!' });
    }
});

app.put('/wpisy/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { Autor, Tytul, Zawartosc, KatId } = req.body;
        const updated = await prisma.wpis.update({
            where: { id_wpis: id },
            data: { Autor, Tytul, Zawartosc, KatId },
        });
        res.json(updated);
    } catch {
        res.status(500).json({ error: 'Wystapil blad podczas aktualizacji wpisu!' });
    }
});

app.delete('/wpisy/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma.komentarz.deleteMany({ where: { WpisId: id } });
        await prisma.wpis.delete({ where: { id_wpis: id } });
        res.json(`Wpis o id: ${id} wraz z komentarzami usuniety!`);
    } catch {
        res.status(500).json({ error: 'Wystapil blad podczas usuwania wpisu!' });
    }
});

app.get('/kategoriezwpisami', async (req, res) => {
    try {
        const rows = await prisma.kategoria.findMany({ include: { Wpis: true } });
        res.json(rows);
    } catch {
        res.status(500).json({ error: 'Wystapil blad podczas pobierania kategorii z wpisami.' });
    }
});

app.get('/kategorie', async (req, res) => {
    try {
        const rows = await prisma.kategoria.findMany();
        res.json(rows);
    } catch {
        res.status(500).json({ error: 'Wystapil blad podczas pobierania kategorii.' });
    }
});

app.get('/kategoriezwpisami/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const row = await prisma.kategoria.findUnique({ where: { id_kat: id }, include: { Wpis: true } });
        res.json(row);
    } catch {
        res.status(500).json({ error: 'Wystapil blad podczas pobierania kategorii z wpisami.' });
    }
});

app.get('/kategorie/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const row = await prisma.kategoria.findUnique({ where: { id_kat: id } });
        res.json(row);
    } catch {
        res.status(500).json({ error: 'Wystapil blad podczas pobierania kategorii.' });
    }
});

app.post('/komentarze', async (req, res) => {
    try {
        const { AutorKom, Zawartosc, WpisId } = req.body;
        const created = await prisma.komentarz.create({ data: { AutorKom, Zawartosc, WpisId } });
        res.json(created);
    } catch {
        res.status(500).json({ error: 'Wystapil blad podczas tworzenia komentarza.' });
    }
});

app.get('/komentarze', async (req, res) => {
    try {
        const rows = await prisma.komentarz.findMany();
        res.json(rows);
    } catch {
        res.status(500).json({ error: 'Wystapil blad podczas pobierania komentarzy.' });
    }
});

app.get('/komentarze/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const row = await prisma.komentarz.findUnique({ where: { id_kom: id } });
        if (!row) return res.status(404).json({ error: 'Nie znaleziono komentarza' });
        res.json(row);
    } catch {
        res.status(500).json({ error: 'Wystapil blad podczas pobierania komentarza.' });
    }
});

app.get('/komentarze_dla_wpisu/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const rows = await prisma.komentarz.findMany({ where: { WpisId: id } });
        res.json(rows);
    } catch {
        res.status(500).json({ error: 'Wystapil blad podczas pobierania komentarzy dla wpisu.' });
    }
});

app.put('/komentarze/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { AutorKom, Zawartosc, WpisId } = req.body;
        const updated = await prisma.komentarz.update({
            where: { id_kom: id },
            data: { AutorKom, Zawartosc, WpisId },
        });
        res.json(updated);
    } catch {
        res.status(500).json({ error: 'Wystapil blad podczas aktualizacji komentarza!' });
    }
});

app.delete('/komentarze/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma.komentarz.delete({ where: { id_kom: id } });
        res.json(`Komentarz o id: ${id} usuniety!`);
    } catch {
        res.status(500).json({ error: 'Wystapil blad podczas usuwania komentarza!' });
    }
});

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
