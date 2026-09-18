const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = 3000; // Server poběží na portu 3000

// Middleware
app.use(cors()); // Povolí komunikaci mezi frontendem a backendem
app.use(express.json()); // Umožní serveru číst JSON data z formulářů

// Nastavení připojení k tvé SQL databázi (uprav si uživatele/heslo/názvy podle sebe)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kalendar' // Zde si doplň přesný název své databáze
});

// 1. API Endpoint pro FullCalendar (vrátí události z databáze)
app.get('/api/events', async (req, res) => {
    try {
        // Vybereme události z databáze (uprav tabulku a sloupce podle své DB)
        const [rows] = await pool.query("SELECT id, title, start, end, type FROM events");
        res.json(rows); // Pošleme data FullCalendaru jako JSON
    } catch (err) {
        console.error("Chyba při načítání událostí:", err);
        res.status(500).json({ error: "Chyba serveru při načítání událostí" });
    }
});

// Spuštění serveru
app.listen(PORT, () => {
    console.log(`Backend server úspěšně běží na adrese: http://localhost:${PORT}`);
});