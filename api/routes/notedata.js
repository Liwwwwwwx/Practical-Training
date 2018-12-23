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
    res.status(200).send(datas);
  });
});

router.post('/notecount',(req,res)=>{
  res.header('Access-Control-Allow-Origin','*');
  console.log(req.body)
  todonotedata.getCount(req.body.notecategory, (err, count)=>{
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

//筛选文章类型
router.post('/notecategory',(req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  console.log(req.body);
  todonotedata.getNoteCategory(req.body.notecategory,(err,results)=>{
    if(err){
      console.log(err);
      return ;
    }else{
      res.send(JSON.stringify({
        status:'200',
        data:results,
        msg:'获取成功'
      }))
    }
  })
})

//发表内容
router.post('/newNote', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.body);
  todonotedata.insertOneNote(req.body, (err ,result) => {
    if(err) {
      console.error(err);
      return ;
    }
    console.log(result);
  });
  res.send(req.body);
});


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
  //console.log(param);
  if(param.page == '' || param.page == null || param.page == undefined) {
    res.end(JSON.stringify({
      msg: '请传入参数page',
      status: '101'
    }));
    return ;
  }
  var start = (param.page-1) * 7;
  if(req.body.notecategory == '全部'){
    var sql = 'select note.*,user.username,anthology.anthologyname from note,user,anthology where     note.anthologyid = anthology.anthologyid and anthology.userid = user.userid limit '+ start + '    ,7';}else{
      sql = 'select note.*,user.username,anthology.anthologyname from note,user,anthology where note.anthologyid = anthology.anthologyid and anthology.userid = user.userid and note.notecategory = "'+ req.body.notecategory + '" limit '+ start +',7'}

  db.query(sql, (err, results)=> {
    if(err) {
      console.error(err);
    }else {
    //  console.log(results);
      var noteList = results;
      res.end(JSON.stringify({
        status:'200',
        data: noteList
      }));
    }
  })
});

module.exports =router;
