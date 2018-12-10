const TodoNoteData = require('../models/todo-notedata');
const db = require('../models/database.js');
var express = require('express');
var router = express.Router();

var todonotedata = new TodoNoteData();

router.get('/',(req,res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'text/plain; charset="utf-8"');
  todonotedata.getAll((err, datas)=>{
    if(err) {
      console.error(err);
      return;
    }

    res.status(200).json(datas);
  });
});

router.get('/notecount',(req,res)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Content-Type', 'text/plain; charset="utf-8"');
  todonotedata.getCount((err, count)=>{
    if(err) {
      console.error(err);
      return ;
    }
    res.send(count);
  })
})

router.post('/del',(req, res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.body.userid);
  todonotedata.deleteone(req.body.noteid,(err)=>{
    if(err){
      console.log(err);
      return ;
    }else{
      res.status(200).send('Delete OK');
    }
  })

  todonotedata.getAll((err, datas) => {
    if(err) {
      console.err(err);
      return ;
    }

    res.status(200).json(datas);
  })
})

//数据分页

router.all('/paging', (req,res)=>{
  res.header('Access-Control-Allow-Origin','*');
  var param = '';
  console.log(req.body.page)
  if(req.method == 'POST') {
    param = req.body;
  }else {
    param = req.query || req.params;
  }
  console.log(param);
  if(param.page == '' || param.page == null || param.page == undefined) {
    res.end(JSON.stringify({
      msg: '请传入参数page',
      status: '101'
    }));
    return ;
  }
  var start = (param.page-1) * 7;
  var sql = 'SELECT * FROM note limit '+ start + ',7';
  db.query(sql, (err, results)=> {
    if(err) {
      console.error(err);
    }else {
      console.log(results);
      var noteList = results;
      res.end(JSON.stringify({
        data: noteList
      }));
    }
  })
});

module.exports =router;
