const TodoUserData = require('../models/todo-userdata.js');
const db = require('../models/database.js');
var express = require('express');
var router = express.Router();

var todouserdata = new TodoUserData();
//上传头像
router.post('/uploadHead',(req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.body);
  var userid = req.body.userid;
  var avatar = req.body.imgPath;
  todouserdata.updateAvatar(userid, avatar, (err, result) => {
    if(err) {
      console.error(err);
      res.send(JSON.stringify({
        status:'102',
        msg:'失败'
      }))
      return;
    }
    console.log(result);
    res.send(JSON.stringify({
      status:'200',
      msg:'成功',
      data:result
    }));
  });
});
//更新用户签名
router.post('/uploadSign',(req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.body);
  todouserdata.updateSign(req.body.userid, req.body.autograph, (err, result) => {
    if(err) {
      console.error(err);
      res.send(JSON.stringify({
        status:'102',
        msg:'失败'
      }))
      return;
    }
    console.log(result);
    res.send(JSON.stringify({
      status:'200',
      msg:'成功',
      data:result
    }));
  })
});
//更新用户信息
router.post('/uploadUser',(req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.body);
  todouserdata.updateUser(req.body.userid, req.body.sex, req.body.birth, (err, result) => {
    console.log('I have done');
    if(err) {
      console.error(err);
      res.send(JSON.stringify({
        status:'102',
        msg:'失败'
      }))
      return;
    }
    console.log(result);
    res.send(JSON.stringify({
      status:'200',
      msg:'成功',
      data:result
    }));
  });
});
//获取所有数据
router.get('/',(req,res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'text/plain; charset="utf-8"');
  todouserdata.getAll((err, results)=>{
    if(err) {
      console.error(err);
      res.send(JSON.stringify({
        status:'102',
        msg:'失败'
      }))
      return;
    }

    res.send(JSON.stringify({
      status:'200',
      msg:'成功',
      data:results
    }));
  });
});

//获取对应用户id数据
router.post('/getone',(req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  var id = req.body.userid
  if(!id){
    res.send(JSON.stringify({
      status:'101',
      msg:'请输入正确的用户id号'
    }))
    return ;
  }
  todouserdata.getOne(id, (err,data)=>{
    if(err) {
      console.error(err);
      res.send(JSON.stringify({
        status:'102',
        msg:'失败'
      }))
      return ;
    }

    res.send(JSON.stringify({
      status:'200',
      msg:'success',
      data:data
    }));
  });
})

//获取用户总数量
router.get('/usercount',(req,res)=> {
  res.header('Access-Control-Allow-Origin','*');
  todouserdata.getCount((err, count)=> {
    if(err) {
      console.error(err);
      res.send(JSON.stringify({
        status:'102',
        msg:'错误'
      }));
      return ;
    }

    res.send(JSON.stringify({
      status:'200',
      msg:'成功',
      userCount:count
    }))
      
  })
})

//添加一个用户
router.post('/add',(req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  var item = req.body;
  todouserdata.insertOne(item.id, item.name, item.password, item.phone, item.email, (err,data)=>{ 
    if(err) {
      console.error(err);
      res.send(JSON.stringify({
        status:'102',
        msg:'注册失败'
      }))
      return ;
    }
    res.send(JSON.stringify({
      status:'200',
      msg:'注册成功',
      data:data
    }));
  })
 
})

//删除一个用户
router.post('/del',(req, res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.body.userid);
  todouserdata.deleteone(req.body.userid,(err)=>{
    if(err){
      console.log(err);
      res.send(JSON.stringify({
        status:'102',
        msg:'删除失败'
      }))
    }else{
      res.send(JSON.stringify({
        status:'200',
        msg:'删除成功'
      }))
    }
  });
})

//用户详情
router.post('/userdetail', (req,res)=>{
  res.header('Access-Control-Allow-Origin','*');
  var name = req.body.name;
  todouserdata.getUserDetail(name, (err,data)=>{
    if(err){
      console.log(err);
      res.send(JSON.stringify({
        status:'102',
        msg:'失败'
      }))
    }
    res.send(JSON.stringify(data))
  })
})

//粉丝详情
router.post('/fandetail', (req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  var userid = req.body.userid;
  todouserdata.getFuns(userid, (err, results)=>{
    if(err){
      console.log(err);
      res.send(JSON.stringify({
        status:'102',
        msg:'失败'
      }))
    }
    res.status(200).send(results);
  })
})

//成为粉丝
router.post('/becomeFans', (req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  var userid = req.body.userid;
  var fansid = req.body.fansid;
  todouserdata.becFans(userid, fansid, (err, results)=>{
    if(err){
      console.log(err);
      res.send(JSON.stringify({
        status:'102',
        msg:'失败'
      }))
    }
    res.send(JSON.stringify({
      status:'200',
      msg:'成为粉丝'
    }))
  })
})


//获取关注详情
router.post('/followdetail', (req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  var userid = req.body.userid;
  console.log(userid)
  todouserdata.getFollow(userid, (err, results)=>{
    if(err){
      console.log(err);
      res.send(JSON,stringify({
        status:'102',
        msg:'失败'
      }))
    }
    res.status(200).send(results);
  })
})

//取消关注
router.post('/disfollow', (req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  var userid = req.body.userid;
  var fansid = req.body.fansid;
  todouserdata.disFollow(userid, fansid, (err, results)=>{
    if(err){
      console.log(err);
      res.send(JSON.stringify({
        status:'102',
        msg:'失败'
      }))
    }
    res.send(JSON.stringify({
      status:'200',
      msg:'取消关注'
    }))
  })
})

//数据分页
router.all('/paging', (req,res)=> {
  res.header('Access-Control-Allow-Origin','*');

  var param = '';

  if(req.method == 'POST') {
    param = req.body;
  }else {
    param = req.query || req.params;
  }

  if(param.page == '' || param.page == null || param.page == undefined) {
    res.send(JSON.stringify({
      mgs:'请传入参数page',
      status:'101'
    }));
    return ;
  }
  
  var start = (param.page - 1) * 9;
  var sql = 'SELECT * FROM user limit ' + start + ',9';
  db.query(sql, (err, results)=> {
    if(err){
      console.error(err);
      res.send(JSON.stringify({
        msg:'获取失败',
        status:'102',
      }))
    }else {
      res.send(JSON.stringify({
        status:'200',
        msg:'获取成功',
        data:results,
      }))
    }
  })
})

module.exports =router;
