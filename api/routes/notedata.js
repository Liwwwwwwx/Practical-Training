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

//获取文集
router.post('/anthologydetail', (req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  var name = req.body.name;
  todonotedata.getAnthologyDetail(name, (err, data)=>{
    if(err) {
      console.log(err);
      res.send(JSON.stringify({
        status:'102',
        msg:'失败'
      }))
    }
    res.status(200).send(JSON.stringify(data));
  })
})

//文集详情
router.post('/getanthologynote', (req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  console.log(req.body);
  var anthologyid = req.body.anthologyid;
  todonotedata.getAnthologyNote(anthologyid, (err, data)=>{
    if(err) {
      console.log(err);
      res.send(JSON.stringify({
        status:'102',
        msg:'失败'
      }))
    }
    console.log(data)
    res.status(200).send(data)
  })
})

//新建文集
router.post('/newAnthology', (req,res) => {
  res.header('Access-Control-Allow-Origin','*');
  console.log(req.body);
  var name = req.body.name;
  var Aname = req.body.anthologyName;
  todonotedata.createAnthology(name, Aname, (err, data) => {
    if(err) {
      console.log(err);
      res.send(JSON.stringify({
        status:'102',
        msg:'失败'
      }));
    }
    res.send(JSON.stringify({
        status:'200',
        msg:'成功'
      }));
  });
});

router.post('/isclick', (req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  var noteid = req.body.noteid;
  console.log(req.body)
  var name = req.body.name;
  console.log(noteid,name)
  todonotedata.isClick(noteid, name, (err,result)=>{
    if(err) {
      console.log(err);
      return ;
    }
    res.status(200).send(result);
  })
})

router.post('/clickcount', (req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  var noteid = req.body.noteid;
  todonotedata.getClickCount(noteid, (err,result)=>{
    if(err) {
      console.log(err);
      return ;
    }
    res.status(200).send(result);
  })
})

router.post('/click', (req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  console.log(req.body)
  var noteid =req.body.noteid;
  var name = req.body.name;
  todonotedata.Click(noteid, name, (err, result)=>{
    if(err) {
      console.log(err);
      return ;
    }
    console.log(result);
    res.send(JSON.stringify({
      status:'200',
      msg:'点赞成功'
    }))
  })
})

router.post('/disclick', (req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  var noteid = req.body.noteid;
  var name = req.body.name;
  todonotedata.disClick(noteid, name, (err,result)=>{
    if(err){
      console.log(err);
      return ;
    }
    res.send(JSON.stringify({
      status:'200',
      msg:'取消点赞'
    }))
  })
})

router.post('/isCollection', (req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  var noteid = req.body.noteid;
  var name = req.body.name;
  todonotedata.isCollect(noteid, name, (err, result)=>{
    if(err){
      console.log(err);
      return ;
    }
    res.status(200).send(result);
  })
})

router.post('/CollectionCount', (req,res)=>{
  res.header('Access-Control-Allow-Origin','*');
  var noteid = req.body.noteid;
  todonotedata.CollectionCount(noteid, (err, result)=>{
    if(err){
      console.log(err);
      return ;
    }
    res.status(200).send(result);
  })
})

router.post('/Collection', (req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  var noteid = req.body.noteid;
  var name = req.body.name;
  todonotedata.Collection(noteid, name, (err, result)=>{
    if(err){
      console.log(err);
      return ;
    }
    res.send(JSON.stringify({
      status:'200',
      msg:'收藏成功'
    }))
  })
})

router.post('/disCollection', (req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  var noteid = req.body.noteid;
  var name = req.body.name;
  todonotedata.disCollection(noteid, name, (err,result)=>{
    if(err){
      console.log(err);
      return ;
    }
    res.send(JSON.stringify({
      status:'200',
      msg:'取消收藏'
    }))
  })
})

router.post('/mycollection', (req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  var userid = req.body.userid;
  todonotedata.myCollection(userid, (err, result)=>{
    if(err){
      console.log(err);
      return ;
    }
    res.status(200).send(result);
  })
})

//发表文章评论
router.post('/insertcomment', (req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  console.log(req.body)
  var noteid = req.body.noteid,
      username = req.body.username,
      content = req.body.content;
  todonotedata.insertComment(noteid, username, content, (err, result)=>{
    if(err) {
      console.log(err);
      return ;
    }
    res.send(JSON.stringify({
      status:'200',
      msg:'发表成功'
    }))
  })
})

//获取评论人名称
router.post('/getcommentname', (req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  console.log(req.body)
  var noteid = req.body.noteid;
  todonotedata.getCommentName(noteid, (err, result)=>{
    if(err) {
      console.log(err);
      return ;
    }
    res.status(200).send(result);
  })
})

//获取评论的评论
router.post('/getcommentsdetail', (req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  var replyid = req.body.replyid;
  todonotedata.getCommentDetail(replyid, (err, result)=>{
    if(err){
      console.log(err);
      return ;
    }
    res.status(200).send(result);
  })
})

router.post('/getcomment', (req, res)=>{
  res.header('Access-Control-Allow-Origin','*');
  var noteid = req.body.noteid;
  todonotedata.getComment(noteid, (err, result)=>{
    if(err){
      console.log(err);
      return ;
    }
    res.status(200).send(result);
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
