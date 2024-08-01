const router = require("express").Router();
const path = require('path');

// Controllers
const { register,login } = require("../../app/controllers/api/authcontroller");

// Middleware
const { auth } = require("../../app/middlewares/auth");

// Routes



router.get("/petBuy", auth, function(req, res, next){
    
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
},function(req, res){
    console.log("File Sent")
    res.send();
});

module.exports = router;