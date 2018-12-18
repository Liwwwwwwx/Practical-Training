const db = require('./database.js');

class SignData {
  //检测用户名是否重复
  checkName(name, callback) {
    const sql = 'SELECT COUNT(*) sunum  FROM user WHERE username = ?';
    db.query(sql, [name], (err, result) => {
      if(err) {
        callback(true);
        return ;
      }
      callback(false, result);
    });
  }
  //检测邮箱是否重复
  checkMail(mail, callback) {
    const sql = 'SELECT COUNT(*) sunum FROM user WHERE email = ?';
    db.query(sql, [mail], (err, result) => {
      if(err) {
        callback(true);
        return ;
      }
      callback(false, result);
    });
  }
  //检测手机号是否重复
  checkPhone(phone, callback) {
    const sql = 'SELECT COUNT(*) sunum FROM user WHERE phoneNumber = ?';
    db.query(sql, [phone], (err, result) => {
      if(err) {
        callback(true);
        return ;
      }
      callback(false, result);
    });
  }
  //插入新的数据
  insertOne(name, psw, phone, mail, callback) {
    const sql = 'INSERT INTO user (username,password,phoneNumber,email) VALUES (?,?,?,?)';
    db.query(sql,[name, psw, phone, mail],(err,results)=>{
      if(err){
        callback(true);
        return ;
      }
      callback(false,results);
    });
  }
  //创建文集
  createAnt(name, anthologyname, callback) {
    const sql = 'INSERT INTO anthology(userid, anthologyname) VALUES ((SELECT userid FROM user WHERE username = ?),?)';
    db.query(sql, [name, anthologyname], (err, results) => {
      if(err) {
        callback(true);
        return ;
      }
      callback(false,results);
    })
  }
}

module.exports = SignData;
