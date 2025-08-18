const express = require('express');
const sqlit3 = require('sqlite3')
const knex = require('knex');

const masterDB = knex({
  client: 'sqlite3',
  connection: {filename: './databases/MasterDatabase.db'},
  useNullAsDefault: true
});

const app = express();
const port = 3000;

app.use(express.static('public'))
app.use(express.json());

app.get('/reservations', (reg, res) => {
    res.sendFile(__dirname + "/public/reservation_list/index.html")
})
app.get('/new_reservation', (reg, res) => {
    res.sendFile(__dirname + "/public/new_reservation/index.html")
})
app.get('/', (reg, res) => {
    res.sendFile(__dirname + "/public/reservation_list/index.html")
})
app.get("/find_space", (reg, res)=>{
    res.sendFile(__dirname + "/public/find_space/index.html")
})
app.get("/admin", (req, res) =>{
    res.sendFile(__dirname + "/public/admin/index.html")
})
app.get("/admin/manage_spaces", (req, res)=>{
    res.sendFile(__dirname + "/public/admin/manage_spaces/index.html")
})
app.get("/admin/manage_spaces/add", (req, res)=>{
    res.sendFile(__dirname + "/public/admin/manage_spaces/add/index.html")
})
app.get("/admin/manage_spaces/edit", (req, res)=>{
    res.sendFile(__dirname + "/public/admin/manage_spaces/edit/index.html")
})

app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}`)
})

app.get('/api/reservations', async (req, res) => {
    try {
        const reservations = await masterDB('reservations').select('*');
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to add a reservation
app.post('/api/reservations', async (req, res) => {
    try {
        await masterDB('reservations').insert(req.body);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get("/api/spaces/", async (req, res)=>{
    try {
        const spaces = await masterDB('spaces').select('*');
        res.json(spaces);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.post("/api/spaces/get_by_name", async (req, res)=>{
    try {
        console.log(req.body.name);
        //const spaces = await masterDB('spaces').select('*');
        //res.json(spaces);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.post("/api/spaces/add", async (req,res) => {
    try{
        await masterDB("spaces").insert(req.body);
        res.json({success: true})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
})