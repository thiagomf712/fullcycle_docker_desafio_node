const express = require('express')

const app = express()

const port = 3333

const config = {
  host: 'database',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql')

const connection = mysql.createConnection(config)

const createTableSQL = `CREATE TABLE IF NOT EXISTS people (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id)
)`

connection.query(createTableSQL, (err) => { console.log(err) });

connection.query(`INSERT INTO people(name) values('Wesley')`)

connection.query(`INSERT INTO people(name) values('Thiago')`)

connection.query(`INSERT INTO people(name) values('Diego Schell Fernandes')`)

connection.end()


app.get('/', (req, res) => {
  let html = `<h1>Full Cycle</h1>`;

  const connection = mysql.createConnection(config)

  connection.connect(() => {
    connection.query(`SELECT * FROM people`, (err, result, field) => {
      result.forEach((people) => {
        html = `${html} \n<p>${people.name}</p>`;
      })

      res.send(html)
    })
  })
})

app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})