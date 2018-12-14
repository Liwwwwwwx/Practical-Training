const TodoUserData = require('../models/todo-userdata.js');
const db = require('../models/database.js');
var express = require('express');
var router = express.Router();

var todouserdata = new TodoUserData();

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
