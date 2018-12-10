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

  deleteone(id, callback) {
    const sql = 'DELETE from user where userid = ?';

    db.query(sql, [id], (err, results)=>{
      if (err){
        callback(true); 
      }
      callback(false, results);
    });
  }
};

module.exports = TodoUserData;
