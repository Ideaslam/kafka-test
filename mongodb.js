const express = require("express"); 
const ejs = require("ejs"); 
const mongoose = require("mongoose"); 
const bodyParser = require("body-parser"); 
  

var dev ="mongodb+srv://ghazeer:mNiWElpgunhEs31i@cluster0.lj3mcoj.mongodb.net/db_dev";
var production ="mongodb://172.28.32.223:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1";
mongoose.connect(production, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
}); 
  
const Location = mongoose.model('api_location_logs', { 
    action: { type: String }, 
    uri: { type: String } ,
    method :{type: String }
}); 
  
 
  
const app = express(); 
  
app.set("view engine", "ejs"); 
  
app.use(bodyParser.urlencoded({ 
    extended: true
})); 
  
 
  
async function show (){
    var data = await   Location.find().limit(20) ; 
console.log(data); 
} ; 
  show () ; 
app.get("/locations", async function (req, res) { 
    console.log('in');
    var data = await   Location.find().limit(20) ; 
    console.log(data); 
    res.send(data) ; 
    // location.find({projectName: 'name'}).sort({viewCount: -1}).limit(5).exec( 
    //     function(err, locations) {
    //         res.send(locations) ; 
    //     }
    // ); 
}); 
  
app.listen(3000, function(){ 
    console.log("App is running on Port 3000"); 
});