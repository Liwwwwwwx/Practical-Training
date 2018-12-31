var request = require('request');
var querystring = require('querystring');
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
  let code = getCode(); // 生成验证码
  const phone = req.body.phone;

  var queryData = querystring.stringify({
    "mobile": phone, // 接受短信的用户手机号码
    "tpl_id": "120001", // 您申请的短信模板ID，根据实际情况修改
    "tpl_value": "#code#=" + code, // 您设置的模板变量，根据实际情况修改
    "key": "fb90ce2ca5724f41c83b907c34c139a5", // 应用APPKEY(应用详细页查询)
  });

  var queryUrl = 'http://v.juhe.cn/sms/send?' + queryData;

  request(queryUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body); // 打印接口返回内容

      var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
      console.log(jsonObj);
    } else {
      console.log('请求异常');
    }
  });
  res.send({
    code: code,
    phone: phone
  });
});
// 生成验证码FUNCTION
function getCode() {
  let n = 6;
  var all = '1234567890';
  var code = '';
  for (let i = 0; i < n; i++) {
    var index = Math.floor(Math.random() * 10);
    code += all.charAt(index);
  }
  return code;
}
module.exports = router;