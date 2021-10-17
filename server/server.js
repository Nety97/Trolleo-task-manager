const express = require('express');
const bp = require('body-parser')
const cors = require('cors');
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const DB = require('./modules/modules');
const withAuth = require('./controllers/withAuth');
const { DatabaseError } = require('pg-protocol');

const app = express()
// env.config();
app.use(cors());
app.use(bp.urlencoded({ extended: false }))
app.use(bp.json());

app.post('/register', (req,res)=>{
  
  const {name, email, password} = req.body
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  if (!name || !email || !password) {
      return res.status(404).json('incorrect form submission')
  }
  DB.createUser(name, email, hash)
  .then(data =>{
    res.send({message: 'ok', data})
  })
  .catch(err => {
    res.send({message: err})
  })
})



app.post('/signin', (req,res)=>{
  
  const {email, password} = req.body
  if (!email || !password) {
    return res.status(404).json('incorrect form submission')
  }

  DB.checkUser(email)
  .then(data => {
    const valid = bcrypt.compareSync(password, data[0].password);
    if (valid) {
      const payload = {email};
      const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '1h'
        })
      return res.send({user: data, token: token})
    }else{
      res.status(404).json('wrong credentials')
    }
  })
  .catch(err => {
    res.send({message: err})
  })
})

app.post('/checkToken', withAuth.withAuth, (req,res)=> {res.sendStatus(200)})

app.post('/createTable', (req, res) => {
  const {userId, tableName} = req.body
  DB.checkTable(userId,tableName)
  .then(data => {
    if (data.length > 0) {
      res.send({message: 'Table name alredy exists'})
    } else {
      DB.createtable(userId, tableName)
      .then(data => {
          DB.getUsertable(userId)
          .then(data => {
            res.send(data)
          })
          .catch(err => {
            res.send({message: err})
          })
      })
      .catch(err => {
        res.send({message: err})
      })
    }
  })
  .catch(err => {
    res.send({message: err})
  })
 
})

app.post('/getUserTables', (req,res) => {
  const {userId} = req.body
  DB.getUsertable(userId)
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.send({message: err})
  })
})

app.post('/getTable', (req,res) => {
  const {userId, table} = req.body
  DB.getTableByUser(userId, table)
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.send({message: err})
  })
})

app.post('/addTask', (req, res) => {
  const {userId, table, todoArr, progressArr, doneArr} = req.body
  DB.addTo(userId, table, todoArr, progressArr, doneArr, res) 
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.send({message: err})
  })
})






app.listen(process.env.PORT, ()=>{
    console.log('listening on port '+ process.env.PORT);
  })