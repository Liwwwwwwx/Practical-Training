const db = require('./database.js');

class TodoUserData {
  getAll(callback) {
    const sql = 'SELECT * FROM user';
    var datas = [];

    db.query(sql, (err, results) => {
      if (err) {
        callback(true);
        return;
      }

      results.forEach((e) => {
        datas.push(e);
      });
      callback(false, datas);
    });
  };

  getOne(id, callback) {
    const sql = 'SELECT * FROM user WHERE userid = ?';
    db.query(sql, [id], (err, results) => {
      if (err) {
        callback(true);
        return;
      }
      callback(false, results);
    })
  }

  getCount(callback) {
    const sql = 'SELECT count(userid) count from user';

    var count = 0;
    db.query(sql, (err, results) => {
      if (err) {
        callback(true);
        return;
      }
      count = results;
      callback(false, count);
    })
  }

  insertOne(id, name, password, phone, email, callback) {
    const sql = 'INSERT INTO user (userid,username,password,phoneNumber,microblog) VALUES (?,?,?,?,?)'
    db.query(sql, [id, name, password, phone, email], (err, results) => {
      if (err) {
        callback(true);
        return;
      }
      callback(false, results);
    })
  };
  updateone(id, name, phone, callback) {
    const sql = 'UPDATE user SET username = ? , phoneNumber = ? WHERE userid = ?'
    db.query(sql, [name, phone, id], (err, results) => {
      if (err) {
        callback(true);
        return;
      }
      callback(false, results);
    })
  };
  getUserDetail(name, callback) {
    const sql = 'select user.*,anthology.anthologyname from user left join anthology on user.userid = anthology.userid where user.username = ?';
    db.query(sql, [name], (err, res) => {
      if (err) {
        callback(true);
        return;
      }
      callback(false, res);
    })
  }
  deleteone(id, callback) {
    const sql = 'DELETE from user where userid = ?';

    db.query(sql, [id], (err, results) => {
      if (err) {
        callback(true);
      }
      callback(false, results);
    });
  }
  //更新头像
  updateAvatar(userid, avatar, callback) {
    const sql = 'UPDATE user SET avatar = ? WHERE userid = ?';
    db.query(sql, [avatar, userid], (err, result) => {
      if (err) {
        callback(true);
        return;
      }
      callback(false, result);
    });
  }
  //更新用户数据
  updateUser(userid, sex, birth, callback) {
    const sql = 'UPDATE user SET sex = ?, birth = ? where userid = ?';
    db.query(sql, [sex, birth, userid], (err, result) => {
      if (err) {
        callback(true);
        return;
      }
      callback(false, result);
    });
  }
  //更新签名
  updateSign(userid, autograph, callback) {
    const sql = 'UPDATE user SET autograph = ? where userid = ?';
    db.query(sql, [autograph, userid], (err, result) => {
      if (err) {
        callback(true);
        return;
      }
      callback(false, result);
    });
  }
  //获取粉丝详情
  getFuns(userid, callback) {
    const sql = 'select fun.*,count(funs.userid) Mutual from (select userid,username,avatar,autograph from user where userid in (select fansid from fans where userid = ?)) as fun left join (select * from fans where userid in (select fansid from fans where userid = ?) and fansid = ?) as funs on fun.userid = funs.userid group by (fun.userid);'
    db.query(sql, [userid, userid, userid], (err, results) => {
      if (err) {
        callback(true);
        return;
      }
      callback(false, results)
    })
  }

  //成为粉丝
  becFans(userid, fansid, callback) {
    const sql = 'insert fans values (?,?)';
    db.query(sql, [userid, fansid], (err, results) => {
      if (err) {
        callback(true);
        return;
      }
      callback(false, results);
    })
  }


  //获取关注人详情
  getFollow(userid, callback) {
    const sql = 'select a.*,count(b.fansid) Mutual from (select userid,username,avatar,autograph from user where userid in (select userid from fans where fansid = ?)) as a left join (select * from fans where fansid in (select userid from fans where fansid = ?) and userid = ?) as b on a.userid = b.fansid group by (a.userid);'
    db.query(sql, [userid, userid, userid], (err, results) => {
      if (err) {
        callback(true);
        return;
      }
      callback(false, results)
    })
  }
  //取消关注
  disFollow(userid, fansid, callback) {
    const sql = 'delete from fans where userid = ? and fansid = ?';
    db.query(sql, [userid, fansid], (err, results) => {
      if (err) {
        callback(true);
        return;
      }
      callback(false, results)
    })
  }

  //消息
  GetMsg(userid, callback) {
    const sql = 'select type,message.replyid,comment.com_replyid,comment.ccontent, note.noteid,notecontent,noteimg,user.username,user.userid,avatar, messagedate from message left join user on message.ouserid = user.userid left join note on note.noteid = message.noteid left join comment on message.replyid = comment.replyid where message.userid = ? and message.userid != message.ouserid order by (messagedate) desc;'
    db.query(sql, [userid], (err, results) => {
      if (err) {
        callback(true);
        return;
      }
      callback(false, results);
    })
  }
  // 获取用户id
  getId(name, callback) {
    const sql = 'SELECT userid FROM user WHERE username = ?';
    db.query(sql, [name], (err, result) => {
      if (err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, result);
    });
  }

  //获取某个人关注粉丝详情
  GetOneMutual(userid,ouserid,callback){
    const sql = 'select a.*,count(b.fansid) Mutual from (select userid,username,avatar,autograph from user where userid in (select userid from fans where fansid = ?)) as a left join (select * from fans where fansid in (select userid from fans where fansid = ?) and userid = ?) as b on a.userid = b.fansid where a.userid = ? group by (a.userid);';
    console.log(userid,ouserid)
    db.query(sql, [userid, userid, userid, ouserid], (err, results)=>{
      if (err) {
        console.log(err);
        callback(true);
        return ;
      }
      callback(false, results);
    })
  }
};

module.exports = TodoUserData;
