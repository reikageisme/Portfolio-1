const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Anti-curl & Anti-scraping Middleware
app.use((req, res, next) => {
    const ua = req.headers['user-agent'] || '';
    const blockedAgents = ['curl', 'wget', 'postman', 'python', 'java', 'libwww', 'ruby', 'go-http-client', 'axios', 'node-fetch'];
    const isBlocked = blockedAgents.some(agent => ua.toLowerCase().includes(agent));
    
    if (isBlocked || ua.trim() === '') {
        return res.status(403).send('Access Denied: Scrapers and automated requests are not allowed.');
    }
    next();
});

// Helper function to run DB queries
const fetchAll = (query) => {
    return new Promise((resolve, reject) => {
        db.all(query, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const fetchGet = (query) => {
    return new Promise((resolve, reject) => {
        db.get(query, [], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

// Unified profile endpoint
app.get('/api/profile', async (req, res) => {
    try {
        const profileInfo = await fetchGet("SELECT * FROM profile WHERE id = 1");
        const contactInfo = await fetchGet("SELECT * FROM contact WHERE id = 1");
        const skills = await fetchAll("SELECT * FROM skills");
        const experience = await fetchAll("SELECT * FROM experience");
        const socials = await fetchAll("SELECT * FROM socials");
        const payment = await fetchAll("SELECT * FROM payment");

        const profileData = {
            ...profileInfo,
            contact: contactInfo || {},
            skills: skills.map(s => s.name),
            experience: experience,
            socials: socials,
            payment: payment,
            songs: []
        };

        res.json(profileData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Fallback to index.html for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
