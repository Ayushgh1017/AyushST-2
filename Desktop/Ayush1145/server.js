const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient('mongodb+srv://ayush:2011981145@cluster0.anmkpv1.mongodb.net/<database>?retryWrites=true&w=majority', { useNewUrlParser: true });

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

app.get('/bets', (req, res) => {
    client.connect((err) => {
        if (err) {
            console.error('Error connecting to MongoDB:', err);

        }

        const collection = client.db('db').collection('BETS');
        collection.find({}).toArray((err, bets) => {
            res.render('bets', { bets: bets });
        });
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
