var express = require('express');
var router = express.Router();
var LoginData = require('../models/loginData.js');
var loginData = new LoginData();
/*
function user(name, psw) {
  this.name = name;
  this.psw = psw;
}

var users = [
  new user('suoji','000000'),
  new user('fsq','000000')
];
*/

router.get('/', function(req, res) {
  console.log('收到');
  loginData.getAll((err, datas) => {
    if(err) {
      console.log(err);
    } else {
      res.send(datas);
    }
  });
});

router.post('/login', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.body);
  var name = req.body.name;
  var psw = req.body.psw;
  /*
  for (var i = 0; i < users.length; i++) {
    if(users[i].name == name && users[i].psw == psw) {
      res.send(true);
      return ;                       
    }
  }
  res.send(false);
  */

  loginData.getOne(name, (err, data) => {
    let password = '' + data[0].password;
    console.log(password);
    if(err) {
      console.log(err);
      res.send(false);
    } else {
      if (psw !== password) {
        //console.log(data[0].password);
        res.send(false);
      } else {
        res.send(true);
      }
    }
  });
});

module.exports = router;
