// importing express top class and then creating experss server

console.log("In server js")

const express = require('express') // express calss constructor
const app = express() // invoke the class to create express app server

// we can have one main and multiple other express apps at a place
const adminApp = express(); // a new express app to handle requests mounted with admin in path


// setting up the midleware static , to handle all static files served to client
// serve static files like images, css using static middleware
// just add /static/ to path and it would move to public
app.use('/static', express.static('public'))

app.get('/', function (req, res) {
  res.send('Hello World from node api')
})

// case don't matter in request
// get request header from res
//http://localhost:3000/data?name=suyash&session=express
app.get('/datA', function(req,res) {
    let queryStr = req.query // i used to read the values after ? in api path
    console.log(queryStr)
    //console.log(res)
    res.json(queryStr)
    console.log(queryStr.name)
})


//http://localhost:3000/nameByID/2000
app.get('/nameByID/:id', function(req,res) {
    let queryParam = req.params["id"] // reads the parameter in path of API, can have multiple query params

    console.log(queryParam)
    if (queryParam== 2000) {
        res.send("<h1>User is present</h1>")
    } else {
        res.send("<h1>User not present</h1>")
    }
})

// browser does not allow for post call from url directly
// need to have a rest client or some entry point
app.post('/addUser', function(req,res) {
    let data = req.body // contains information passed as req.body

    res.json(data)
})

// js path treated as an endpoint if called in html, need to be added as api
// static files can be many 
app.get('/getalert', function(req,res) {
    res.sendFile(__dirname+ "/Public/index.html")
})

// // not feasible, can have a lot of files
// app.get('/alert_me.js', function(req,res) {
//     res.sendFile(__dirname+ "/Public/alert_me.js")
// })

// path mounting to other expres app
//locahost:3000/admin
app.use("/admin", adminApp)

adminApp.get("/", (req, res)=> {
    res.send("hello world from admin")
})

adminApp.get("/info", (req, res)=> {
    res.send("info world from admin")
})

// fall back strategy for every API not available 
// this is wild card to accept all failed calls
app.all('*', function(req,res) {
    res.sendFile(__dirname+ "/Public/index.html")
})


app.listen(3000)

console.log("api launched at - locahost:3000")

// express 3 main pillar
// 1. express
// 2. request - incoming data/ send from browser
// 3. response - whatever server api sends
