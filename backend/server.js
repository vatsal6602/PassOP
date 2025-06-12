const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
dotenv.config()
const bodyparser = require('body-parser')
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const cors = require("cors")

const dbName = 'passop';
const app = express()
const port = process.env.PORT || 8000;
app.use(cors())
app.use(bodyparser.json())

client.connect();

//get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// save password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success: true , result: findResult}) 
})

//delete password
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success: true , result: findResult}) 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
