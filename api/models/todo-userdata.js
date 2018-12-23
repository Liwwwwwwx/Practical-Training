const db = require('./database.js');

class TodoUserData{
  getAll(callback){
    const sql = 'SELECT * FROM user';
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
  
  getOne(id, callback) {
    const sql = 'SELECT * FROM user WHERE userid = ?';
    db.query(sql, [id], (err,results)=>{
      if(err) {
        callback(true);
        return ;
      }
      callback(false,results);
    })
  }
  
  getCount(callback){
    const sql = 'SELECT count(userid) count from user';

    var count = 0;
    db.query(sql, (err,results)=> {
      if(err) {
        callback(true);
        return ;
      }
      count = results;
      callback(false, count);
    })
  }

  insertOne(id, name, password, phone, email, callback) {
    const sql = 'INSERT INTO user (userid,username,password,phoneNumber,microblog) VALUES (?,?,?,?,?)'
      db.query(sql,[id, name, password, phone, email],(err,results)=>{
        if(err){
          callback(true);
          return ;
        }
        callback(false,results);
      })
  };
 updateone(id,name,phone,callback) {
   const sql = 'UPDATE user SET username = ? , phoneNumber = ? WHERE userid = ?'
     db.query(sql,[name,phone,id],(err, results)=> {
      if(err){
         callback(true);
        return ;
       }
         callback(false,results);
      })
  };
  getUserDetail(name,callback){
     const sql = 'select user.*,count(followid),count(fansid),anthology.anthologyname from user left join anthology on user.userid = anthology.userid left join fans on user.userid = fans.userid left join follow on user.userid = follow.userid where user.username = ? group by (userid)';
     db.query(sql, [name], (err, res)=>{
       if(err){
         callback(true);
         return ;
       }
       callback(false, res);
     })
   }
  deleteone(id, callback) {
    const sql = 'DELETE from user where userid = ?';

    db.query(sql, [id], (err, results)=>{
      if (err){
        callback(true); 
      }
      callback(false, results);
    });
  }
  //更新头像
  updateAvatar(userid, avatar, callback) {
    const sql = 'UPDATE user SET avatar = ? WHERE userid = ?';
    db.query(sql, [avatar, userid], (err, result) => {
      if(err){
         callback(true);
         return ;
       }
       callback(false, result);
    });
  }
};

module.exports = TodoUserData;
