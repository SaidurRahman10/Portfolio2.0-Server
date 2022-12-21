const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://popDB:M3U2jJ2TfaBfu3Hv@cluster0.qxzlll3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async () => {

    try{
        const projectCollection = client.db('portfolio').collection('project')

        app.get("/allproject", async (req, res) => {
            const query = {};
            const data = await projectCollection.find(query).toArray();
          
            res.send(data);
          });


          app.get("/allproject/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const place = await projectCollection.findOne(query);
            res.send(place);
          });



    }
    finally{

    }

};
run().catch((error) => console.log(error));




app.get("/", (req, res) => {
    res.send(" Server is Running");
  });
  
  app.listen(port);