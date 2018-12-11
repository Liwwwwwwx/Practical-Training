var express = require('express');
var router = express.Router();
var SignData = require('../models/signData.js');
var signData = new SignData();
//验证用户名是否重复
router.post('/name', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.body);
  let name = req.body.username;
  signData.checkName(name, (err, result) => {
    if(err) {
      console.log(err);
      res.send(false);
      return ;
    }
    console.log(result);
    console.log(result[0].sunum);
    if(result[0].sunum) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
});
//验证邮箱是否已被使用
router.post('/email', function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.body);
  let mail = req.body.email;
  signData.checkMail(mail, (err, result) => {
    /*
    if(err) {
      console.log(err);
      res.send(false);
      return ;
    }
    console.log(result);
    let mail = result[0].email;
    if(mail !== email) {
      res.send(false);
      return ;
    }
    res.send(true);
    */
    if(err) {
      console.log(err);
      res.send(false);
      return ;
    }
    console.log(result);
    console.log(result[0].sunum);
    if(result[0].sunum) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
});
//验证手机号是否已被使用
router.post('/phone', function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.body);
  let phone = req.body.phonenum;
  signData.checkPhone(phone, (err, result) => {
    if(err) {
      console.log(err);
      res.send(false);
      return ;
    }
    console.log(result);
    console.log(result[0].sunum);
    if(result[0].sunum) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
});
//建立新的用户
router.post('/newUser', function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.body);
  let name = req.body.username;
  let psw = req.body.password;
  let mail = req.body.email;
  let phone = req.body.phonenum;
  signData.insertOne(name, psw, phone, mail, (err, result) => {
    if(err) {
      console.log(err);
      res.send(false);
      return ;
    }
    console.log(result);
  });
  res.send(true);
});

module.exports = router;
