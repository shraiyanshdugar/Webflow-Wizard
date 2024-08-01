var spawn = require('child_process').spawn;  
var bbPromise = require('bluebird');
const reader = require('xlsx')

const parentFunc = (async(pet_id,filePath) => {
  function loadProcess(arg) {
  
    var wishlistPath = __dirname + "//wishlistScript.js";
      return new bbPromise(function(resolve, reject) {
        var process = spawn('node', [wishlistPath, arg]);
  
        process.stdout.on('data', function(data) {
          console.log(data.toString() + "parent is working");
        });
  
        process.stderr.on('data', function(err) {
          console.log(err.toString());
        });
  
        process.on('exit', function() {
          resolve();
        });
      });
    }

    
    // Reading our test file
    const file = reader.readFile(filePath)
      
    let data = []
      
    const sheets = file.SheetNames
      
    for(let i = 0; i < sheets.length; i++)
    {
       const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
       temp.forEach((res) => {
         res["pet_id"]=pet_id
          data.push(res)
       })
    }



  var finalData=data.map((val)=>{
    return JSON.stringify(val);
  })
  
  var commands =finalData.map(function(value) {
    return loadProcess.bind(null, value);
  });
  
    /* var commands = [1, 2, 3, 4, 5].map(function(value) {
      return loadProcess.bind(null, value);
    }); */
   
  
  
  bbPromise.map(commands, function (command) {
      return command();
    }, {
      concurrency: 2
    })
    .then(function () {
      console.log('Child Processes Completed');
    });

});



module.exports = {parentFunc}