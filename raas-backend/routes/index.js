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
const uri = "mongodb+srv://shksalmanahmad:shksalmanahmad@nodelearningreactlogin.lryek.mongodb.net/test";
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
      message: 'User registered successfully'
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
    db.collection('Users').findOne(userObj, function (err, result) {
      assert.equal(null, err);
      console.log("User found");

    });
    client.close();
    res.status(200).send({
      message: 'User loggedin successfully'
    })
  });


});

module.exports = router;
