/**
 * Created by SEYONG on 2016-08-18.
 */
//var fs = require('fs');

// module.exports = function(path, fn){
//
//     fs.readFile(path, function(err, data){
//
//         if(data==(''||null)){
//             fn(err, data);
//         }else{
//             fn(err, JSON.parse(data));
//         }
//     });
//
// }

// var assert = require('assert');

module.exports = function(database, callback){

    var collection = database.collection('testCollection');

    collection.find({}).toArray(function(err, result) {
        //assert.equal(err, null);

        console.log("Found the following records");
        //console.log(result);

        callback(err, result);
    });
}

// var MongoClient = require('mongodb').MongoClient
//     , assert = require('assert');
//
// var dbUrl = 'mongodb://localhost:27017/testCollection';
//
// module.exports = function(callback){
//
//     MongoClient.connect(dbUrl, function(err,db){
//         var database = db.collection('testCollection');
//
//         database.find({}).toArray(function(err, result) {
//             assert.equal(err, null);
//
//             console.log("Found the following records");
//             console.log(result);
//
//             callback(result);
//         });
//
//     });
// }
