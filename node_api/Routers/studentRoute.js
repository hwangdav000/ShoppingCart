let express = require("express")
let studentRouter = express.Router({}) // 

let StudentDataModel = require("../DataModels/StudentDataModel"); //this gives access to all the methods defined in mongoose to access mongo db data


//we'll accept the user object as req.body, use it to map with user.schema key value pair
//initialize the userModel, if no validation error, then use the mongoose method to save user
studentRouter.post("/api/signinup",(req, res)=>{ //localhost:9000/user/api/signinup
    console.log(req.body) //json data posted from API in body
    //initialize the userSchema

    StudentDataModel.findOne({studentName:req.body.studentName}).then((existingStudent)=>{
        if(existingStudent) {
            console.log("already existing user ", existingStudent);
            res.send(existingStudent)
        }
        else {//if user object is not present in users collection so we need to create 
            //new user and this is sign up

            let newStudent = new StudentDataModel(req.body)

            newStudent.save().then((newStudent)=>{//will get _id once document is created
                console.log("successful signup ", newStudent);
                res.send(newStudent)
            }).catch((err1)=>{
                console.log("err signup", err1);
                res.send("error while sign up")
            })
        }
    }).catch((err)=>{
        console.log("err sign in", err);
        res.send("error while searching user sign in")
    })
})


//code to fetch all the users from user collection and return back 
studentRouter.get("/api/students",(req, res)=>{
    StudentDataModel.find()
    .then((allstudents)=>{
        res.send(allstudents)
    })
    .catch(()=>{
        res.send("error while fetching users")
    })
})
  

module.exports = studentRouter;