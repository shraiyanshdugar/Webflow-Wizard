var express = require('express');
const path = require('path');
var app = express();
var PORT = 3090;
 
// With middleware
app.use('/', function(req, res, next){
    
    var options = {
        root: path.join(__dirname)
    };
     
    var fileName = 's.js';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
            next();
        }
    });
});
 
app.get('/', function(req, res){
    console.log("File Sent")
    res.send();
});
 
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
