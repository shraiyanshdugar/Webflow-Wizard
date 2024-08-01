var axios = require('axios');
var data = JSON.stringify({});

var config = {
  method: 'get',
  url: 'http://localhost:3000/api/petBuy/petBuy',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1ZGMwZmI3OGY4MDEzNjQxZDhhNzk0IiwibmFtZSI6ImhpaWlpIiwiZW1haWwiOiJzZHVnQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NTQ3NjMxMzgsImV4cCI6MTY1NDc2NjczOH0.OxkNCugyJR1H-nuZqTiyCb9VrKUIyyxqjSuAs7tqcik', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(async function (response) {
  let my =response.data
  let str = response.data

// string to function
let copy = new Function('return ' + str)();
console.log( await copy(1,2,3,4))
 
})
.catch(function (error) {
  console.log(error);
});
