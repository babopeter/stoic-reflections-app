const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

app.use(cors());
app.use(bodyParser.json());

// GET /api/reviews - List all past reviews
app.get('/api/reviews', (req, res) => {
    try {
        const files = fs.readdirSync(DATA_DIR);
        const reviews = files
            .filter(file => file.endsWith('.json'))
            .map(file => {
                const content = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
                return JSON.parse(content);
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        res.json(reviews);
    } catch (error) {
        console.error('Error reading reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

// GET /api/reviews/:id - Retrieve a specific review
app.get('/api/reviews/:id', (req, res) => {
    try {
        const filePath = path.join(DATA_DIR, `${req.params.id}.json`);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            res.json(JSON.parse(content));
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        console.error('Error reading review:', error);
        res.status(500).json({ error: 'Failed to fetch review' });
    }
});

// POST /api/reviews - Save a new review
app.post('/api/reviews', (req, res) => {
    try {
        const { date, answers } = req.body;
        const id = uuidv4();
        const newReview = {
            id,
            date: date || new Date().toISOString(),
            answers
        };
        const fileName = `${id}.json`;
        fs.writeFileSync(path.join(DATA_DIR, fileName), JSON.stringify(newReview, null, 2));
        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error saving review:', error);
        res.status(500).json({ error: 'Failed to save review' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
