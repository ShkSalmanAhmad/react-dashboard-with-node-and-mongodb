var express = require('express');
var router = express.Router();
var User = require('./Modals/User');
var uuid = require('uuid');
const mongo = require('mongodb');
var assert = require('assert');

/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
// const uri = "connection string";
// const client = new MongoClient(uri);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("<h1>Welcome to backend server</h1>");
  // res.render('index', { title: 'Express' });
});

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/register', function (req, res) {
  var userObj = {
    userId: uuid.v1(),
    email: req.body.email,
    password: req.body.password
  };
  mongo.connect(uri, function (err, client) {
    assert.equal(null, err);
    var db = client.db('raas-middle');
    db.collection('Users').insertOne(userObj, function (err, result) {
      assert.equal(null, err);
      console.log("Data inserted");
    });
    client.close();
    res.status(200).send({
      message: 'User registered successfully',
      userID: userObj.userId

    })
  });


});

router.post('/addApp', function (req, res) {
  var appObj = {
    appId: uuid.v1(),
    appName: req.body.appName,
    webAddress: req.body.webAddress,
    userID: req.body.userID
  };
  console.log("ID: " + appObj.userID);
  mongo.connect(uri, function (err, client) {
    assert.equal(null, err);
    var db = client.db('raas-middle');
    db.collection('Apps').insertOne(appObj, function (err, result) {
      assert.equal(null, err);
      console.log("APP inserted");
    });
    client.close();
    res.status(200).send({
      message: 'App registered successfully'
    })
  });


});

router.post('/login', function (req, res) {
  var userObj = {
    email: req.body.email,
    password: req.body.password
  };
  mongo.connect(uri, function (err, client) {
    assert.equal(null, err);
    var db = client.db('raas-middle');
    var id = "";
    var myDocument = db.collection('Users').find();

    myDocument.forEach(function (doc, err) {
      if (doc.email == userObj.email && doc.password == userObj.password) {
        client.close();
        res.status(200).send({
          message: 'User loggedin successfully',
          userID: doc.userId
        })
        return;

      }
    })


    // db.collection('Users').findOne(userObj, function (err, result) {
    //   assert.equal(null, err);
    //   console.log("User found");
    //   id = result.userId;
    //   console.log("Userid: " + id);
    // });
    // client.close();
    // res.status(200).send({
    //   message: 'User loggedin successfully',
    //   userID: id

    // })
  });


});

module.exports = router;
