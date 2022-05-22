const express = require('express')
const jwt = require('jsonwebtoken');
const app = express()
var cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors())
app.use(express.json())


// MONGODB CONNECTION

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fb0jm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// DATABASE CONNECTION
async function run() {
    try {
        await client.connect();
        const inventoryCollection = client.db('warehouse').collection('Items');
        const myCollection = client.db('warehouse').collection('MyItems');
        console.log('Database Connect Hoise')

        //VERIFY JWT
        function verifyJWT(req, res, next) {
            const authHeader = req.headers.authorization
            if (!authHeader) {
                if (!authHeader) {
                    console.log('test ', authHeader)
                    return res.status(401).send({ messege: 'unauthorized accsess' })
                }
                const accsessToken = authHeader.split(' ')[1];
                jwt.verify(accsessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                    console.log('test tokemn', accsessToken)
                    if (err) {
                        return res.status(403).send({ messege: 'FORBIDDEN accsess' });
                    }
                    req.decoded = decoded
                })

                next()
            }
        }

        // // AUTH USER LOGIN 
        // app.post('/Signin', async (req, res) => {
        //     const user = req.body;
        //     const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        //     res.send({ token })
        // });

        // // PRODUCT (MYITEM) ALL LOAD 
        // app.get('/MyItems', verifyJWT, async (req, res) => {
        //     const decodedEmail = req.decoded.email
        //     const email = req.query.email;
        //     if (email === decodedEmail) {
        //         const query = { email: email };
        //         const cursor = myCollection.find(query);
        //         const items = await cursor.toArray();
        //         res.send(items)
        //     }
        //     else {
        //         return res.status(403).send({ messege: 'FORBIDDEN accsess' });
        //     }
        // });

        // // PRODUCT (MYITEM) SINGLE LOAD
        // app.get('/MyItems/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const items = await myCollection.findOne(query);
        //     res.send(items);
        // });


        // // PRODUCT (MYITEM) SINGLE POST
        // app.post('/MyItems', async (req, res) => {
        //     const newProduct = req.body;
        //     const result = await myCollection.insertOne(newProduct);
        //     res.send(result)
        // })

        // // PRODUCT (MYITEM) SINGLE UPDATE 
        // app.put('/MyItems/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const updateUser = req.body;
        //     const filter = { _id: ObjectId(id) };
        //     const options = { upsert: true };
        //     const updateDoc = {
        //         $set: {
        //             name: updateUser.name,
        //             price: updateUser.price,
        //             quantity: updateUser.quantity,
        //             description: updateUser.description,
        //             supplier: updateUser.supplier,
        //             img: updateUser.img
        //         }
        //     };
        //     const result = await myCollection.updateOne(filter, updateDoc, options);
        //     req.send(result)
        // });

        // // PRODUCT ITEM SINGLE DELETE
        // app.delete('/MyItems/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await myCollection.deleteOne(query);
        //     res.send(result);
        // });

        // //=========== START INVENTORY ITEM ENDPOINT ============

        // // PRODUCT ITEM ALL LOAD 
        // // app.get('/Items', async (req, res) => {
        // //     const query = {};
        // //     const cursor = inventoryCollection.find(query);
        // //     const items = await cursor.toArray();
        // //     res.send(items)
        // // });  

        // // PRODUCT ITEM ALL LOAD 
        // app.get('/Items', async (req, res) => {
        //     const pages = parseInt(req.query.pages);
        //     const size = parseInt(req.query.size);
        //     const query = {};
        //     const cursor = inventoryCollection.find(query);
        //     let items
        //     if (pages || size) {
        //         items = await cursor.skip(pages * size).limit(size).toArray();
        //     }
        //     else {
        //         items = await cursor.toArray();
        //     }
        //     res.send(items)
        // });

        // // PRODUCT ITEM ALL LOAD FOR PAGINATION
        // app.get('/ItemsCount', async (req, res) => {
        //     const count = await inventoryCollection.estimatedDocumentCount();
        //     res.send({ count });
        // });

        // // PRODUCT ITEM SINGLE LOAD
        // app.get('/Items/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const items = await inventoryCollection.findOne(query);
        //     res.send(items);
        // });

        // // PRODUCT ITEM SINGLE POST
        // app.post('/Items', async (req, res) => {
        //     const newProduct = req.body;
        //     const result = await inventoryCollection.insertOne(newProduct);
        //     res.send(result)
        // })

        // // PRODUCT ITEM SINGLE UPDATE 
        // app.put('/Items/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const updateUser = req.body;
        //     const filter = { _id: ObjectId(id) };
        //     const options = { upsert: true };
        //     const updateDoc = {
        //         $set: {
        //             name: updateUser.name,
        //             price: updateUser.price,
        //             quantity: updateUser.quantity,
        //             description: updateUser.description,
        //             supplier: updateUser.supplier,
        //             img: updateUser.img
        //         }
        //     };
        //     const result = await inventoryCollection.updateOne(filter, updateDoc, options);
        //     req.send(result)
        // });

        // // PRODUCT ITEM SINGLE DELETE
        // app.delete('/Items/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await inventoryCollection.deleteOne(query);
        //     res.send(result);
        // });



    }
    finally {

    }

}

run().catch(console.dir);

// ROOT ENDPOINT 
app.get('/', (req, res) => {
    res.send(' Hello From Warehouse Server !')
})

// PORT
app.listen(port, () => {
    console.log(`listening  on port ${port}`)
})



