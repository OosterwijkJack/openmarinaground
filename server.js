const express = require('express');
const sqlit3 = require('sqlite3')
const knex = require('knex');

const db = knex({
  client: 'sqlite3',
  connection: {filename: './db1.db'},
  useNullAsDefault: true
});

const app = express();
const port = 3000;

app.use(express.static('public'))
app.use(express.json());

app.get('/', (reg, res) => {
    res.sendFile(__dirname + "/public/reservation_list/index.html")
})

app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}`)
})

app.get('/api/reservations', async (req, res) => {
    try {
        const reservations = await db('reservations').select('*');
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to add a reservation
app.post('/api/reservations', async (req, res) => {
    try {
      console.log(req.body);
        await db('reservations').insert(req.body);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});