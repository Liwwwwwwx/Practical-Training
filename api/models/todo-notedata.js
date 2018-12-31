const db = require('./database.js');

class TodoNoteData{
  getAll(callback){
    var datas = [];
    const sql = 'select * from (select note.*,avatar,username,anthologyname from note,user,anthology where anthology.userid = user.userid and note.anthologyid = anthology.anthologyid and note.isnoteprivate = 0) as c left join ( select a.noteid,commentCount,collectionCount from (select count(replyid) commentCount,note.noteid from note left join comment on note.noteid = comment.noteid group by (note.noteid)) as a left join (select count(collection.userid) collectionCount,note.noteid from note left join collection on note.noteid = collection.noteid group by (note.noteid)) as b on a.noteid = b.noteid ) as d on c.noteid = d.noteid order by (c.notedate) desc;'
    db.query(sql, (err,results)=>{
      if (err) {
        callback(true);
        return;
      }

      results.forEach((e)=>{ datas.push(e); });
      callback(false, datas);
    });
  };

  //获取一个文章详情
  getNoteDetail(noteid, callback){
    const sql = 'select note.*,avatar,username,anthologyname from note,user,anthology where user.userid = anthology.userid and note.anthologyid = anthology.anthologyid and noteid = ?';
    db.query(sql, [noteid], (err,results)=>{
      if(err) {
        callback(true);
        return ;
      }
      callback(false,results);
    })
  }
  getCount(notecategory, callback){
    console.log(notecategory)
    console.log(typeof notecategory)
    if(notecategory == '全部'){
      var sql = 'SELECT count(noteid) count from note';
      console.log(sql)
    }else{
      var sql = 'SELECT count(noteid) count from note where notecategory = "' + notecategory +' "'
      console.log(sql)
    }
    
    var count = 0;
    db.query(sql, (err,results)=>{
      if(err) {
        callback(true);
        return ; 
      }
      count = results;
      callback(false, count);
    })
  }

  getNoteCategory(notecategory, callback){
    const sql = 'select * from note where notecategory = ?';
    db.query(sql,[notecategory], (err,results)=>{
      if(err) {
        callback(true);
        return ;
      }
      callback(false,results);
    })
  }

  getAnthologyDetail(name, callback){
    const sql = 'select * from anthology where userid = (select userid from user where username = ?)'
      db.query(sql, [name], (err,results)=>{
        if(err){
          callback(true);
          return ;
        }
        callback(false,results);
      })
  }
  //获取文集
  getAnthologyDetail(name, callback){
    const sql = 'select * from anthology where userid = (select userid from user where username = ?)'
      db.query(sql, [name], (err,results)=>{
        if(err){
          callback(true);
          return ;
        }
        callback(false,results);
      })
  }
  //创建文集
  createAnthology(name, Aname, callback) {
    const sql = 'insert into anthology(userid , anthologyname) values ((select userid from user where username = ?),?)';
    db.query(sql, [name, Aname], (err, results) => {
      if(err) {
        callback(true);
        return ;
      }
      callback(false, results);
    });
  }
  deleteone(id, callback) {
    const sql = 'DELETE from note where noteid = ?';

    db.query(sql, [id], (err, results)=>{
      if (err){
        callback(true);
        return;
      }
      callback(false, results);
    });
  }
  //创建Note
  insertOneNote(datas, callback) {
    console.log('up to insertOnePhoto');
    const sql = 'INSERT INTO note(anthologyid, notetag, notecategory, notecontent, isnoteoriginal, isnoteprivate, noteimg, notemusic) VALUES ((SELECT anthologyid FROM anthology WHERE anthologyname = ? AND userid = (SELECT userid FROM user WHERE username = ?)),?,?,?,?,?,?,?)';
    db.query(sql, [datas.anthologyname, datas.username, datas.notetag, datas.notecategory, datas.content, datas.isOriginal, datas.isPrivate, datas.imgPath, datas.musicPath], (err, results) => {
      if (err){
        callback(true);
        return;
      }
      callback(false, results);
    });
  }

  getClickCount(noteid, callback){
    const sql = 'select count(*) clickCount from click where noteid = ? group by (noteid);'
      db.query(sql, [noteid], (err, results)=>{
        if(err) {
          callback(true);
          return ;
        }
        callback(false,results);
      })
  }
  
  //是否点赞
  isClick(noteid, name, callback){
    const sql = 'select count(*) count from click where noteid = ? and cuserid = (select userid from user where username = ? );'
    db.query(sql, [noteid, name], (err, results)=>{
      if(err) {
        callback(true);
        return ;
      }
      callback(false,results);
    })
  }
  Click(noteid, name, callback){
    const sql = 'insert into click (noteid,cuserid) values (?,(select userid from user where username = ?))'
      db.query(sql, [noteid, name], (err, results)=>{
        if(err) {
          callback(true);
          return ;
        }
        callback(false, results);
      })
  }
  disClick(noteid, name, callback){
    const sql = 'delete from click where noteid = ? and cuserid = (select userid from user where username = ?)'
      db.query(sql, [noteid, name], (err, results)=>{
        if(err) {
          callback(true);
          return ;
        }
        callback(false, results);
      })
  }

  //收藏
  
  CollectionCount(noteid, callback){
    const sql = 'select count(userid) CollectionCount from collection where noteid = ? group by (noteid)';
    db.query(sql, [noteid], (err, results)=>{
      if(err) {
        callback(true);
        return ;
      }
      callback(false, results);
    })
  }

  isCollect(noteid, name, callback){
    const sql = 'select count(*) count from collection where noteid = ? and userid = (select userid from user where username = ?);'
      db.query(sql, [noteid, name], (err, results)=>{
        if(err){
          callback(true);
          return ;
        }
        callback(false,results);
      })  
  }

  Collection(noteid, name, callback){
    const sql = 'insert into collection (noteid, userid) values (?,(select userid from user where username = ?))'
      db.query(sql, [noteid, name], (err, results)=>{
        if(err){
          callback(true);
          return ;
        }
        callback(false,results);
      })
  }
  disCollection(noteid, name, callback){
    const sql = 'delete from collection where noteid = ? and userid = (select userid from user where username = ?)';
    db.query(sql, [noteid, name], (err, results)=>{
      if(err) {
        callback(true);
        return ;
      }
      callback(false,results);
    })
  }
  
  //我的收藏
  myCollection(userid, callback){
    const sql = 'select * from (select anthology.anthologyname,note.*,username from note left join anthology on note.anthologyid = anthology.anthologyid left join user on anthology.userid = user.userid where noteid in (select noteid from collection where userid = ?)) as notes left join (select a.*,count(conameid) commentCount from (select count(userid) collectionCount,noteid,codate from collection group by (noteid)) as a left join comment  as b on a.noteid = b.noteid group by (a.noteid)) as count on notes.noteid = count.noteid order by (count.codate) desc'
    db.query(sql, [userid], (err, results)=>{
      if(err) {
        callback(true);
        return ;
      }
      callback(false,results);
    })
  }

  getAnthologyNote(anthologyid, callback) {
    const sql = 'select a.*,c.commentCount,b.collectionCount from (select * from note where anthologyid = (select anthologyid from anthology where anthologyid = ?)) as a left join (select count(userid) collectionCount,note.noteid from note left join collection on note.noteid = collection.noteid group by (noteid)) as b on a.noteid = b.noteid left join (select count(replyid) commentCount,note.noteid from note left join comment on note.noteid = comment.noteid group by (note.noteid)) as c on a.noteid = c.noteid order by (a.notedate) desc;';
    db.query(sql, [anthologyid], (err, results)=>{
      if(err) {
        callback(true);
        return ;
      }
      callback(false, results);
    });
  }

  //获取评论数量
  getCommentCount(noteid, callback){
    const sql = 'select count(conameid) commentCount from comment where noteid = ? group by (noteid)';
    db.query(sql, [noteid], (err, results)=>{
      if(err) {
        callback(true);
        return ;
      }
      callback(false, results);
    })
  }
  //获取评论详情
  getComment(noteid, callback) {
    const sql = 'select count(b.com_replyid) commentCount, a.* from (select comment.*, username,avatar from comment left join user on user.userid = comment.conameid where com_replyid is NULL) as a left join (select * from comment where com_replyid is not null) as b on a.replyid = b.com_replyid where a.noteid = ? group by (a.replyid);'
      db.query(sql, [noteid], (err, results)=>{
        if(err){
          callback(true);
          return ;
        }
        callback(false, results);
      })
  }

  insertOnePhoto(datas, callback) {
    console.log('up to insertOnePhoto');
    const sql = 'INSERT INTO note(anthologyid, notecategory, notecontent, isnoteoriginal, isnoteprivate, noteimg) VALUES ((SELECT anthologyid FROM anthology WHERE anthologyname = ? AND userid = (SELECT userid FROM user WHERE username = ?)),?,?,?,?,?)';
    db.query(sql, [datas.anthologyname, datas.username, datas.notecategory, datas.content, datas.isOriginal, datas.isPrivate, datas.newPath], (err, results) => {
      if (err){
        callback(true);
        return;
      }
      callback(false, results);
    });
  }

  //发表文章的评论
  insertComment(noteid, username, content, callback) {
    const sql = "insert into comment (noteid,conameid,ccontent) values (?,(select userid from user where username = ?),?);";
    db.query(sql, [noteid, username, content], (err, results)=>{
      if(err) {
        callback(true);
        return ;
      }
      callback(false, results);
    });
  }
  
  //发表评论的评论
  insertOneComments(noteid, username, content, replyid, callback) {
    const sql = 'insert into comment (noteid,conameid,ccontent,com_replyid) values (?,(select userid from user where username = ?),?,?);'
    db.query(sql, [noteid, username, content, replyid], (err, results)=>{
      if(err) {
        callback(true);
        return ;
      }
      callback(false, results);
    })
  }

 //获取评论人名称
  getCommentName(noteid, callback) {
    const sql = 'select username,com_replyid from user right join comment on user.userid = comment.conameid where com_replyid is not null and noteid = ?;'
      db.query(sql, [noteid], (err, results)=>{
        if(err){
          callback(true);
          return ;
        }
        callback(false, results);
      })
  }

  //获取评论的评论详情
  getCommentDetail(replyid, callback){
    const sql = 'select comment.*, username,avatar from comment left join user on user.userid = comment.conameid where com_replyid = ?;';
    db.query(sql, [replyid], (err, results)=>{
      if(err){
        callback(true);
        return ;
      }
      callback(false, results);
    })
  }
};

module.exports = TodoNoteData;
