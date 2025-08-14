const express = require('express');
const sqlit3 = require('sqlite3')

const knex = require('knex');

const db = knex({
  client: 'sqlite3',
  connection: {filename: './db1.db'},
  useNullAsDefault: true
});

module.exports = knex;

const app = express();
const port = 3000;

app.use(express.static('public'))

app.get('/', (reg, res) => {
    res.sendFile(__dirname, + "/public/index.html")
})

app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}`)
})