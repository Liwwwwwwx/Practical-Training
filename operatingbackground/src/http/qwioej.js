router.all('/api', function (req, res, next) {
  var param = '';
  if (req.method == "POST") {
    param = req.body;
  } else {
    param = req.query || req.params;
  }
  if (param.page == '' || param.page == null || param.page == undefined) {
    res.end(JSON.stringify({
      msg: '请传入参数page',
      status: '102'
    }));
    return;
  }
  var start = (param.page - 1) * 20;
  var sql = 'SELECT COUNT(*) FROM record; SELECT * FROM record limit ' + start + ',20';
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(sql, function (err, results) {
      connection.release();
      if (err) {
        throw err
      } else {
        var allCount = results[0][0]['COUNT(*)'];
        var allPage = parseInt(allCount) / 20;
        var pageStr = allPage.toString();
        if (pageStr.indexOf('.') > 0) {
          allPage = parseInt(pageStr.split('.')[0]) + 1;
        }
        var userList = results[1];
        res.end(JSON.stringify({
          msg: '操作成功',
          status: '100',
          totalPages: allPage,
          currentPage: param.page,
          data: userList
        }));
      }
    })
  })
});
