"# react-dashboard-with-node-and-mongodb" 



The backend is Node JS express based. To create an initial express based app, following steps were followed:
1. npm install express
2. npx express-generator


The following link helped me in creating an initial backend Node JS express based app.
https://auth0.com/blog/create-a-simple-and-stylish-node-express-app/

I also install 'nodemon' into my node packages and then replaced start tag in my scripts tag in package.json file and replaced it with the following line:
   "start": "nodemon ./bin/www"

so my package.json file had the scripts tag as follows:
  "scripts": {
    "start": "nodemon ./bin/www"
  }

Purpose of doing this: conventionally when working with node express after every change we need to terminate the server and then rerun the start script. With this command the server will update live and whenever anything will be changed in the backend server the effects can be seen without restarting it again. Helps a lot in debugging :)

Additionally, I used MongoDB as a backend database. Makes saving and authenticating user easier. 

The front end is React JS based.