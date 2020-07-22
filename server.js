

// MIDDLEWARE
const clarifai = require('clarifai')
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

// POSTGRES CONFIG WITH KNEX.JS
const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'unizef',
        password : 'Digitalkid1990!',
        database : 'smartbrain'
    }
});

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// ENDPOINTS
app.get('/', (req, res) => {res.send('Its working!')})
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(port, () => {
    console.log('App is running on port 3000');
})

