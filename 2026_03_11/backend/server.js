const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let posts = [
  { id: 1, title: "Pierwszy post", contents: "Treść pierwszego posta", author: "Autor 1" },
  { id: 2, title: "Drugi post", contents: "Treść drugiego posta", author: "Autor 2" }
];

let comments = [
  { id: 1, post_id: 1, name: "Jan", email: "jan@example.com", text: "Super post!" },
  { id: 2, post_id: 1, name: "Anna", email: "anna@example.com", text: "Fajnie napisane" },
  { id: 3, post_id: 2, name: "Piotr", email: "piotr@example.com", text: "Czekam na więcej" }
];

let nextCommentId = 4;

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  
  if (!post) {
    return res.status(404).json({ message: "Post nie istnieje" });
  }
  
  res.json(post);
});

app.get('/api/posts/:id/comments', (req, res) => {
  const postId = parseInt(req.params.id);
  const postComments = comments.filter(c => c.post_id === postId);
  res.json(postComments);
});

app.post('/api/posts/:id/comments', (req, res) => {
  const postId = parseInt(req.params.id);
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ message: "Treść komentarza jest wymagana" });
  }
  
  const newComment = {
    id: nextCommentId++,
    post_id: postId,
    name: "Anonymous",
    email: "anonymous@example.com",
    text: text
  };
  
  comments.push(newComment);
  res.status(201).json(newComment);
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
  console.log(`Dostępne endpointy:`);
  console.log(`  GET    /api/posts`);
  console.log(`  GET    /api/posts/:id`);
  console.log(`  GET    /api/posts/:id/comments`);
  console.log(`  POST   /api/posts/:id/comments`);
});