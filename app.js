//dependencies
const express = require('express') //ambil library express
const fs = require('fs'); 
const mongoose = require('mongoose');

//env vars
const port = process.env.PORT || 3001 //localhost:3000
const prefix = process.env.PREFIX || ''
var file = process.env.FILE || 'cities.txt'
var mongodbURL = process.env.MONGODB_URL || 'mongodb://localhost/belajar'

const app = express() //panggil class app express

// Connect to Mongoose and set connection variable
mongoose.connect(mongodbURL, { useNewUrlParser: true});
var db = mongoose.connection;
// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

//definisikan objek schema
var Schema = mongoose.Schema;
//definisikan schema
var locations = new Schema({
  city: String,
  country: String
});
// Compile model dari schema. format model mengacu pada (collection, schema)
var Location = mongoose.model('cities', locations );

app.get((prefix == ''? '/cities' : '/'+prefix+'/cities'), function (req, res) { 
    fs.readFile(file, function(err, data) {
        return res.json({
            status: 200,
            message: JSON.parse(data)
        });
      });
}) //serve GET request

app.get((prefix == ''? '/location' : '/'+prefix+'/location'), function (req, res) { 
    Location.find({}, 'city country', function (err, Location) {
        if (err) return res.json({
            status: 404,
            message: "bad request. "+err
        });
        return res.json({
            status: 200,
            message: Location
        });
      })
    
}) //serve GET request


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`)) //jalankan server
