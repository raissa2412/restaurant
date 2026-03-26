require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Database Config
const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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

// API: Insert Booking
app.post('/api/book', (req, res) => {
    const { name, email, phone, date, guests } = req.body;

    console.log("Received:", req.body);

    const sql = `
        INSERT INTO reservations (name, email, phone, res_date, guests)
        VALUES (?, ?, ?, ?, ?)
    `;

    connection.query(sql, [name, email, phone, date, guests], (err, result) => {
        if (err) {
            console.error("Insert error:", err);
            return res.status(500).json({ message: "Database insert failed" });
        }

        console.log("Inserted successfully:", result);
        res.json({ message: "Booking successful" });
    });
});

// API: Get all bookings
app.get('/api/bookings', (req, res) => {
    connection.query("SELECT * FROM reservations", (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching data" });
        }
        res.json(results);
    });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});