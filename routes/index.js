var express = require('express');
var router = express.Router();
var fs = require('fs');

var readData = require('../myModules/readData.js');
var writeData = require('../myModules/writeData.js');
var config = require('../myModules/config.js');
var lib = require('../myModules/lib.js');

var MongoClient = require('mongodb').MongoClient
    , ObjectID = require('mongodb').ObjectID
    , assert = require('assert');

var mongoose = require('mongoose');

var dbUrl = config.dbUrl();

var todoSchema = mongoose.Schema({
  date:Date,
  task:String,
  done:Boolean
});

var todo = mongoose.model("todo", todoSchema, 'testCollection');


/*File upload setting */
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("Image is saved successfully to disk storage.");
        cb(null, rootDir+'/tmp')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload1 = multer({ storage: storage });

/* GET home page. */
router.get('/', function(req, res, next) {

  // fs.readFile('database/todo.json', 'utf8', function (err, data) {
  //   if (err) throw err;
  //
  //   console.log(data);
  //   if(data==(''||null)){
  //     res.render('index', {todo:data});
  //   }else{
  //     res.render('index', {todo:JSON.parse(data)});
  //   }
  //
  // });
  //

  /* file system */
  // readData(db, function(err, data){
  //   if(err) throw err;
  //   res.render('index', {todo:data});
  // })

  /* mongodb-native */
  // MongoClient.connect(dbUrl, function(err,db){
  //   //var data = db;
  //   //console.log(db);
  //   readData(db, function(err, data){
  //     assert.equal(err, null);
  //     // console.log(data);
  //     db.close();
  //
  //     res.render('index', {todo:data});
  //   });
  // });

  /* mongoose */
  todo.find({},function(err, docs){
    //console.log(docs);
    res.render('index', {todo:docs});
  });

});

router.get('/post', function(req, res, next) {
  res.render('post');
});
router.get('/post-single', function(req, res, next) {
  res.render('post-single');
});

router.get('/review', function(req, res, next) {
  res.render('review');
});

router.get('/review-single', function(req, res, next) {
  var rate = [8, 10, 5, 5, 3, 10];

  function rating(value){
    var chartData = value;
    var total = 0, rating = 0;
    var length = chartData.length;
    for(var i=0; i<length; i++){
      total = total+chartData[i];
    }
    rating = total/length;
    return rating.toFixed(2);
  }

  res.render('review-single', {data:rate, rating:rating(rate)});
});

router.get('/write-review', function(req,res){

  res.render('write-review');
});

router.get('/brand-publish', function(req,res){
    res.render('brand-publish');
});

/* user */
router.get('/user', function(req,res){
    res.render('user');
});

router.get('/user/brandstory', function(req,res){
    res.render('user-brandstory');
});

router.get('/user/brandlist', function(req,res){
    res.render('user-brandlist');
});

router.get('/user/trend', function(req,res){
    res.render('user-trend');
});

router.get('/user/list', function(req,res){
    res.render('user-list');
});

router.get('/user/info', function(req,res){
    res.render('user-info');
});



router.post('/upload/image', upload1.single('upload'), function(req,res){
    var command = req.query.command;
    console.log(req.file);
    var tmpPath = req.file.path; // /tmp/파일이름
    //var index = tmpPath.split('\\').length; //임시 디렉토리를 제외한 파일이름만 얻기 위해서...
    //var fileName = req.user._id + "_" + getfileDate(new Date()) + "_" + tmpPath.split('\\')[index - 1];
    var fileName = req.file.filename;

    var newPath = rootDir+'/public/uploads/'+ fileName;

    fs.rename(tmpPath, newPath, function (err) {
        if (err) console.error(err);

        if(command == 'normalUpload'){
            var html;
            html = "";
            html += "<script type='text/javascript'>";
            html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
            html += "    var url     = \"/uploads/" + fileName + "\";";
            html += "    var message = \"이미지가 성공적으로 업로드 되었습니다.\";";
            html += "";
            html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
            html += "</script>";

            res.send(html);
        }

        if(command=='quickUpload'){

            var imageFile = {
                "uploaded": 1,
                "fileName": fileName,
                "url": "/uploads/"+fileName,
                "error" : err
            };

            res.send(imageFile);
        }
    });

});

router.post('/task-register', function(req, res) {
  //var task = [];
  var date = new Date(req.body.date);
  var newTask = req.body.task;
  //var genId = new Date().getTime();
  var obj = {"date":date, "task":newTask, "done":false};
  // fs.readFile('database/todo.json', 'utf8', function (err, data) {
  //   if (err) throw err;
  //   if(data!=''){
  //     task = JSON.parse(data);
  //   }
  //   task.push(obj);
  //   fs.writeFile('database/todo.json', JSON.stringify(task), function (err) {
  //     if (err) throw err;
  //     console.log('saved!!');
  //     res.redirect('/');
  //   });
  // });

  /* usage of fs module */
  // readData('database/todo.json', function(err, task){
  //   if(err) throw err;
  //   //console.log(task);
  //   task.push(obj);
  //
  //   writeData('database/todo.json', task, function(err){
  //     if(err) throw err;
  //     res.redirect('/');
  //   });
  // })

  /* Mongo DB */
  // MongoClient.connect(dbUrl, function(err,db) {
  //   writeData(db, obj, function(err, result){
  //     assert.equal(null, err);
  //     assert.equal(1, result.insertedCount);
  //
  //     db.close();
  //
  //     res.redirect('/');
  //   })
  // });

  /* mongoose */
  var task = new todo(obj);
  task.save(function(err){
    if(err) console.log(err);
    res.redirect('/');
  });
});

router.post('/task-done', function(req, res) {
  var checked= req.body.checked;
  // fs.readFile('database/todo.json', 'utf8', function (err, data) {
  //   if (err) throw err;
  //   var obj = JSON.parse(data);
  //   if(lib.isArray(checked)){
  //     checked.forEach(function(doneTask){
  //       for(var i=0; i<obj.length; i++){
  //         if(obj[i].id == doneTask){
  //           obj[i].done = true;
  //         }
  //       }
  //     });
  //     fs.writeFile('database/todo.json', JSON.stringify(obj), function(err){
  //       if(err) throw err;
  //       console.log('done save!!');
  //     });
  //   } else {
  //     for(var i=0; i<obj.length; i++){
  //       if(obj[i].id == checked){
  //         obj[i].done = true;
  //         console.log(obj[i]);
  //       }
  //     }
  //     fs.writeFile('database/todo.json', JSON.stringify(obj), function(err){
  //       if(err) throw err;
  //       console.log('done save!!');
  //     });
  //   }
  // });
  //console.log(checked);

  var objectId = [];

  if(lib.isArray(checked)){
    for(var i=0; i<checked.length; i++){
      objectId.push(checked[i]);
    }
  } else {
    objectId.push(checked);
  }

  /* Mongo DB */
  // MongoClient.connect(dbUrl, function(err,db) {
  //   var collection = db.collection('testCollection');
  //
  //   collection.updateMany( {'_id':{$in:objectId}}, {$set:{'done':true}}, function(err){
  //     assert.equal(null, err);
  //     db.close();
  //     res.redirect('/');
  //   });
  //
  //   // collection.find({_id: {$in:objectId}}).toArray(function(err, result){
  //   //   console.log(result);
  //   //
  //   //   db.close();
  //   //   res.redirect('/');
  //   // });
  //
  // });


  /* mongoose */
  todo.update({'_id':{$in:objectId}}, {$set:{'done':true}}, {multi:true}, function(err){
    if(err) console.log(err);
    res.redirect('/');
  })


});



module.exports = router;

// function isArray(val) {
//   return val.constructor.toString().indexOf("Array") > -1;
// }