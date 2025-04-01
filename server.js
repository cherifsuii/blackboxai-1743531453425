const express = require('express');
const cors = require('cors');
const path = require('path');
const { articles, writers } = require('./models/data');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Move frontend files to public directory
app.use(express.static(path.join(__dirname)));

// API Routes
app.get('/api/articles', (req, res) => {
    res.json(articles);
});

app.get('/api/articles/:id', (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
});

app.get('/api/writers', (req, res) => {
    res.json(writers);
});

app.get('/api/writers/:id', (req, res) => {
    const writer = writers.find(w => w.id === parseInt(req.params.id));
    if (!writer) return res.status(404).json({ message: 'Writer not found' });
    res.json(writer);
});

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});