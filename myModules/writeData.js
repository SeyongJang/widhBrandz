/**
 * Created by SEYONG on 2016-08-19.
 */
var fs = require('fs');

module.exports = function(database, data, callback){

    // fs.writeFile(path, JSON.stringify(data), function(err){
    //     //if(err) throw err;
    //     console.log('Data saved!!');
    //     fn(err);
    // });

    var collection = database.collection('testCollection');
    collection.insertOne( data, function(err, result){
        //if(err) throw err;
        console.log("Write the records");
        callback(err, result);
    });

}