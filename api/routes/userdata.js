const TodoUserData = require('../models/todo-userdata.js');
const db = require('../models/database.js');
var express = require('express');
var router = express.Router();

var todouserdata = new TodoUserData();

router.get('/',(req,res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'text/plain; charset="utf-8"');
  todouserdata.getAll((err, results)=>{
    if(err) {
      console.error(err);
      return;
    }

    res.status(200).json(results);
  });
});

router.post('/getone',(req, res)=>{
  res.header('Access-Control-Allow-Origin','*');

  var id = req.body.userid
  todouserdata.getOne(id, (err,data)=>{
    if(err) {
      console.error(err);
      return ;
    }

    res.status(200).json(data);
  });
})

router.post('/add',(req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  var item = JSON.parse(req.body.item);
  //console.log(item.userid,item.username,item.phoneNumber);
  const id = item.userid;
  const name = item.username;
  const phone = item.phoneNumber;
  console.log(id,name,phone)
  todouserdata.updateone(id, name, phone, (err,data)=>{ 
    if(err) {
      console.error(err);
      return ;
    }
    res.status(200).send('INSERT success');
  })
 
})

router.post('/del',(req, res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.body.userid);
  todouserdata.deleteone(req.body.userid,(err)=>{
    if(err){
      console.log(err);
    }else{
      res.status(200).send('Delete OK');
      console.log('Delete OK')
    }
  });


})

module.exports =router;
