const express = require('express')
const jwt = require('jsonwebtoken');
const app = express()
var cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;
const stripePayment = require('stripe')(process.env.STRIPE_PAYMENT_SECRET_KEY);
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors())
app.use(express.json())


// MONGODB CONNECTION

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pajtj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


//VERIFY JWT
function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'UnAuthorized access' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' })
        }
        req.decoded = decoded;
        next();
    });
}

// DATABASE CONNECTION
async function run() {
    try {
        await client.connect();
        const usersCollection = client.db('phoneplus').collection('users');
        const productsCollection = client.db('phoneplus').collection('products');
        const reviewsCollection = client.db('phoneplus').collection('reviews');
        const PurchaseInfoCollection = client.db('phoneplus').collection('PurchaseInfo');
        const paymentCollection = client.db('phoneplus').collection('payments');
        console.log('Database Connect Hoise')

        // working -----------------------

        const verifyAdmin = async (req, res, next) => {
            const requester = req.decoded.email;
            const requesterAccount = await userCollection.findOne({ email: requester });
            if (requesterAccount.role === 'admin') {
                next();
            }
            else {
                res.status(403).send({ message: 'forbidden' });
            }
        }

        // STRIPE PAYMENT API
        app.post('/create-payment-intent', verifyJWT, async (req, res) => {
            const { Price } = req.body;
            // const price = service.price;
            const amount = Price * 100;
            const paymentIntent = await stripePayment.paymentIntents.create({
                amount: amount,
                currency: 'usd',
                payment_method_types: ['card']
            });
            res.send({ clientSecret: paymentIntent.client_secret })
        });

        // PRODUCT ITEM LOAD ROUTES
        app.get('/products', verifyJWT, async (req, res) => {
            const query = {};
            const cursor = productsCollection.find(query);
            // .project({ name: 1 });
            const items = await cursor.toArray();
            res.send(items)
        });

        app.post('/products', verifyJWT, async (req, res) => {
            const products = req.body;
            const result = await productsCollection.insertOne(products);
            res.send(result);
        });

        // PRODUCT ITEM SINGLE DELETE
        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productsCollection.deleteOne(query);
            res.send(result);
        });

        // USERS ROUTES

        app.get('/manageusers', verifyJWT, async (req, res) => {
            const users = await usersCollection.find().toArray();
            res.send(users);
        });

        app.put('/users/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user,
            };
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5d' })
            res.send({ result, token });
        });

        app.get('/admin/:email', async (req, res) => {
            const email = req.params.email;
            const users = await usersCollection.findOne({ email: email });
            const isAdmin = users.role === 'admin';
            res.send({ admin: isAdmin })
        })

        app.put('/manageusers/admin/:email', verifyJWT, verifyAdmin, async (req, res) => {
            const email = req.params.email;
            const filter = { email: email };
            const updateDoc = {
                $set: { role: 'admin' },
            };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        // ORDERS ROUTES -------------------
        app.post('/PurchaseInfo', async (req, res) => {
            const PurchaseInfo = req.body
            // const exists = await bookingCollection.findOne(query);
            // if (exists) {
            //     return res.send({ success: false, booking: exists })
            // }
            const result = await PurchaseInfoCollection.insertOne(PurchaseInfo)
            res.send(result);
        });

        app.get('/PurchaseInfo', verifyJWT, async (req, res) => {
            const customerEmail = req.query.customerEmail;
            // const authorization = req.headers.authorization;
            // console.log('my test', authorization)
            const decodedEmail = req.decoded.email;
            if (customerEmail === decodedEmail) {
                const query = { customerEmail: customerEmail };
                const PurchaseInfo = await PurchaseInfoCollection.find(query).toArray();
                return res.send(PurchaseInfo);
            }
            else {
                return res.status(403).send({ message: 'forbidden access' });
            }
        });

        // LOAD SINGLE PurchaseInfo ON PAYMENT PAGE
        app.get('/PurchaseInfo/:id', verifyJWT, async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const PurchaseInfo = await PurchaseInfoCollection.findOne(query);
            res.send(PurchaseInfo);
        })

        app.patch('/PurchaseInfo/:id', verifyJWT, async (req, res) => {
            const id = req.params.id;
            const payment = req.body;
            const filter = { _id: ObjectId(id) };
            const updatedDoc = {
                $set: {
                    paid: true,
                    transactionId: payment.transactionId
                }
            }
            const updatedPurchase = await PurchaseInfoCollection.updateOne(filter, updatedDoc);
            const result = await paymentCollection.insertOne(payment);
            res.send(updatedPurchase);
        })


        // working --------------------
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
    res.send(' Hello From phone plus Server !')
})

// PORT
app.listen(port, () => {
    console.log(`listening  on port ${port}`)
})



