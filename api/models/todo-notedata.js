const db = require('./database.js');

class TodoNoteData{
  getAll(callback){
    const sql = 'SELECT * FROM note';
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

  getCount(callback){
    const sql = 'SELECT count(noteid) count from note';

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
  insertOne(datas, callback) {
    const sql = 'INSERT INTO note(anthologyid, notecategory, notecontent, isnoteoriginal, isnoteprivate) VALUES ((SELECT anthologyid FROM anthology WHERE anthologyname = ? AND userid = (SELECT userid FROM user WHERE username = ?)),?,?,?,?)';
    db.query(sql, [datas.anthologyname, datas.username, datas.notecategory, datas.content, datas.isOriginal, datas.isPrivate], (err, results) => {
      if (err){
        callback(true);
        return;
      }
      callback(false, results);
    });
  } 
};

module.exports = TodoNoteData;
