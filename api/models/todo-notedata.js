const db = require('./database.js');

class TodoNoteData{
  getAll(callback){
    const sql = 'select notes.*,count(replyid) commentCount,count(userid) collectionCount from (select note.*,user.avatar,user.username,anthology.anthologyname from note,user,anthology where anthology.userid = user.userid and note.anthologyid = anthology.anthologyid and note.isnoteprivate = 0) as notes left join comment on notes.noteid = comment.noteid left join collection on notes.noteid = collection.noteid group by (noteid) order by notedate desc;'
    var datas = [];

    db.query(sql, (err,results)=>{
      if (err) {
        callback(true);
        return;
      }

      results.forEach((e)=>{ datas.push(e); });
      callback(false, datas);
    });
  };

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
    const sql = 'INSERT INTO note(anthologyid, notecategory, notecontent, isnoteoriginal, isnoteprivate, noteimg, notemusic) VALUES ((SELECT anthologyid FROM anthology WHERE anthologyname = ? AND userid = (SELECT userid FROM user WHERE username = ?)),?,?,?,?,?,?)';
    db.query(sql, [datas.anthologyname, datas.username, datas.notecategory, datas.content, datas.isOriginal, datas.isPrivate, datas.imgPath, datas.musicPath], (err, results) => {
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
    const sql = 'select count(*) CollectionCount from collection where noteid = ? group by (noteid)';
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
    const sql = 'select notes.anthologyname,count(replyid) commentCount,notes.username,notes.noteImg,notes.notecontent,notes.notedate, count(*) collectionCount,collection.noteid from (select note.*,anthology.anthologyname,username from anthology left join note on note.anthologyid = anthology.anthologyid left join user on user.userid = anthology.userid where noteid in (select noteid from collection where userid = ?)) as notes left join collection on notes.noteid = collection.noteid left join comment on comment.noteid = notes.noteid group by (noteid) order by (notes.notedate) desc;'
    db.query(sql, [userid], (err, results)=>{
      if(err) {
        callback(true);
        return ;
      }
      callback(false,results);
    })
  }

  getAnthologyNote(anthologyid, callback) {
    const sql = 'select note.* from note where anthologyid = (select anthologyid from anthology where anthologyid = ?);'
    db.query(sql, [anthologyid], (err, results)=>{
      if(err) {
        callback(true);
        return ;
      }
      callback(false, results);
    });
  }
  
  getComment(noteid, callback) {
    const sql = 'select comment.*,user.avatar,user.username from comment,user where comment.conameid = user.userid and comment.noteid = ?'
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
};

module.exports = TodoNoteData;
