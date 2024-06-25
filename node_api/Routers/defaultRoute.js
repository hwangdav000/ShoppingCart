//express router - class to create the route table
// define the API verbs
// define the API verbs restrictions
// doesn't need express defaultRouter invocation
// we can work same way  we did with express defaultRouter

let express = require('express');

// makes api case sensitive
let defaultRouter = express.Router({ caseSensitive: true }); // can set some configuraitons for api

defaultRouter.get('/', function (req, res) {
  res.send('Hello World from node api');
});

// case don't matter in request
// get request header from res
//http://localhost:3000/data?name=suyash&session=express
defaultRouter.get('/data', function (req, res) {
  let queryStr = req.query; // i used to read the values after ? in api path
  res.json(queryStr);
  console.log(queryStr.name);
});

//http://localhost:3000/nameByID/2000
defaultRouter.get('/nameByID/:id', function (req, res) {
  let queryParam = req.params['id']; // reads the parameter in path of API, can have multiple query params

  console.log(queryParam);
  if (queryParam == 2000) {
    res.send('<h1>User is present</h1>');
  } else {
    res.send('<h1>User not present</h1>');
  }
});

// browser does not allow for post call from url directly
// need to have a rest client or some entry point
defaultRouter.post('/addUser', function (req, res) {
  let data = req.body; // contains information passed as req.body

  res.json(data);
});

// js path treated as an endpoint if called in html, need to be added as api
// static files can be many
defaultRouter.get('/getalert', function (req, res) {
  res.sendFile(__dirname + '/Public/index.html');
});

module.exports = defaultRouter;
