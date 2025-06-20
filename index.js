


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const {MongoClient,ServerApiVersion, ObjectId}=require('mongodb')

const app = express();

const port = 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.ssb3nmc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`


const client = new MongoClient(uri, {
    serverApi: {    
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
}
});


async function run() {
    try {
        // await client.connect();
        console.log('Database connected successfully');

        const StayFinder = client.db('StayFinder');
        const Users = StayFinder.collection('users');
        const listings = StayFinder.collection('listings');
        const Data = StayFinder.collection('Data');

        // Example route to fetch data
        // app.get('/data', async (req, res) => {
        //     const data = await collection.find({}).toArray();
        //     res.json(data);
        // });
app.post('/users', async (req, res) => {
            const user = req.body;
         
            
            const result = await Users.insertOne(user);
            res.json(result);
        });

        // Example route to fetch all users
        app.get('/users', async (req, res) => {
            const users = await Users.find({}).toArray();
            res.json(users);
        });

        app.post('/listings', async (req, res) => {
            const listing = req.body;
           
            
            const result = await listings.insertOne(listing);
            res.json(result);
        });
        app.get('/listings', async (req, res) => {
            
            
            const allListings = await listings.find().toArray();
            
            
            res.json(allListings);
        });

        app.get('/listings/:id', async (req, res) => {
            const id = req.params.id;   
        const listing = await listings.findOne({ _id: new ObjectId(id) });
            res.json(listing);
        });
app.delete('/listings/:id', async (req, res) => {
            const id = req.params.id;   
            const result = await listings.deleteOne({ _id: new ObjectId(id) });
            res.json(result);
        });
        app.put('/listings/:id', async (req, res) => {
            const id = req.params.id;
            const updatedListing = req.body;
            const result = await listings.updateOne(    
                { _id: new ObjectId(id) },
                { $set: updatedListing }
            );
            res.json(result);
        });


        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            const result = await Data.insertOne(booking);
            res.json(result);   
        });
app.get('/bookings', async (req, res) => {
            const bookings = await Data.find({}).toArray(); 
            res.json(bookings);
        }); 


        // Example route to fetch a single user by ID
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const user = await Users.findOne({ _id: new ObjectId(id) });
            res.json(user);
        });

    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}












app.get('/', (req, res) => {
    res.send('Hello from the server!');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

run().catch(console.dir);