const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

const db = knex({
   client: 'pg',
   connection: {
     host : 'postgresql-crystalline-26183',
     user : 'jordanancheta',
     password : '',
     database : 'smart-brain'
   }
 });
 
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send('it is working!') })
app.post('/signin', signin.handleSignin(db, bcrypt)) //one way to do it
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }) 
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req,res,db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.listen(process.env.PORT || 3000, () => {
   console.log(`app is running on port ${process.env.PORT}`);
});
