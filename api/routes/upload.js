var express = require('express');
var router = express.Router();
var fs = require('fs');
var qiniu = require('qiniu');

qiniu.conf.ACCESS_KEY = '8Fq7kDSPFK7GDBa9zCVKWokst7P28F9i9V6PVeak';
qiniu.conf.SECRET_KEY = 'plnGzMEfBTcqCXzs6ZF2mL_JhYa9sBug0LQ6Brjd';

var bucket = 'suoji';

router.post('/upload',function(req, res, next){
  res.header('Access-Control-Allow-Origin','*');
  var imgData = req.body.imgData;
  console.log(imgData)
 /* var fileNmae = Date.now()+'.png';
  var filePath = './tmp/' + fileName;
  
  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = new Buffer(base64Data,'base64');
  fs.writeFile(filePath,dataBuffer,(err)=>{
    if(err){
      res.end(JSON.stringify({status:'102',msg:'文件写入失败'}))
    }else{
      var putPolicy = new qiniu.rs.PutPolicy(bucket + ':' + fileNmae)
      var token = putPolicy.token();
      var extra = new qiniu.io.PutExtra();
      qiniu.io.putFile(token,fileName,filePath,extra,(err,ret)=>{
        if(!err){
          var imageSrc = 'http://pj7artlf0.bkt.clouddn.com' + ret.key;
          res.end(JSON.stringify({status:'100',msg:'上传成功',imageUrl:imageSrc}));
        }else{
          res.end(JSON.stringify({status:'101',msg:'上传失败',error:ret}));
        }
        fs.unlinkSync(filePath);
      })
    }
  })*/
})

module.exports = router;
