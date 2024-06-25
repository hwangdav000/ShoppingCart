Shopping Cart is composed of 2 applications
1. node_api - server backend
2. ReactApp - frontend

ReactApp is created using webpack, React, bootstrap, react-redux
node_api is created using Express, and storing data using mongoose, using JWT (Json web token)

In order to start the Shopping cart application we first need to
1. Copy the repo
2. Need to initialize the dependencies navigate to where you stored the repo and run `npm i` in both node_api and ReactApp base folders
3. Once that is complete can then run `npm run start` in both folders. Running this command in node_api will start the backend and running htis in ReactApp will start the front end.
4. Then go to ReactApp and then ctrl+click on the URL to where the frontend is served.