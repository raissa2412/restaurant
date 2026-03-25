const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 🔐 Database Config (CHANGE PASSWORD AFTER PROJECT)
const dbConfig = {
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: '2cs3gygaCf5WzEn.root',
    password: 'q0Jga5XKpBaVlpwH',
    database: 'test',
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: false
    }
};

// Create connection
const connection = mysql.createConnection(dbConfig);

// Connect DB
connection.connect(err => {
    if (err) {
        console.error('❌ Database Connection Failed:', err.message);
        return;
    }
    console.log('✅ Connected to TiDB Cloud!');
});

// ✅ API: Insert Booking
app.post('/api/book', (req, res) => {
    console.log("Data received:", req.body);
    res.json({ message: "API working ✅" });
});


// ✅ API: Get all bookings (for testing)
app.get('/api/bookings', (req, res) => {
    connection.query("SELECT * FROM reservations", (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching data" });
        }
        res.json(results);
    });
});

// Start server
app.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
});