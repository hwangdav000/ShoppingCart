let express= require("express")

let env = process.environment // devl / local , produciton or testing

let devHelper = require("chat-gpt")


// yarn - explicitly install it 
// npm - comes with nodejs

// we need to initalize npm in our directory

// npm init => package.json <with meta data on the project>
// should never touch package-lock.json contains info about what dependencies the dependents have

// installation
// npm i <module_name> 

// dependencies - installed locally and in prod server

// npm i <module_name> -G (global)
// npm i <module_name> -D

// dev dependencies - will be installed locally but not in prod server

// cyclic dependencies - when we are not able to resolve the dependencies of dependencies
// package.lock.json - helps us to avoid such problems

// to install all packages present in package.json use below -
// npm i [no need to mention module]

// to uninstall the packages
// npm uninstall <module name> 

// nodemon save automatically / restart server
// npm i nodemon -D]


// Development dependencies (often abbreviated as "dev dependencies") are packages that are necessary only during the development phase of a software project. These dependencies include tools, libraries, and utilities that assist in tasks such as testing, linting, compiling, and building the project. They are not required for the production runtime of the application but are essential for developers to work on the project effectively.

// can keep separate and make produciton env lean

// "scripts": {
//     "start": "nodemon server.js",
//     "start-node": "node server.js",
//     "test": "echo \"Error: no test specified\" && exit 1"
//   },
// npm start