//import our dependencies
const express = require('express')
const app = express()
const mysql = require('mysql2')
const dotenv = require('dotenv')

//configure environment variable
dotenv.config();

//create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//test the connection
db.connect((err) => {
    //connection is  not successful
    if(err) {
        return console.log('Error connecting to the database:', err)
    }
    //connection is successful
    console.log('Successfully connected to mysql:', db.threadId)
})

//1. Retrieve all patients
app.get('/patients', (req, res) => {
    const getPatients = 'SELECT * FROM patients';
    db.query(getPatients, (err, results) => {
        //if I have an error
       if(err){
        console.error(err);
        return res.status(400).json('Failed to get patients', err)
       }
       res.status(200).json(results);
    })
})

//2. Retrieve all providers
app.get('/providers', (req, res) => {
    const getProviders = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(getProviders, (err, results) => {
        //if I have an error
       if(err){
        console.error(err);
        return res.status(400).json({Error: 'Failed to get providers', error: err });
       }
       res.status(200).json(results);
    })
})

//3. Filter patients by First Name
app.get('/patientsName', (req, res) => {
    const getPatientsName = 'SELECT first_name FROM patients';
    db.query(getPatientsName, (err, results) => {
        //if I have an error
       if(err){
        console.error(err);
        return res.status(400).json({Error: 'Failed to get patients by first_name', error: err });
       }
       res.status(200).json(results);
    })
})

//4. Filter providers by specialty
app.get('/providerSpecialty', (req, res) => {
    const getProviderSpecialty = 'SELECT provider_specialty FROM providers';
    db.query(getProviderSpecialty, (err, results) => {
        //if I have an error
       if(err){
        console.error(err);
        return res.status(400).json({Error: 'Failed to get providers by providers_specialty', error: err });
       }
       res.status(200).json(results);
    })
})

//start and listen to the server
const PORT = 3000
app.listen(3000, () =>{
    console.log(`Server is running on http://localhost:${PORT}`)
})