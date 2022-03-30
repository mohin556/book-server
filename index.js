const express = require('express')

const ObjectID = require('mongodb').ObjectId;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();



const app = express()


const { MongoClient } = require('mongodb');
app.use(cors());
app.use(bodyParser.json());

console.log(process.env.DB_PASS)

const port  = 5050




app.get('/', (req, res) => {
  res.send('Hello World!')
})





// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2iwiq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2iwiq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("shop").collection("books");
  const oderCollection = client.db("shop").collection("lists");
  
  app.get('/books',(req,res) =>{
    collection.find()
    .toArray( (err,result) =>{
      res.send(result)
      
    })
  })
  app.get('/lists',(req,res)=>{
    oderCollection.find()
    .toArray( (err,result) =>{
      res.send(result)
      
    })
  })
  app.get('/yes/:id',(req,res)=>{
    collection.find({_id: ObjectID(req.params.id)})
    .toArray((err,items) =>{
    
      res.send(items[0])
    })
  })
  app.post('/addlists',(req,res) =>{
    const getList = req.body;
    oderCollection.insertOne(getList)
    .then(result =>{
      res.send(result.insertedCount > 0)
    })
    res.send(getList)
    
})
  app.post('/addimage',(req,res) =>{
      const getFrom = req.body;
      collection.insertOne(getFrom)
      .then(result =>{
        res.send(result.insertedCount > 0)
      })
      res.send(getFrom)
  })
  app.delete('/deletit/:id',(req,res)=>{
    // console.log(req.params.id)
    oderCollection.findOneAndDelete({_id:  (req.params.id)})
    .then(result =>{
      console.log(result)
      res.send(result.deletedCount > 0)
     
     
    })
      // oderCollection.findOneAndDelete({_id: req.params.id})
      // .then(result =>{
      //   console.log( result.value )
      // })
  })

 


  // perform actions on the collection object

});









app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})