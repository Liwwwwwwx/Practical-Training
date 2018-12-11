const db = require('./database.js');

class LoginData {
  getAll(callback){
    const sql = 'SELECT * FROM user';
    var datas = [];
    db.query(sql, (err,results)=>{
      if (err) {
        callback(true);
        return;                              
      }
      results.forEach((e)=>{ datas.push(e);  });
      callback(false, datas);
    });        
  };
    
  getOne(username, callback) {
    const sql = 'SELECT password FROM user WHERE username = ?';
        db.query(sql, [username], (err,results)=>{
          if(err) {
            callback(true);
            return ;
          }
          callback(false,results);            
        });
    }
}

module.exports = LoginData;
