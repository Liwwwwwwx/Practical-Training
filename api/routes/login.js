var express = require('express');
var router = express.Router();

function user(name, psw) {
  this.name = name;
  this.psw = psw;
}

var users = [
  new user('suoji','000000'),
  new user('fsq','000000')
];

router.get('/', function(req, res) {
  console.log('收到');
  res.send(users);
});

router.post('/login', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  //console.log(req.query);
  console.log(req.body);
  var name = req.body.name;
  var psw = req.body.psw;
  for (var i = 0; i < users.length; i++) {
    if(users[i].name == name && users[i].psw == psw) {
      res.send(JSON.stringify({
        data:{
          username:name,
          password:psw
        },
        isLogin:true,
        status:'200',
        msg:'登陆成功'
      }));
      return ;                       
    }
  }
  res.send(JSON.stringify({
    isLogin:false,
    msg:'用户名密码错误',
    status:'102'
  }));
});

module.exports = router;
