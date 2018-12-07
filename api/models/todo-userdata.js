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

  insertOne(id, name, gender, phone, date, birth, fans, follow, anthologycount, note, password, autograph, qq, wechat, callback) {
    const sql = 'INSERT INTO user VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
      db.query(sql,[id, name. gender, phone, date, birth, fans, follow, anthologycount, note, password, autograph, qq, wechat],(err,results)=>{
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
