var express = require('express');
var router = express.Router();
var fs = require('fs'),
    formidable = require('formidable'),
    AVATAR_UPLOAD_FOLDER = '/mp3/',
    domain = "http://192.168.25.144:3000";

    router.post('/', (req, res)=> {
      res.header('Access-Control-Allow-Origin','*');
      var form = new formidable.IncomingForm();
      form.endcoding = 'utf-8';
      form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;
      form.keepExtensions = true;
      form.maxFieldsSize = 10 * 1024 * 1024;
      
      
      form.parse(req, (err,fields, files)=> {
        if(err) {
          res.locals.error = err;
        
          return ;
        }


        var extName = '';  //后缀名
        switch (files.fulAvatar.type){
          case 'audio/mp3':
            extName = 'mp3';
            break;
        }
        if(extName.length == 0){
          res.locals.error = '只支持mp3格式音乐';
          return;
        }
        var avatarName = Math.floor(Math.random()*10000 + 1) + '.' + extName;
        var newPath = form.uploadDir + avatarName;
        var showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName;
        console.log("newPath",newPath);
        fs.renameSync(files.fulAvatar.path, newPath);
        res.json({
          "musicPath":showUrl
        })
      })
    })

module.exports = router;
