// fileName : server.js 
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to EuphoriaSportz API!' });
});

app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
    ];
    res.json(users);
});

app.get('/api/sports', (req, res) => {
    const sports = [
        { id: 1, name: 'Football', category: 'Team Sport' },
        { id: 2, name: 'Basketball', category: 'Team Sport' },
        { id: 3, name: 'Tennis', category: 'Individual Sport' },
        { id: 4, name: 'Swimming', category: 'Individual Sport' }
    ];
    res.json(sports);
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    // In a real app, you'd save this to a database
    console.log('Contact form submission:', { name, email, message });
    
    res.json({ 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.' 
    });
});

// Start the server
app.listen(port, () => {
    console.log(`EuphoriaSportz API server is running on http://localhost:${port}`);
});