const express = require('express');
const mysql = require('mysql2/promise')

const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
  }
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